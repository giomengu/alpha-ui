import React from "react";
import ThreeViewport from "./ThreeViewport";
import ThreeModel from "./ThreeModel";

const ThreeViewer = ({
  file,
  filePath,
  projectName,
  height = 320,
  allowPicking = false,
  highlightFaces = [],
  onFacePick,
  baseColor = "#8c99a6",
  highlightColor = "#f18d32",
  scale = 1,
  showGrid = true,
  orbitProps,
  canvasProps,
}) => {
  const resolvedPath = filePath || file?.path || "";

  return (
    <ThreeViewport height={height} showGrid={showGrid} orbitProps={orbitProps} canvasProps={canvasProps}>
      <ThreeModel
        filePath={resolvedPath}
        projectName={projectName}
        allowPicking={allowPicking}
        highlightFaces={highlightFaces}
        onFacePick={onFacePick}
        baseColor={baseColor}
        highlightColor={highlightColor}
        scale={scale}
      />
    </ThreeViewport>
  );
};

export default ThreeViewer;
