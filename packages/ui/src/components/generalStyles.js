import styled from "styled-components";
import { darken } from "polished";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  padding: 0px;
  overflow: hidden;
  background-color: var(--color-bg);
`;

export const GridContainer = styled.div`
  display: grid;
  height: calc(100% - 10px);
  grid-template-columns: repeat(1, auto);
  gap: 5px;
  padding: 5px;
`;

export const Controls = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
`;

export const LedIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;

  &::after {
    content: "•";
    position: absolute;
    top: -2px;
    left: -2px;
    width: 100%;
    height: 100%;
    background-color: var(--color-text);
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  ${(props) =>
    props.connected
      ? {
          backgroundColor: "var(--color-accent)"
        }
      : {
          backgroundColor: "var(--color-danger)"
        }}
`;

export const LogsContainer = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  height: 300px;
  overflow-y: auto;
  background-color: var(--color-surface);
`;

export const LogDisplay = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: var(--font-mono);
  color: var(--color-text-muted);
  padding: 0.5rem;
`;

export const CommandSender = styled.form`
  display: flex;
  gap: 5px;
  padding: 1rem 0;
  align-items: center;
`;

export const InputField = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill-scaled);
  font-family: var(--font-mono);
  outline: none;
`;

export const FaIconSmall = {
  background: "var(--color-panel)",
  fontSize: "16px",
  color: "var(--color-text)",
  border: "none",
  padding: "8px 10px",
  borderRadius: "8px",
  boxShadow: "var(--shadow-soft)",
  backdropFilter: "blur(100px)",
  margin: "1px",
  cursor: "pointer",
  zIndex: 1000
};

export const MapPanelMenu = styled.div`
  position: absolute;
  bottom: 50px;
  left: 10px;
  z-index: 1000;
  backdrop-filter: blur(100px);
  background: var(--color-panel);
  border-radius: var(--radius-md-scaled);
  padding: 10px;
  box-shadow: var(--shadow-soft);
`;

export const ToolbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(10px);
  background: var(--color-panel-strong);
  color: var(--color-text);
  border-radius: var(--radius-md-scaled);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  transition: all 0.3s ease;
`;

export const ToolbarModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200000;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(100px);
  background: var(--color-card);
  border-radius: var(--radius-lg-scaled);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-strong);
  min-width: 300px;
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
  transition: all 0.3s ease;
`;

export const SettingsTabs = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
  overflow-x: auto;
  padding-bottom: 4px;
`;

export const SettingsTabButton = styled.button`
  border: none;
  border-radius: var(--radius-pill-scaled);
  padding: 6px 14px;
  font-weight: 600;
  cursor: pointer;
  background: ${(props) => (props.$active ? "var(--color-text)" : "var(--color-panel)")};
  color: ${(props) => (props.$active ? "var(--color-bg)" : "var(--color-text)")};
  transition: background 0.2s ease, color 0.2s ease;
  white-space: nowrap;

`;

export const SettingsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  border-radius: var(--radius-md-scaled);
  background: var(--color-card);

`;

export const SettingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SettingsScrollable = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: 0;
  padding-right: 6px;
`;

export const SettingsBadge = styled.span`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 999px;
  padding: 2px 8px;
  background: var(--color-accent);
  color: var(--color-bg);
`;

export const ToolbarWrapperHorizontal = styled.div`
  margin: ${(props) => (props.$fullWidth ? "4px" : "auto")};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  backdrop-filter: blur(100px);
  background: var(--color-panel-strong);
  border-radius: var(--radius-md-scaled);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  transition: width 0.3s ease, padding 0.3s ease;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};

  ${(props) =>
    props.$grow &&
    `
    > * {
      flex: 1 1 0;
    }
  `}
`;

export const ToolbarHorizontalStack = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

export const ToolbarButton = styled.button`
  color: var(--color-text);
  min-width: 36px;
  height: 36px;
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s;

  &:hover {
    background: var(--accent-hover-color);
    color: var(--color-bg);
  }

  &.active {
    background: var(--color-accent);
    color: var(--color-bg);
  }

  &.bad {
    background: var(--color-danger);
    color: var(--color-bg);
  }

  &.blue {
    background: var(--color-info);
    color: var(--color-bg);
  }
`;

export const ToolbarIcon = styled.div`
  width: 36px;
  height: 36px;
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s;

  &:hover {
    background: var(--accent-hover-color);
    color: var(--color-bg);
  }

  &.active {
    background: var(--color-accent);
    color: var(--color-bg);
  }
`;

export const ToolbarLabel = styled.label`
  border: none;
  margin: 5px;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.2s;
`;

export const ToolbarH3 = styled.h3`
  border: none;
  margin: 5px;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.2s;
`;

export const ToolbarSelect = styled.select`
  height: 36px;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s;
  border-radius: 0;
  outline: none;
  border-bottom: 4px solid var(--color-border);

  &:hover {
    background: var(--color-accent);
    color: var(--color-bg);
    border-bottom: 4px solid var(--color-text);
  }
