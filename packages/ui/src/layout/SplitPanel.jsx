import { useEffect, useRef, useState } from "react";
import { SegmentedButton, SegmentedControl } from "../components/generalStyles";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const SplitPanel = ({
  left,
  right,
  leftLabel = "Details",
  rightLabel = "Logic",
  defaultSplit = 45,
  minSplit = 25,
  maxSplit = 75,
  narrowAt = 860,
  useTabsOnNarrow = true
}) => {
  const containerRef = useRef(null);
  const [split, setSplit] = useState(defaultSplit);
  const [isNarrow, setIsNarrow] = useState(false);
  const [activeTab, setActiveTab] = useState("left");

  useEffect(() => {
    const update = () => {
      const width = containerRef.current?.offsetWidth || window.innerWidth;
      setIsNarrow(width <= narrowAt);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [narrowAt]);

  const startDrag = (event) => {
    if (!containerRef.current) return;
    const startX = event.clientX;
    const bounds = containerRef.current.getBoundingClientRect();
    const startSplit = split;

    const handleMove = (moveEvent) => {
      const delta = moveEvent.clientX - startX;
      const percentDelta = (delta / bounds.width) * 100;
      setSplit(clamp(startSplit + percentDelta, minSplit, maxSplit));
    };

    const handleUp = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
  };

  const showTabs = useTabsOnNarrow && isNarrow;

  return (
    <div ref={containerRef} style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, minHeight: 0 }}>
      {showTabs && (
        <SegmentedControl>
          <SegmentedButton type="button" $active={activeTab === "left"} onClick={() => setActiveTab("left")}>
            {leftLabel}
          </SegmentedButton>
          <SegmentedButton type="button" $active={activeTab === "right"} onClick={() => setActiveTab("right")}>
            {rightLabel}
          </SegmentedButton>
        </SegmentedControl>
      )}
      <div style={{ display: "flex", flex: 1, minHeight: 0, gap: 12 }}>
        {(!showTabs || activeTab === "left") && (
          <div
            style={{
              flexBasis: showTabs ? "100%" : `${split}%`,
              flexGrow: showTabs ? 1 : 0,
              flexShrink: 0,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 12
            }}
          >
            {left}
          </div>
        )}
        {!showTabs && (
          <div
            onMouseDown={startDrag}
            role="separator"
            aria-orientation="vertical"
            style={{
              width: 6,
              cursor: "col-resize",
              borderRadius: 999,
              background: "var(--color-panel-strong)",
              alignSelf: "stretch"
            }}
          />
        )}
        {(!showTabs || activeTab === "right") && (
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 12
            }}
          >
            {right}
          </div>
        )}
      </div>
    </div>
  );
};

export default SplitPanel;
