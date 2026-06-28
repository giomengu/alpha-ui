import styled from "styled-components";

export const CompactToolbarBar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  background: var(--color-surface);
  padding: 8px;
  border-bottom: 1px solid var(--color-border);
  overflow-x: auto;
`;

export const CompactToolbarButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive" && prop !== "$active"
})`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: ${(props) =>
    props.isActive || props.$active
      ? "var(--accent-color)"
      : props.disabled
      ? "var(--color-panel)"
      : "var(--color-panel-strong)"};
  border: none;
  border-radius: 4px;
  color: ${(props) =>
    props.isActive || props.$active
      ? "var(--color-bg)"
      : props.disabled
      ? "var(--color-text-muted)"
      : "var(--color-text)"};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-right: 4px;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: var(--accent-hover-color);
    color: var(--color-bg);
  }

  &:active:not(:disabled) {
    background: var(--color-accent-strong);
  }

  .label {
    white-space: nowrap;
  }

  @media (max-width: 720px) {
    padding: 6px 8px;
    gap: 0;

    .label {
      display: none;
    }
  }
`;

export const PillTabBar = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const PillTabButton = styled.button`
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid ${(props) => (props.$active ? "var(--color-info)" : "var(--color-border)")};
  background: ${(props) => (props.$active ? "var(--color-panel)" : "transparent")};
  color: ${(props) => (props.$active ? "var(--color-text)" : "var(--color-text-muted)")};
  cursor: pointer;
  font-size: 13px;
`;

export const StatusPill = styled.span`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.2px;
  padding: 4px 8px;
  border-radius: 999px;
  background: ${(props) => {
    if (props.$status === "Running") return "var(--color-success-bg)";
    if (props.$status === "Queued") return "var(--color-info-bg)";
    return "var(--color-panel)";
  }};
  color: ${(props) => {
    if (props.$status === "Running") return "var(--color-success)";
    if (props.$status === "Queued") return "var(--color-info)";
    return "var(--color-text-muted)";
  }};
`;

export const SurfacePanel = styled.div`
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg-scaled);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SurfacePanelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-text);
  font-weight: 600;
`;

export const DetailsPanel = styled.details`
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg-scaled);
  padding: 0;

  &[open] > summary {
    border-bottom: 1px solid var(--color-border);
  }
`;

export const DetailsSummary = styled.summary`
  list-style: none;
  cursor: pointer;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-text);
  font-weight: 600;

  &::-webkit-details-marker {
    display: none;
  }
`;

export const DetailsBody = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px;
`;

export const InputGroup = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  color: var(--color-text-muted);

  input,
  select {
    background: var(--color-bg);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm-scaled);
    padding: 8px 10px;
    font-size: 13px;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
  background: var(--accent-color);
  border: none;
  color: var(--color-bg);
  padding: 10px 14px;
  border-radius: var(--radius-sm-scaled);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;

  &:hover:not(:disabled) {
    background: var(--accent-hover-color);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const GhostButton = styled.button`
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  padding: 8px 12px;
  border-radius: var(--radius-sm-scaled);
  cursor: pointer;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  font-size: 13px;
`;

export const SummaryItem = styled.div`
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md-scaled);
  padding: 10px 12px;
`;

export const ErrorBox = styled.div`
  color: var(--color-danger);
  background: var(--color-danger-bg);
  border: 1px solid var(--color-danger);
  padding: 10px 12px;
  border-radius: var(--radius-sm-scaled);
  font-size: 13px;
  white-space: pre-wrap;
`;

export const LoadingBadge = styled.span`
  color: var(--color-info);
  font-size: 13px;
`;

export const ToggleRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
`;

export const CompactTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  color: var(--color-text);

  th {
    text-align: left;
    color: var(--color-text-muted);
    padding: 6px 4px;
  }

  td {
    padding: 6px 4px;
    border-top: 1px solid var(--color-border);
  }
`;

export const DefinitionBadge = styled.span`
  font-size: 11px;
  color: ${(props) =>
    props.$variant === "error"
      ? "var(--color-danger)"
      : props.$variant === "pending"
      ? "var(--color-warning)"
      : "var(--color-success)"};
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const SmallButton = styled.button`
  padding: 6px 10px;
  border-radius: var(--radius-sm-scaled);
  border: 1px solid ${(props) => (props.$variant === "secondary" ? "var(--color-border)" : "transparent")};
  background: ${(props) => (props.$variant === "secondary" ? "transparent" : "var(--accent-color)")};
  color: ${(props) => (props.$variant === "secondary" ? "var(--color-text-muted)" : "var(--color-bg)")};
  font-size: 12px;
  cursor: pointer;
`;

export const ModalTabs = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 8px;
  flex-wrap: ${(props) => (props.$scroll ? "nowrap" : "wrap")};
  overflow-x: ${(props) => (props.$scroll ? "auto" : "visible")};
  max-width: 100%;
  -webkit-overflow-scrolling: touch;
`;

export const ModalTabButton = styled.button`
  background: ${(props) => (props.$active ? "var(--color-panel)" : "transparent")};
  border: 1px solid var(--color-border);
  border-bottom: ${(props) => (props.$active ? `2px solid var(--accent-color)` : `1px solid var(--color-border)`)};
  border-radius: 8px 8px 0 0;
  padding: 6px 12px;
  color: ${(props) => (props.$active ? "var(--color-text)" : "var(--color-text-muted)")};
  cursor: pointer;
`;

export const CollapseButton = styled.button`
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 12px;
  padding: 2px 4px;
`;

export const QueueList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const QueueItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 10px;
  border-radius: var(--radius-md-scaled);
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  font-size: 13px;
`;

export const FileList = styled.div`
  max-height: 220px;
  overflow-y: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md-scaled);
  padding: 8px;
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FileRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--color-text);
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
`;

export const StatCard = styled.div`
  border: 1px solid ${(props) => (props.$alert ? "var(--color-warning)" : "var(--color-border)")};
  background: var(--color-bg);
  border-radius: var(--radius-md-scaled);
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const StatLabel = styled.div`
  font-size: 12px;
  color: var(--color-text-muted);
`;

export const StatValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
`;

export const StatRange = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(80px, 1fr));
  gap: 6px;

  input {
    width: 100%;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm-scaled);
    padding: 4px 6px;
    color: var(--color-text);
    font-size: 11px;
  }
`;