`;

export const ToolbarSelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const ToolbarSelect1 = styled.select`
  width: 100%;
  height: 36px;
  padding: 0 8px;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: none;
  border-bottom: 4px solid transparent;
  color: inherit;
  z-index: 2;
  position: relative;
  appearance: none;

  &:hover {
    background: var(--accent-hover-color);
    color: var(--color-bg);
  }
`;

export const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background: var(--color-border);
  border-radius: 0;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: var(--progress-width, 0%);
    background: var(--progress-color, var(--color-accent));
    transition: width 0.2s ease;
  }
`;

export const ProgressBarStepped = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background: var(--color-border);
  border-radius: 0;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: var(--progress-width, 0%);
    background: var(--progress-color, var(--color-accent));
    transition: width 0.2s ease;
  }

  .step-marker {
    position: absolute;
    bottom: -4px;
    width: 2px;
    height: 8px;
    background: var(--color-text-muted);
    opacity: 0.6;
  }
`;

export const ToolbarOption = styled.option`
  color: var(--color-text);
  background-opacity: none;
  font-size: 14px;
`;

export const ToolbarCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 4px;
  padding: 4px 8px;
  border-radius: var(--radius-sm-scaled);
  background: var(--color-panel);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: var(--accent-hover-color);
    color: var(--color-bg);
  }
`;

export const ToolbarCheckbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const ToolbarColorInput = styled.input.attrs({ type: "color" })`
  height: 36px;
  width: 44px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: var(--radius-pill-scaled);
  transition: background 0.2s;
  appearance: none;
  padding: 0;
  border: 1px solid var(--color-border);
  overflow: hidden;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: var(--radius-pill-scaled);
    overflow: hidden;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: var(--radius-pill-scaled);
  }

  &::-moz-color-swatch {
    border: none;
    border-radius: var(--radius-pill-scaled);
  }

  &:hover {
    background: var(--color-accent);
  }

  &:hover::-webkit-color-swatch {
    border: 2px solid var(--color-bg);
  }
`;

export const ToolbarRangeInput = styled.input.attrs({ type: "range" })`
  cursor: pointer;
  background: var(--color-panel);
  -webkit-appearance: none;
  border-radius: var(--radius-pill-scaled);
  transition: background 0.2s;
  box-sizing: border-box;
  height: 12px;
  padding: 4px 0;
  background-clip: content-box;

  &:hover {
    background: var(--color-accent);
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: var(--color-text);
    border: 2px solid var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-bg);
    cursor: pointer;
    margin-top: -6px;
  }

  &::-moz-range-thumb {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: var(--color-text);
    border: 1px solid var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-bg);
    cursor: pointer;
  }
`;

export const ToolbarNumberInput = styled.input.attrs({ type: "number" })`
  height: 30px;
  padding: 0 5px;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  backdrop-filter: blur(10px);
  transition: background 0.2s;
  outline: none;
  border-bottom: 4px solid var(--color-border);

  &:hover {
    background: var(--color-accent);
    color: var(--color-bg);
  }
`;

export const ToolbarTextInput = styled.input.attrs({ type: "text" })`
  height: 30px;
  padding: 0 5px;
  border: none;
  display: flex;
  background: none;
  backdrop-filter: blur(10px);
  transition: background 0.2s;
  outline: none;
  border-bottom: 4px solid var(--color-border);

  &:hover {
    background: var(--color-accent);
    color: var(--color-bg);
  }
`;

export const ToolbarDateTimeInput = styled.input.attrs({ type: "datetime-local" })`
  height: 30px;
  padding: 0 5px;
  border: none;
  display: flex;
  background: none;
  backdrop-filter: blur(10px);
  transition: background 0.2s;
  outline: none;
  border-bottom: 4px solid var(--color-border);
  color: inherit;

  &:hover {
    background: var(--color-accent);
    color: var(--color-bg);
  }
`;

export const ToolbarButtonModifier = {
  borderRadius: "8px"
};

export const Button = styled(ToolbarButton)`
  border-radius: var(--radius-md-scaled);
  font-size: 15px;
  padding: 5px 5px;
  border-width: 4px;
  color: ${(props) => props.color};
  border-color: ${(props) => props.borderColor || "var(--color-border)"};
  background-color: ${(props) => props.backgroundColor || "var(--color-panel)"};

  &:hover {
    background-color: ${(props) =>
      props.backgroundColor ? darken(0.1, props.backgroundColor) : ""};
    color: ${(props) => (props.color ? darken(0.1, props.color) : "")};
    border-color: ${(props) =>
      props.borderColor ? darken(0.1, props.borderColor) : ""};
  }
`;

export const StandardButton = styled.button`
  padding: 8px 14px;
  border-radius: var(--radius-md-scaled);
  border: 1px solid var(--color-accent);
  background: var(--color-accent);
  color: var(--color-bg);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  &:hover {
    background: var(--accent-hover-color);
    border-color: var(--accent-hover-color);
  }
`;

