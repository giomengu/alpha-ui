import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

const MIN_CELL_SIZE = 100;
const MAX_CELL_SIZE = 200;

const Grid = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
  grid-template-rows: repeat(${(props) => props.$rows}, 1fr);
  position: relative;
  overflow: hidden;
`;

const GridOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background-size: ${({ $columns, $rows }) => `calc(100% / ${$columns}) calc(100% / ${$rows})`};
  background-image: linear-gradient(to right, var(--color-grid-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--color-grid-line) 1px, transparent 1px);
  opacity: 0.7;
  z-index: 1;
`;

const defaultGridConfig = {
  columns: 6,
  rows: 10,
  aspectRatio: true
};

const WidgetGrid = ({
  style,
  isEditMode = false,
  widgets = [],
  onWidgetsChange,
  gridConfig = defaultGridConfig,
  autoScale = true,
  renderWidget,
  widgetRegistry,
  fallbackWidget,
  WidgetFrame
}) => {
  const gridRef = useRef(null);
  const { columns: userColumns, rows: userRows, aspectRatio } = gridConfig;
  const [actualGrid, setActualGrid] = useState({ columns: userColumns, rows: userRows });
  const [gridMetrics, setGridMetrics] = useState({ width: 0, height: 0 });

  const updateGridSize = () => {
    if (!gridRef.current) return;

    const { clientWidth: width, clientHeight: height } = gridRef.current;
    let cols = userColumns;
    let rows = userRows;

    if (!autoScale) {
      setActualGrid({ columns: cols, rows });
      setGridMetrics({ width, height });
      return;
    }

    if (aspectRatio) {
      const currentRatio = width / height;
      const targetRatio = (cols / rows) * aspectRatio;
      if (currentRatio > targetRatio) {
        rows = Math.round((cols * height) / width / aspectRatio);
      } else {
        cols = Math.round((rows * width) / height * aspectRatio);
      }
    }

    let cellWidth = width / cols;
    let cellHeight = height / rows;

    if (cellWidth < MIN_CELL_SIZE || cellHeight < MIN_CELL_SIZE) {
      const scaleFactor = MIN_CELL_SIZE / Math.min(cellWidth, cellHeight);
      cols = Math.max(1, Math.floor(cols / scaleFactor));
      rows = Math.max(1, Math.floor(rows / scaleFactor));
    } else if (cellWidth > MAX_CELL_SIZE || cellHeight > MAX_CELL_SIZE) {
      const scaleFactor = MAX_CELL_SIZE / Math.max(cellWidth, cellHeight);
      cols = Math.ceil(cols / scaleFactor);
      rows = Math.ceil(rows / scaleFactor);
    }

    setActualGrid({ columns: cols, rows });
    setGridMetrics({ width, height });
  };

  useEffect(() => {
    updateGridSize();
    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, [userColumns, userRows, aspectRatio, autoScale]);

  const updateWidget = (id, patch) => {
    if (!onWidgetsChange) return;
    const next = widgets.map((widget) => (widget.id === id ? { ...widget, ...patch } : widget));
    onWidgetsChange(next);
  };

  const getCellSize = useMemo(() => {
    const width = gridMetrics.width || 1;
    const height = gridMetrics.height || 1;
    return {
      cellWidth: width / actualGrid.columns,
      cellHeight: height / actualGrid.rows
    };
  }, [gridMetrics, actualGrid]);

  const frameProps = {
    isEditMode,
    gridConfig: actualGrid,
    gridMetrics: getCellSize,
    updateWidget
  };

  const resolveWidget = (widget) => {
    if (!widgetRegistry) return null;
    return widgetRegistry[widget.type] || fallbackWidget || null;
  };

  return (
    <Grid ref={gridRef} style={style} $columns={actualGrid.columns} $rows={actualGrid.rows}>
      {isEditMode && <GridOverlay $columns={actualGrid.columns} $rows={actualGrid.rows} />}
      {widgets.map((widget) => (
        <React.Fragment key={widget.id}>
          {renderWidget
            ? renderWidget(widget, frameProps, WidgetFrame)
            : (() => {
                const WidgetComponent = resolveWidget(widget);
                if (!WidgetComponent || !WidgetFrame) return null;
                return (
                  <WidgetFrame
                    widget={widget}
                    {...frameProps}
                  >
                    <WidgetComponent widget={widget} />
                  </WidgetFrame>
                );
              })()}
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default WidgetGrid;
