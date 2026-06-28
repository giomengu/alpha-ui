import styled from "styled-components";

export const ResizerStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ResizerRow = styled.div`
  height: 160px;
  display: flex;
  border-radius: var(--radius-md-scaled);
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
`;

export const ResizerColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-md-scaled);
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  height: 180px;
`;

export const ResizerPane = styled.div`
  flex: 1 1 ${(props) => props.$basis}%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  font-size: 13px;
  background: ${(props) => (props.$alt ? "var(--color-panel)" : "transparent")};
`;

export const ResizerHandleVertical = styled.div`
  width: 8px;
  cursor: col-resize;
  background: var(--color-panel-strong);
`;

export const ResizerHandleHorizontal = styled.div`
  height: 8px;
  cursor: row-resize;
  background: var(--color-panel-strong);
`;
