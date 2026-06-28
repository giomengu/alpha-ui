import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const ThreeViewport = ({
  children,
  height = "100%",
  camera = { position: [2.6, 2.2, 2.8], fov: 50 },
  showGrid = true,
  gridSize = 10,
  gridDivisions = 20,
  gridColors = ["#334155", "#1f2937"],
  showAxes = false,
  axesSize = 1.5,
  orbitProps,
  canvasProps,
  ambientLight = 0.6,
  directionalLight = { position: [4, 4, 2], intensity: 0.8 },
}) => {
  return (
    <div style={{ width: "100%", height }}>
      <Canvas shadows camera={camera} {...canvasProps}>
        {showGrid && (
          <gridHelper args={[gridSize, gridDivisions, gridColors[0], gridColors[1]]} position={[0, -0.5, 0]} />
        )}
        {showAxes && <axesHelper args={[axesSize]} />}
        {ambientLight != null && <ambientLight intensity={ambientLight} />}
        {directionalLight && (
          <directionalLight
            position={directionalLight.position || [4, 4, 2]}
            intensity={directionalLight.intensity ?? 0.8}
          />
        )}
        {children}
        <OrbitControls autoRotate={false} {...orbitProps} />
      </Canvas>
    </div>
  );
};

export default ThreeViewport;
