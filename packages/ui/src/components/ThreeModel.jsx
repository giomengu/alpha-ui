import React, { useEffect, useMemo, useState } from "react";
import { Html } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { ThreeMFLoader } from "three/examples/jsm/loaders/3MFLoader";
import * as THREE from "three";

const buildProjectFileUrl = (projectName, filePath = "") => {
  const encodedSegments = filePath
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `/api/files/${encodeURIComponent(projectName)}/${encodedSegments}`;
};

const adjustUpAxis = (geometry, fromAxis = "z", toAxis = "y") => {
  const matrix = new THREE.Matrix4();
  if (fromAxis === "z" && toAxis === "y") {
    matrix.makeRotationX(-Math.PI / 2);
  }
  geometry.applyMatrix4(matrix);
  geometry.computeBoundingSphere();
  geometry.computeBoundingBox();
};

const applyFaceColors = (geometry, highlightFaces = [], baseColor, highlightColor) => {
  if (!geometry?.isBufferGeometry) return geometry;
  const cloned = geometry.clone();
  const position = cloned.attributes.position;
  const count = position.count;
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    colors[i * 3] = baseColor.r;
    colors[i * 3 + 1] = baseColor.g;
    colors[i * 3 + 2] = baseColor.b;
  }

  const index = cloned.index;
  const applyColorToVertex = (vertexIndex) => {
    const offset = vertexIndex * 3;
    colors[offset] = highlightColor.r;
    colors[offset + 1] = highlightColor.g;
    colors[offset + 2] = highlightColor.b;
  };

  highlightFaces.forEach((faceIdx) => {
    const tri = faceIdx * 3;
    if (index) {
      const a = index.getX(tri);
      const b = index.getX(tri + 1);
      const c = index.getX(tri + 2);
      applyColorToVertex(a);
      applyColorToVertex(b);
      applyColorToVertex(c);
    } else {
      applyColorToVertex(tri);
      applyColorToVertex(tri + 1);
      applyColorToVertex(tri + 2);
    }
  });

  cloned.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return cloned;
};

const ThreeModel = ({
  filePath,
  projectName,
  allowPicking = false,
  highlightFaces = [],
  onFacePick,
  baseColor = "#8c99a6",
  highlightColor = "#f18d32",
  scale = 1,
  showEdges = false,
  edgeColor = "#1f2937",
  edgeThreshold = 1,
  edgeSegments = null,
  edgeSegmentsColor = "#2f3a48",
  onGeometryLoaded,
}) => {
  const [geometry, setGeometry] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!filePath || !projectName) {
      setError("Missing file information");
      return;
    }

    let cancelled = false;
    const controller = new AbortController();

    const loadModel = async () => {
      try {
        let loader;
        const extension = filePath.split("/").pop().toLowerCase().split(".").pop();
        if (extension === "stl") {
          loader = new STLLoader();
        } else if (extension === "3mf") {
          loader = new ThreeMFLoader();
        } else {
          throw new Error("Unsupported file format");
        }

        const filepath = buildProjectFileUrl(projectName, filePath);
        const response = await fetch(filepath, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Failed to load ${filePath} (${response.status})`);
        }
        const arrayBuffer = await response.arrayBuffer();

        const parsedData = loader.parse(arrayBuffer);
        if (cancelled) return;
        if (parsedData instanceof THREE.BufferGeometry) {
          adjustUpAxis(parsedData, "z", "y");
          setGeometry(parsedData);
          onGeometryLoaded?.(parsedData);
        } else if (parsedData.scene) {
          setGeometry(parsedData.scene);
          onGeometryLoaded?.(null);
        } else {
          throw new Error("Unrecognized geometry format");
        }
        setError(null);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err.message || "Failed to load 3D model");
      }
    };

    loadModel();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [projectName, filePath]);

  const displayGeometry = useMemo(() => {
    if (!geometry?.isBufferGeometry) return geometry;
    return applyFaceColors(geometry, highlightFaces, new THREE.Color(baseColor), new THREE.Color(highlightColor));
  }, [geometry, highlightFaces, baseColor, highlightColor]);

  const edgeGeometry = useMemo(() => {
    if (!edgeSegments || !Array.isArray(edgeSegments) || edgeSegments.length === 0) return null;
    const positions = new Float32Array(edgeSegments.length * 6);
    const matrix = new THREE.Matrix4();
    matrix.makeRotationX(-Math.PI / 2);
    const v = new THREE.Vector3();
    edgeSegments.forEach((seg, idx) => {
      const offset = idx * 6;
      v.set(seg[0], seg[1], seg[2]).applyMatrix4(matrix);
      positions[offset] = v.x;
      positions[offset + 1] = v.y;
      positions[offset + 2] = v.z;
      v.set(seg[3], seg[4], seg[5]).applyMatrix4(matrix);
      positions[offset + 3] = v.x;
      positions[offset + 4] = v.y;
      positions[offset + 5] = v.z;
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [edgeSegments]);

  if (error) {
    return (
      <Html center>
        <div style={{ color: "red", background: "white", padding: "10px", borderRadius: "5px" }}>
          {error}
        </div>
      </Html>
    );
  }

  if (!displayGeometry) {
    return (
      <Html center>
        <div style={{ background: "white", padding: "10px", borderRadius: "5px", color: "black" }}>Loading...</div>
      </Html>
    );
  }

  return (
    <group scale={[scale, scale, scale]}>
      {displayGeometry instanceof THREE.BufferGeometry ? (
        <group>
          <mesh
            geometry={displayGeometry}
            onClick={(event) => {
              if (!allowPicking || event?.faceIndex == null) return;
              onFacePick?.(event.faceIndex);
            }}
          >
            <meshStandardMaterial vertexColors />
          </mesh>
          {showEdges && (
            <lineSegments geometry={new THREE.EdgesGeometry(displayGeometry, edgeThreshold)}>
              <lineBasicMaterial color={edgeColor} />
            </lineSegments>
          )}
          {edgeGeometry && (
            <lineSegments geometry={edgeGeometry}>
              <lineBasicMaterial color={edgeSegmentsColor} />
            </lineSegments>
          )}
        </group>
      ) : (
        <primitive object={displayGeometry} />
      )}
    </group>
  );
};

export default ThreeModel;
