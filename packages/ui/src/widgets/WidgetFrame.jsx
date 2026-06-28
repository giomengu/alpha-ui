import React, { useRef } from "react";
import styled from "styled-components";

const Frame = styled.div`
  position: relative;
  z-index: 2;
  overflow: hidden;
  border-radius: var(--radius-lg-scaled);
  background: var(--color-card);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-soft);
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const DragHandle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 22px;
  background: linear-gradient(to bottom, var(--color-panel-strong), transparent);
  cursor: grab;
  z-index: 3;
`;

const ResizeHandle = styled.div`
  position: absolute;
  right: 4px;
  bottom: 4px;
  width: 14px;
  height: 14px;
  border-radius: 3px;
  background: var(--color-panel-strong);
  border: 1px solid var(--color-border);
  cursor: nwse-resize;
  z-index: 4;
`;

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const WidgetFrame = ({
  widget,
  gridConfig,
  gridMetrics,
  isEditMode,
  updateWidget,
  children,
  minSize = { width: 1, height: 1 }
}) => {
  const dragRef = useRef({ x: 0, y: 0, originX: 0, originY: 0 });
  const resizeRef = useRef({ x: 0, y: 0, width: 1, height: 1 });

  const startDrag = (event) => {
    if (!isEditMode) return;
    event.preventDefault();
    const point = event.touches ? event.touches[0] : event;
    dragRef.current = {
      x: point.clientX,
      y: point.clientY,
      originX: widget.position.x,
      originY: widget.position.y
    };

    const onMove = (moveEvent) => {
      const movePoint = moveEvent.touches ? moveEvent.touches[0] : moveEvent;
      const dx = (movePoint.clientX - dragRef.current.x) / gridMetrics.cellWidth;
      const dy = (movePoint.clientY - dragRef.current.y) / gridMetrics.cellHeight;
      const nextX = Math.round(dragRef.current.originX + dx);
      const nextY = Math.round(dragRef.current.originY + dy);
      updateWidget(widget.id, {
        position: {
          x: clamp(nextX, 0, gridConfig.columns - widget.size.width),
          y: clamp(nextY, 0, gridConfig.rows - widget.size.height)
        }
      });
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
  };

  const startResize = (event) => {
    if (!isEditMode) return;
    event.preventDefault();
    event.stopPropagation();
    const point = event.touches ? event.touches[0] : event;
    resizeRef.current = {
      x: point.clientX,
      y: point.clientY,
      width: widget.size.width,
      height: widget.size.height
    };

    const onMove = (moveEvent) => {
      const movePoint = moveEvent.touches ? moveEvent.touches[0] : moveEvent;
      const dx = (movePoint.clientX - resizeRef.current.x) / gridMetrics.cellWidth;
      const dy = (movePoint.clientY - resizeRef.current.y) / gridMetrics.cellHeight;
      const nextWidth = Math.round(resizeRef.current.width + dx);
      const nextHeight = Math.round(resizeRef.current.height + dy);

      updateWidget(widget.id, {
        size: {
          width: clamp(nextWidth, minSize.width, gridConfig.columns - widget.position.x),
          height: clamp(nextHeight, minSize.height, gridConfig.rows - widget.position.y)
        }
      });
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
  };

  return (
    <Frame
      style={{
        gridColumn: `${widget.position.x + 1} / span ${widget.size.width}`,
        gridRow: `${widget.position.y + 1} / span ${widget.size.height}`
      }}
    >
      {isEditMode && <DragHandle onMouseDown={startDrag} onTouchStart={startDrag} />}
      {isEditMode && <ResizeHandle onMouseDown={startResize} onTouchStart={startResize} />}
      <Content>{children}</Content>
    </Frame>
  );
};

export default WidgetFrame;