export const StandardButtonSecondary = styled(StandardButton)`
  background: var(--color-surface);
  border-color: var(--color-border);
  color: var(--color-text);

  &:hover {
    filter: brightness(0.96);
  }
`;

export const StandardButtonGhost = styled(StandardButton)`
  background: transparent;
  border-color: var(--color-border);
  color: var(--color-text);

  &:hover {
    background: var(--color-panel);
  }
`;

export const StandardButtonGroup = styled.div`
  display: inline-flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`;

export const StandardButtonSuccess = styled(StandardButton)`
  background: var(--color-success);
  border-color: var(--color-success);
  color: var(--color-bg);

  &:hover {
    filter: brightness(0.92);
  }
`;

export const SurfaceButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md-scaled);
  background: var(--color-panel);
  color: var(--color-text);
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: var(--color-panel-strong);
  }
`;

export const StandardSelect = styled.select`
  padding: 8px 12px;
  border-radius: var(--radius-md-scaled);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  outline: none;
  cursor: pointer;
`;

export const StandardMultiSelect = styled.select.attrs({ multiple: true })`
  padding: 8px 12px;
  border-radius: var(--radius-md-scaled);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  outline: none;
  cursor: pointer;
`;

export const StandardTextInput = styled.input.attrs({ type: "text" })`
  padding: 8px 12px;
  border-radius: var(--radius-md-scaled);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  outline: none;
`;

export const ColorPicker = styled.input.attrs({ type: "color" })`
  width: 44px;
  height: 36px;
  padding: 0;
  border-radius: var(--radius-sm-scaled);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  cursor: pointer;
`;

export const StandardNumberInput = styled.input.attrs({ type: "number" })`
  padding: 8px 12px;
  border-radius: var(--radius-md-scaled);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  outline: none;
  width: 90px;
`;

export const StandardDateTimeInput = styled.input.attrs({ type: "datetime-local" })`
  padding: 8px 12px;
  border-radius: var(--radius-md-scaled);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  outline: none;
`;

export const StandardCheckbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: var(--color-accent);
`;

export const StandardCheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text);
`;

export const StandardTextArea = styled.textarea`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  flex: 1;
  min-height: 0;
  background: var(--color-surface);
  color: var(--color-text);
  border-radius: var(--radius-md-scaled);
  border: 1px solid var(--color-border);
  padding: 8px;
  outline: none;
  resize: none;
`;

export const SegmentedControl = styled.div`
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  border-radius: var(--radius-pill-scaled);
  background: var(--color-panel);
  border: 1px solid var(--color-border);
  flex-wrap: ${(props) => (props.$scroll ? "nowrap" : "wrap")};
  max-width: 100%;
  overflow-x: ${(props) => (props.$scroll ? "auto" : "visible")};
  -webkit-overflow-scrolling: touch;
`;

export const SegmentedButton = styled.button`
  border: none;
  border-radius: var(--radius-pill-scaled);
  padding: 6px 12px;
  background: ${(props) => (props.$active ? "var(--color-accent)" : "transparent")};
  color: ${(props) => (props.$active ? "var(--color-bg)" : "var(--color-text)")};
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s ease, color 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
`;

export const ToolbarSegmentedControl = styled(SegmentedControl)`
  background: var(--color-panel-strong);
  padding: 3px;

  ${(props) =>
    props.$labelMode === "icons" &&
    `
      .label {
        display: none;
      }
    `}

  ${(props) =>
    props.$labelMode === "selected" &&
    `
      .label {
        display: none;
      }
      [data-active="true"] .label {
        display: inline;
      }
    `}
`;

export const ToolbarSegmentedButton = styled(SegmentedButton)`
  padding: 4px 10px;
  font-size: 13px;
`;

export const ToggleThumb = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: var(--color-bg);
  position: absolute;
  top: 3px;
  left: 3px;
  transition: transform 0.2s ease;
`;

export const ToggleTrack = styled.span`
  position: relative;
  width: 42px;
  height: 22px;
  border-radius: var(--radius-pill-scaled);
  background: var(--color-border);
  transition: background 0.2s ease;
  display: inline-block;
`;

export const ToggleInput = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

export const ToggleSwitch = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: var(--color-text);

  ${ToggleInput}:checked + ${ToggleTrack} {
    background: var(--color-accent);
  }

  ${ToggleInput}:checked + ${ToggleTrack} ${ToggleThumb} {
    transform: translateX(20px);
  }
`;

export const LongPressIndicator = styled.div`
  position: absolute;
  width: 48px;
  height: 48px;
  pointer-events: none;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid var(--color-text);
  background: conic-gradient(var(--color-accent) var(--progress, 0%), transparent 0);
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-text);
  }
`;

export const TabsHeader = styled.div`
  display: flex;
  margin: 4px;
`;

export const TabButton = styled.button`
  flex: 1;
  border: none;
  padding: 6px;
  cursor: pointer;
  background: var(--color-panel);

  &.active {
    background: var(--color-accent);
    color: var(--color-bg);
  }
`;
