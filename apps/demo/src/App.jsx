import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import Editor from "@monaco-editor/react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  ThemeGlobals,
  themeTokens,
  lightThemeTokens,
  Button,
  AppContainer,
  GridContainer,
  Controls,
  ButtonGroup,
  LedIndicator,
  LogsContainer,
  LogDisplay,
  CommandSender,
  InputField,
  MapPanelMenu,
  ToolbarModalWrapper,
  ToolbarOption,
  SegmentedButton,
  SegmentedControl,
  StandardButton,
  StandardButtonGhost,
  StandardButtonGroup,
  StandardButtonSecondary,
  StandardButtonSuccess,
  StandardSelect,
  StandardMultiSelect,
  StandardNumberInput,
  StandardTextInput,
  StandardDateTimeInput,
  StandardTextArea,
  StandardCheckbox,
  StandardCheckboxLabel,
  ToolbarButton,
  ToolbarCheckbox,
  ToolbarCheckboxLabel,
  ToolbarColorInput,
  ToolbarNumberInput,
  ToolbarRangeInput,
  ToolbarSelect,
  ToolbarDateTimeInput,
  ToolbarTextInput,
  ToolbarWrapperHorizontal,
  ToolbarSegmentedButton,
  ToolbarSegmentedControl,
  ColorPicker,
  ToggleInput,
  ToggleSwitch,
  ToggleThumb,
  ToggleTrack,
  StandardTable,
  ResizableTable,
  Modal,
  CollapsibleCard,
  FileBrowser,
  CompactToolbarBar,
  CompactToolbarButton,
  PillTabBar,
  PillTabButton,
  SurfacePanel,
  SurfacePanelHeader,
  DetailsPanel,
  DetailsSummary,
  DetailsBody,
  FormGrid,
  InputGroup,
  ButtonRow,
  PrimaryButton,
  GhostButton,
  SummaryGrid,
  SummaryItem,
  ErrorBox,
  LoadingBadge,
  ToggleRow,
  CompactTable,
  DefinitionBadge,
  SmallButton,
  ModalTabs,
  ModalTabButton,
  CollapseButton,
  StatusPill,
  QueueList,
  QueueItem,
  FileList,
  FileRow,
  StatsGrid,
  StatCard,
  StatLabel,
  StatValue,
  StatRange,
  SettingsTabs,
  SettingsTabButton,
  SettingsSection,
  SettingsList,
  SettingsScrollable,
  SettingsBadge,
  ToolbarWrapper,
  ToolbarHorizontalStack,
  ToolbarIcon,
  ToolbarLabel,
  ToolbarH3,
  ToolbarSelect1,
  ToolbarSelectWrapper,
  ProgressBar,
  ProgressBarStepped,
  SurfaceButton,
  LongPressIndicator,
  TabsHeader,
  TabButton,
  WidgetGrid,
  WidgetFrame,
  ResizerStack,
  ResizerRow,
  ResizerColumn,
  ResizerPane,
  ResizerHandleVertical,
  ResizerHandleHorizontal,
  SplitPanel
} from "@alpha/ui";
import { FaCog, FaPause, FaPlay } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const shallowClone = (obj) => JSON.parse(JSON.stringify(obj));

const defaultPalettes = {
  dark: {
    bg: "#141618",
    surface: "#1c1f24",
    card: "rgba(0, 0, 0, 0.3)",
    text: "#f2f4f7",
    textMuted: "#b7c0cc",
    accent: "#4caf50",
    success: "#36b66a",
    info: "#4c87af",
    warning: "#f5a524",
    danger: "#d95c5c"
  },
  light: {
    bg: "#f4f6f8",
    surface: "#ffffff",
    card: "#f0f3f7",
    text: "#1a2028",
    textMuted: "#5f6b7a",
    accent: "#2a7d4f",
    success: "#1f8a57",
    info: "#2f6f9f",
    warning: "#d1891d",
    danger: "#c14c4c"
  }
};

const colorTokens = [
  ["--color-bg", "var(--color-bg)"],
  ["--color-surface", "var(--color-surface)"],
  ["--color-card", "var(--color-card)"],
  ["--color-panel", "var(--color-panel)"],
  ["--color-panel-strong", "var(--color-panel-strong)"],
  ["--color-text", "var(--color-text)"],
  ["--color-text-muted", "var(--color-text-muted)"],
  ["--color-accent", "var(--color-accent)"],
  ["--color-success", "var(--color-success)"],
  ["--color-info", "var(--color-info)"],
  ["--color-warning", "var(--color-warning)"],
  ["--color-danger", "var(--color-danger)"]
];

const ThemeEditor = ({ palette, onChange }) => (
  <div className="editor-grid">
    {Object.entries(palette).map(([key, value]) => (
      <label key={key}>
        {key}
        <input type="color" value={value} onChange={(e) => onChange(key, e.target.value)} />
      </label>
    ))}
  </div>
);

const WidgetGridDemo = ({ isEditMode }) => {
  const [widgets, setWidgets] = useState([
    {
      id: "w1",
      type: "simple",
      position: { x: 0, y: 0 },
      size: { width: 2, height: 2 },
      title: "Widget One"
    },
    {
      id: "w2",
      type: "simple",
      position: { x: 2, y: 0 },
      size: { width: 2, height: 3 },
      title: "Widget Two"
    },
    {
      id: "w3",
      type: "simple",
      position: { x: 0, y: 2 },
      size: { width: 2, height: 2 },
      title: "Widget Three"
    }
  ]);

  const widgetRegistry = useMemo(
    () => ({
      simple: ({ widget }) => (
        <div className="widget-body">
          <h4>{widget.title}</h4>
          <p>Drag or resize in edit mode.</p>
        </div>
      )
    }),
    []
  );

  return (
    <div className="widget-grid-demo">
      <WidgetGrid
        widgets={widgets}
        onWidgetsChange={setWidgets}
        isEditMode={isEditMode}
        gridConfig={{ columns: 6, rows: 6, aspectRatio: true }}
        widgetRegistry={widgetRegistry}
        WidgetFrame={WidgetFrame}
      />
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState("theme");
  const [activeSegment, setActiveSegment] = useState("Auto");
  const [modalOpen, setModalOpen] = useState(false);
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const saved = window.localStorage.getItem("alpha-ui-theme");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.mode) return parsed.mode;
      } catch (err) {
        return "dark";
      }
    }
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  const [paletteByMode, setPaletteByMode] = useState(() => {
    if (typeof window === "undefined") return defaultPalettes;
    const saved = window.localStorage.getItem("alpha-ui-theme");
    if (!saved) return defaultPalettes;
    try {
      const parsed = JSON.parse(saved);
      return { ...defaultPalettes, ...(parsed.palettes || {}) };
    } catch (err) {
      return defaultPalettes;
    }
  });

  const [sharedSettings, setSharedSettings] = useState(() => ({
    fontSans: themeTokens.fonts.sans,
    fontMono: themeTokens.fonts.mono,
    baseSize: themeTokens.sizes.base,
    useMonoForBase: false,
    radiusScale: 1
  }));

  const [tableFeatures, setTableFeatures] = useState({
    striped: true,
    compact: false,
    sortable: true,
    showHeader: true,
    resizable: false,
    filterable: false
  });

  const [verticalSplit, setVerticalSplit] = useState(58);
  const [horizontalSplit, setHorizontalSplit] = useState(52);
  const [dragging, setDragging] = useState(null);
  const verticalRef = useRef(null);
  const horizontalRef = useRef(null);

  const tokens = useMemo(() => {
    const base = shallowClone(themeTokens);
    base.colors = { ...base.colors, ...paletteByMode.dark };
    return base;
  }, [paletteByMode.dark]);

  const lightTokens = useMemo(() => {
    const base = shallowClone(lightThemeTokens);
    base.colors = { ...base.colors, ...paletteByMode.light };
    return base;
  }, [paletteByMode.light]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.dataset.theme = themeMode;
  }, [themeMode]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    root.style.setProperty("--font-sans", sharedSettings.useMonoForBase ? sharedSettings.fontMono : sharedSettings.fontSans);
    root.style.setProperty("--font-mono", sharedSettings.fontMono);
    root.style.setProperty("--size-base", sharedSettings.baseSize);
    root.style.setProperty("--radius-scale", sharedSettings.radiusScale.toString());
  }, [sharedSettings]);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (event) => {
      if (dragging === "vertical" && verticalRef.current) {
        const rect = verticalRef.current.getBoundingClientRect();
        const next = ((event.clientX - rect.left) / rect.width) * 100;
        setVerticalSplit(Math.min(80, Math.max(20, next)));
      }
      if (dragging === "horizontal" && horizontalRef.current) {
        const rect = horizontalRef.current.getBoundingClientRect();
        const next = ((event.clientY - rect.top) / rect.height) * 100;
        setHorizontalSplit(Math.min(80, Math.max(20, next)));
      }
    };
    const onUp = () => setDragging(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  const updatePalette = (key, value) => {
    setPaletteByMode((prev) => ({
      ...prev,
      [themeMode]: {
        ...prev[themeMode],
        [key]: value
      }
    }));
  };

  const handleSaveTheme = () => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "alpha-ui-theme",
      JSON.stringify({
        mode: themeMode,
        palettes: paletteByMode,
        shared: sharedSettings
      })
    );
  };

  const handleResetTheme = () => {
    setPaletteByMode(defaultPalettes);
  };

  const standardHeaders = [
    { key: "name", label: "Name" },
    { key: "value", label: "Value" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions", sortable: false, width: 140 }
  ];

  const standardRows = [
    { name: "AWA", value: "18", status: "Live" },
    { name: "TWS", value: "21", status: "Live" },
    { name: "COG", value: "264", status: "Sim" },
    { name: "SOG", value: "7.4", status: "Live" }
  ];

  const sampleFileTree = useMemo(
    () => ({
      name: "project",
      type: "folder",
      children: [
        {
          name: "system",
          type: "folder",
          children: [
            { name: "controlDict", type: "file" },
            { name: "fvSchemes", type: "file" }
          ]
        },
        {
          name: "constant",
          type: "folder",
          children: [{ name: "transportProperties", type: "file" }]
        },
        { name: "0", type: "folder", children: [{ name: "U", type: "file" }] }
      ]
    }),
    []
  );

  const chartData = useMemo(
    () => ({
      labels: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
      datasets: [
        {
          label: "Lift Coefficient",
          data: [0.2, 0.35, 0.28, 0.5, 0.43, 0.62, 0.58, 0.7],
          borderColor: "rgba(76, 135, 175, 0.9)",
          backgroundColor: "rgba(76, 135, 175, 0.2)",
          tension: 0.35
        },
        {
          label: "Drag Coefficient",
          data: [0.04, 0.05, 0.045, 0.06, 0.055, 0.07, 0.065, 0.08],
          borderColor: "rgba(245, 165, 36, 0.9)",
          backgroundColor: "rgba(245, 165, 36, 0.2)",
          tension: 0.35
        }
      ]
    }),
    []
  );

  const getCssVar = (name) =>
    typeof window === "undefined"
      ? ""
      : getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: getCssVar("--color-text") || "#cbd5f5" } }
      },
      scales: {
        x: {
          ticks: { color: getCssVar("--color-text-muted") || "#94a3b8" },
          grid: { color: getCssVar("--color-border") || "rgba(148,163,184,0.1)" }
        },
        y: {
          ticks: { color: getCssVar("--color-text-muted") || "#94a3b8" },
          grid: { color: getCssVar("--color-border") || "rgba(148,163,184,0.08)" }
        }
      }
    }),
    [themeMode, paletteByMode]
  );

  return (
    <div className="app">
      <ThemeGlobals tokens={tokens} lightTokens={lightTokens} />
      <header className="topbar">
        <div className="brand">
          <div className="brand-badge">alpha-ui</div>
          <div>
            <h1>Component Gallery</h1>
            <p>All controls from AlphaNav, verified in one place.</p>
          </div>
        </div>
        <div className="mode-toggle">
          <SegmentedControl>
            <SegmentedButton type="button" $active={themeMode === "dark"} onClick={() => setThemeMode("dark")}>
              Dark
            </SegmentedButton>
            <SegmentedButton type="button" $active={themeMode === "light"} onClick={() => setThemeMode("light")}>
              Light
            </SegmentedButton>
          </SegmentedControl>
        </div>
      </header>

      <main className="content">
        {activeTab === "theme" && (
          <section className="panel">
            <h2>Theme Tokens</h2>
            <div className="swatch-grid">
              {colorTokens.map(([label, color]) => (
                <div key={label} className="swatch">
                  <div className="swatch-color" style={{ background: color }} />
                  <div className="swatch-label">{label}</div>
                </div>
              ))}
            </div>

            <h2>Live Theme Tweaks</h2>
            <div className="demo-column">
              <div className="demo-row">
                <ToggleSwitch>
                  <ToggleInput checked={themeMode === "light"} onChange={(event) => setThemeMode(event.target.checked ? "light" : "dark")} />
                  <ToggleTrack>
                    <ToggleThumb />
                  </ToggleTrack>
                  Light mode
                </ToggleSwitch>
                <label>
                  Base Font
                  <StandardSelect
                    value={sharedSettings.fontSans}
                    onChange={(event) => setSharedSettings((prev) => ({ ...prev, fontSans: event.target.value }))}
                    style={{ marginLeft: 8 }}
                  >
                    <option value={'"Outfit", "Avenir Next", "Trebuchet MS", sans-serif'}>Outfit</option>
                    <option value={'"Space Grotesk", "Avenir Next", "Trebuchet MS", sans-serif'}>Space Grotesk</option>
                    <option value={'"IBM Plex Sans", "Segoe UI", sans-serif'}>IBM Plex Sans</option>
                    <option value={'"Manrope", "Segoe UI", sans-serif'}>Manrope</option>
                    <option value={'"Sora", "Segoe UI", sans-serif'}>Sora</option>
                    <option value={'"Plus Jakarta Sans", "Segoe UI", sans-serif'}>Plus Jakarta Sans</option>
                    <option value={'"Chivo", "Segoe UI", sans-serif'}>Chivo</option>
                  </StandardSelect>
                </label>
                <ToggleSwitch>
                  <ToggleInput
                    checked={sharedSettings.useMonoForBase}
                    onChange={(event) => setSharedSettings((prev) => ({ ...prev, useMonoForBase: event.target.checked }))}
                  />
                  <ToggleTrack>
                    <ToggleThumb />
                  </ToggleTrack>
                  Use mono as base
                </ToggleSwitch>
                <label>
                  Mono Font
                  <StandardSelect
                    value={sharedSettings.fontMono}
                    onChange={(event) => setSharedSettings((prev) => ({ ...prev, fontMono: event.target.value }))}
                    style={{ marginLeft: 8 }}
                  >
                    <option value={'"IBM Plex Mono", "Menlo", "Consolas", monospace'}>IBM Plex Mono</option>
                    <option value={'"Roboto Mono", "Menlo", "Consolas", monospace'}>Roboto Mono</option>
                    <option value={'"JetBrains Mono", "Menlo", "Consolas", monospace'}>JetBrains Mono</option>
                    <option value={'"Fira Code", "Menlo", "Consolas", monospace'}>Fira Code</option>
                    <option value={'"Space Mono", "Menlo", "Consolas", monospace'}>Space Mono</option>
                    <option value={'"Source Code Pro", "Menlo", "Consolas", monospace'}>Source Code Pro</option>
                  </StandardSelect>
                </label>
                <label>
                  Base Size
                  <StandardSelect
                    value={sharedSettings.baseSize}
                    onChange={(event) => setSharedSettings((prev) => ({ ...prev, baseSize: event.target.value }))}
                    style={{ marginLeft: 8 }}
                  >
                    <option value="13px">13px</option>
                    <option value="14px">14px</option>
                    <option value="15px">15px</option>
                    <option value="16px">16px</option>
                  </StandardSelect>
                </label>
                <label>
                  Radius
                  <StandardNumberInput
                    value={sharedSettings.radiusScale}
                    onChange={(event) => setSharedSettings((prev) => ({
                      ...prev,
                      radiusScale: Number.parseFloat(event.target.value || "1")
                    }))}
                    min="0.6"
                    max="1.6"
                    step="0.05"
                    style={{ marginLeft: 8 }}
                  />
                </label>
              </div>
              <div className="demo-row">
                <StandardButton onClick={handleSaveTheme}>Save Theme</StandardButton>
                <StandardButtonGhost onClick={handleResetTheme}>Reset Theme</StandardButtonGhost>
              </div>
              <div className="demo-row">
                <div className="demo-column">
                  <div className="demo-label">ColorPicker (new)</div>
                  <div className="demo-row">
                    <ColorPicker value={paletteByMode[themeMode].accent} onChange={(event) => updatePalette("accent", event.target.value)} />
                    <ColorPicker value={paletteByMode[themeMode].panel} onChange={(event) => updatePalette("panel", event.target.value)} />
                    <ColorPicker value={paletteByMode[themeMode].border} onChange={(event) => updatePalette("border", event.target.value)} />
                  </div>
                </div>
              </div>
              <div className="demo-row">
                <ToolbarCheckboxLabel>
                  <span style={{ width: 90 }}>Card</span>
                  <ToolbarColorInput value={paletteByMode[themeMode].card} onChange={(event) => updatePalette("card", event.target.value)} />
                </ToolbarCheckboxLabel>
                <ToolbarCheckboxLabel>
                  <span style={{ width: 90 }}>Background</span>
                  <ToolbarColorInput value={paletteByMode[themeMode].bg} onChange={(event) => updatePalette("bg", event.target.value)} />
                </ToolbarCheckboxLabel>
                <ToolbarCheckboxLabel>
                  <span style={{ width: 90 }}>Surface</span>
                  <ToolbarColorInput value={paletteByMode[themeMode].surface} onChange={(event) => updatePalette("surface", event.target.value)} />
                </ToolbarCheckboxLabel>
              </div>
              <div className="demo-row">
                <ToolbarCheckboxLabel>
                  <span style={{ width: 90 }}>Text</span>
                  <ToolbarColorInput value={paletteByMode[themeMode].text} onChange={(event) => updatePalette("text", event.target.value)} />
                </ToolbarCheckboxLabel>
                <ToolbarCheckboxLabel>
                  <span style={{ width: 90 }}>Muted</span>
                  <ToolbarColorInput value={paletteByMode[themeMode].textMuted} onChange={(event) => updatePalette("textMuted", event.target.value)} />
                </ToolbarCheckboxLabel>
              </div>
              <div className="demo-row">
                {(["accent", "success", "info", "warning", "danger"]).map((key) => (
                  <ToolbarCheckboxLabel key={key}>
                    <span style={{ width: 90 }}>{key}</span>
                    <ToolbarColorInput value={paletteByMode[themeMode][key]} onChange={(event) => updatePalette(key, event.target.value)} />
                  </ToolbarCheckboxLabel>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === "controls" && (
          <section className="panel">
            <h2>Standard Controls</h2>
            <div className="demo-column">
              <div className="demo-row">
                <StandardButton>Primary</StandardButton>
                <StandardButtonSecondary>Secondary</StandardButtonSecondary>
                <StandardButtonGhost>Ghost</StandardButtonGhost>
              </div>
              <div className="demo-row">
                <StandardTextInput placeholder="Standard text" />
                <StandardNumberInput defaultValue={12} />
                <StandardSelect>
                  <option>Standard select</option>
                  <option>Mode: Manual</option>
                </StandardSelect>
              </div>
              <div className="demo-row">
                <ToggleSwitch>
                  <ToggleInput defaultChecked />
                  <ToggleTrack>
                    <ToggleThumb />
                  </ToggleTrack>
                  Enhanced toggle
                </ToggleSwitch>
                <SegmentedControl>
                  {["Overview", "Data"].map((option) => (
                    <SegmentedButton key={option} $active={activeSegment === option} onClick={() => setActiveSegment(option)}>
                      {option}
                    </SegmentedButton>
                  ))}
                </SegmentedControl>
              </div>
            </div>

            <h2>Collapsible Cards</h2>
            <div className="demo-column">
              <CollapsibleCard title="Expanded card" subtitle="Use for dense settings">
                <div style={{ display: "grid", gap: 10 }}>
                  <StandardTextInput placeholder="Title" />
                  <StandardSelect>
                    <option>Mode: Auto</option>
                    <option>Mode: Manual</option>
                  </StandardSelect>
                </div>
              </CollapsibleCard>
              <CollapsibleCard title="Collapsed card" subtitle="Optional content" defaultOpen={false}>
                <div style={{ color: "var(--color-text-muted)" }}>Hidden content for secondary settings.</div>
              </CollapsibleCard>
            </div>

            <h2>Buttons With Selectors</h2>
            <div className="demo-column">
              <div className="selector-group">
                <StandardButton>Apply</StandardButton>
                <StandardSelect>
                  <option>Mode: Auto</option>
                  <option>Mode: Manual</option>
                  <option>Mode: Anchor</option>
                </StandardSelect>
              </div>
              <div className="selector-group">
                <StandardButton>Apply</StandardButton>
                <StandardMultiSelect>
                  <option>Mode: Auto</option>
                  <option>Mode: Manual</option>
                  <option>Mode: Anchor</option>
                </StandardMultiSelect>
              </div>
            </div>

            <h2>Toolbar Controls</h2>
            <div className="demo-column">
              <ToolbarWrapperHorizontal>
                <ToolbarButton className="active" title="Play">
                  <FaPlay />
                </ToolbarButton>
                <ToolbarButton title="Pause">
                  <FaPause />
                </ToolbarButton>
                <ToolbarButton className="blue" title="Settings">
                  <FaCog />
                </ToolbarButton>
              </ToolbarWrapperHorizontal>
              <div className="demo-row">
                <ToolbarTextInput placeholder="Text input" />
                <ToolbarNumberInput defaultValue={42} />
                <ToolbarSelect>
                  <option>Auto</option>
                  <option>Manual</option>
                </ToolbarSelect>
              </div>
              <div className="demo-row">
                <ToolbarCheckboxLabel>
                  <ToolbarCheckbox defaultChecked />
                  Toggle
                </ToolbarCheckboxLabel>
                <ToolbarRangeInput defaultValue={60} />
                <ToolbarColorInput defaultValue="#4caf50" />
              </div>
              <ToolbarSegmentedControl>
                {["overview", "data"].map((tab) => (
                  <ToolbarSegmentedButton key={tab} $active={activeSegment === tab} onClick={() => setActiveSegment(tab)}>
                    {tab}
                  </ToolbarSegmentedButton>
                ))}
              </ToolbarSegmentedControl>
              <ToolbarSegmentedControl $scroll $labelMode="selected">
                <ToolbarSegmentedButton $active data-active="true">
                  <ToolbarIcon>🏷️</ToolbarIcon>
                  <span className="label">Selected Only</span>
                </ToolbarSegmentedButton>
                <ToolbarSegmentedButton>
                  <ToolbarIcon>🔧</ToolbarIcon>
                  <span className="label">Tools</span>
                </ToolbarSegmentedButton>
                <ToolbarSegmentedButton>
                  <ToolbarIcon>📦</ToolbarIcon>
                  <span className="label">Inventory</span>
                </ToolbarSegmentedButton>
              </ToolbarSegmentedControl>
            </div>

            <h2>Resizers</h2>
            <ResizerStack>
              <ResizerRow ref={verticalRef}>
                <ResizerPane $basis={verticalSplit}>Left pane</ResizerPane>
                <ResizerHandleVertical onMouseDown={() => setDragging("vertical")} />
                <ResizerPane $basis={100 - verticalSplit} $alt>
                  Right pane
                </ResizerPane>
              </ResizerRow>
              <ResizerColumn ref={horizontalRef}>
                <ResizerPane $basis={horizontalSplit}>Top pane</ResizerPane>
                <ResizerHandleHorizontal onMouseDown={() => setDragging("horizontal")} />
                <ResizerPane $basis={100 - horizontalSplit} $alt>
                  Bottom pane
                </ResizerPane>
              </ResizerColumn>
            </ResizerStack>
          </section>
        )}

        {activeTab === "tables" && (
          <section className="panel">
            <h2>Tables</h2>
            <div className="demo-row">
              {Object.entries(tableFeatures).map(([key, value]) => (
                <ToggleSwitch key={key}>
                  <ToggleInput
                    checked={value}
                    onChange={(event) => setTableFeatures((prev) => ({ ...prev, [key]: event.target.checked }))}
                  />
                  <ToggleTrack>
                    <ToggleThumb />
                  </ToggleTrack>
                  {key}
                </ToggleSwitch>
              ))}
            </div>
            <div className="demo-row" style={{ flexWrap: "nowrap" }}>
              <div style={{ flex: 1, minWidth: 320 }}>
                <StandardTable
                  headers={standardHeaders}
                  data={standardRows}
                  striped={tableFeatures.striped}
                  compact={tableFeatures.compact}
                  sortable={tableFeatures.sortable}
                  resizableColumns={tableFeatures.resizable}
                  filterable={tableFeatures.filterable}
                  showHeader={tableFeatures.showHeader}
                  headerBg="var(--color-surface)"
                  rowBg="var(--color-card)"
                  rowAltBg="var(--color-surface)"
                  renderRow={(row, Cell) => (
                    <>
                      <Cell>{row.name}</Cell>
                      <Cell>{row.value}</Cell>
                      <Cell>{row.status}</Cell>
                      <Cell>
                        <ToolbarWrapperHorizontal $grow>
                          <ToolbarButton className="active">Edit</ToolbarButton>
                          <ToolbarButton className="bad">Del</ToolbarButton>
                        </ToolbarWrapperHorizontal>
                      </Cell>
                    </>
                  )}
                />
              </div>
            </div>
            <div className="demo-row">
              <StandardButton onClick={() => setModalOpen(true)}>Open Modal</StandardButton>
            </div>
          </section>
        )}

        {activeTab === "widgets" && (
          <section className="panel">
            <h2>Widget Grid</h2>
            <div className="demo-row">
              <ToggleSwitch>
                <ToggleInput
                  checked={tableFeatures.widgetEditMode || false}
                  onChange={(event) =>
                    setTableFeatures((prev) => ({ ...prev, widgetEditMode: event.target.checked }))
                  }
                />
                <ToggleTrack>
                  <ToggleThumb />
                </ToggleTrack>
                Edit mode
              </ToggleSwitch>
            </div>
            <WidgetGridDemo isEditMode={tableFeatures.widgetEditMode || false} />
          </section>
        )}

        {activeTab === "catalog" && (
          <section className="panel">
            <h2>Control Catalog</h2>
            <div className="catalog-layout">
              <div className="catalog-list">
                {[
                  "Containers",
                  "Settings",
                  "StandardButtons",
                  "Button",
                  "ToolbarButtons",
                  "ToolbarLayouts",
                  "CompactToolbar",
                  "MapPanel",
                  "ToolbarInputs",
                  "Panels",
                  "DetailsPanel",
                  "FormGrid",
                  "ButtonRow",
                  "Summary",
                  "Feedback",
                  "ToggleRow",
                  "Select",
                  "TextInput",
                  "NumberInput",
                  "DateTimeInput",
                  "TextArea",
                  "Checkbox",
                  "ColorPicker",
                  "Toggle",
                  "Segmented",
                  "SurfaceButton",
                  "Progress",
                  "TabsHeader",
                  "Table",
                  "ResizableTable",
                  "Modal",
                  "ToolbarModal",
                  "CollapsibleCard",
                  "Tabs",
                  "Badge",
                  "Resizers",
                  "SplitPanel",
                  "WidgetGrid",
                  "LongPress",
                  "QueueList",
                  "FileList",
                  "Stats",
                  "Logs",
                  "Indicators",
                  "FileBrowser",
                  "Graph",
                  "MonacoEditor",
                  "ThreeViewer"
                ].map((item) => (
                  <button
                    key={item}
                    className="catalog-item"
                    type="button"
                    onClick={() => setActiveSegment(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="catalog-detail">
                <h3>{activeSegment}</h3>
                {activeSegment === "Containers" && (
                  <>
                    <p>Variants: `AppContainer`, `GridContainer`, `Controls`, `ButtonGroup`</p>
                    <div style={{ display: "grid", gap: 8 }}>
                      <Controls>
                        <div>Control row</div>
                        <div>Control row</div>
                      </Controls>
                      <ButtonGroup>
                        <StandardButton>Left</StandardButton>
                        <StandardButtonSecondary>Right</StandardButtonSecondary>
                      </ButtonGroup>
                      <div style={{ border: "1px dashed var(--color-border)", padding: 8 }}>
                        AppContainer / GridContainer are full-screen layout shells.
                      </div>
                    </div>
                  </>
                )}
                {activeSegment === "Settings" && (
                  <>
                    <p>Variants: `SettingsTabs`, `SettingsTabButton`, `SettingsSection`</p>
                    <SettingsTabs>
                      <SettingsTabButton $active>General</SettingsTabButton>
                      <SettingsTabButton>Display</SettingsTabButton>
                    </SettingsTabs>
                    <SettingsSection>
                      <SettingsBadge>beta</SettingsBadge>
                      <SettingsScrollable>
                        <SettingsList>
                          <StandardTextInput placeholder="Setting value" />
                          <StandardNumberInput defaultValue={2} />
                        </SettingsList>
                      </SettingsScrollable>
                    </SettingsSection>
                  </>
                )}
                {activeSegment === "StandardButtons" && (
                  <>
                    <p>Variants: `StandardButton`, `StandardButtonSecondary`, `StandardButtonSuccess`, `StandardButtonGhost`, `StandardButtonGroup`</p>
                    <StandardButtonGroup>
                      <StandardButton>Primary</StandardButton>
                      <StandardButtonSecondary>Secondary</StandardButtonSecondary>
                      <StandardButtonSuccess>Success</StandardButtonSuccess>
                      <StandardButtonGhost>Ghost</StandardButtonGhost>
                    </StandardButtonGroup>
                  </>
                )}
                {activeSegment === "Button" && (
                  <>
                    <p>Variants: `Button` (custom), `StandardButton`, `StandardButtonSecondary`, `StandardButtonGhost`</p>
                    <Button backgroundColor="rgb(208, 211, 214)" color="#111" borderColor="#111">
                      Custom Button
                    </Button>
                    <StandardButton>Primary</StandardButton>
                    <StandardButtonSecondary>Secondary</StandardButtonSecondary>
                    <StandardButtonGhost>Ghost</StandardButtonGhost>
                  </>
                )}
                {activeSegment === "ToolbarButtons" && (
                  <>
                    <p>Variants: `ToolbarButton`, `ToolbarIcon`, `ToolbarLabel`, `ToolbarH3`</p>
                    <ToolbarWrapperHorizontal>
                      <ToolbarButton className="active">A</ToolbarButton>
                      <ToolbarButton>B</ToolbarButton>
                      <ToolbarButton className="bad">X</ToolbarButton>
                      <ToolbarButton className="blue">i</ToolbarButton>
                    </ToolbarWrapperHorizontal>
                    <ToolbarHorizontalStack>
                      <ToolbarIcon>★</ToolbarIcon>
                      <ToolbarLabel>Label</ToolbarLabel>
                      <ToolbarH3>Heading</ToolbarH3>
                    </ToolbarHorizontalStack>
                  </>
                )}
                {activeSegment === "ToolbarLayouts" && (
                  <>
                    <p>Variants: `ToolbarWrapper`, `ToolbarWrapperHorizontal`</p>
                    <ToolbarWrapper>
                      <ToolbarButton>One</ToolbarButton>
                      <ToolbarButton>Two</ToolbarButton>
                    </ToolbarWrapper>
                    <ToolbarWrapperHorizontal>
                      <ToolbarButton>One</ToolbarButton>
                      <ToolbarButton>Two</ToolbarButton>
                    </ToolbarWrapperHorizontal>
                  </>
                )}
                {activeSegment === "CompactToolbar" && (
                  <>
                    <p>Components: `CompactToolbarBar`, `CompactToolbarButton`</p>
                    <CompactToolbarBar>
                      <CompactToolbarButton $active>
                        <span className="label">Active</span>
                      </CompactToolbarButton>
                      <CompactToolbarButton>
                        <span className="label">Default</span>
                      </CompactToolbarButton>
                      <CompactToolbarButton disabled>
                        <span className="label">Disabled</span>
                      </CompactToolbarButton>
                    </CompactToolbarBar>
                  </>
                )}
                {activeSegment === "MapPanel" && (
                  <>
                    <p>Component: `MapPanelMenu`</p>
                    <div style={{ position: "relative", height: 120 }}>
                      <MapPanelMenu style={{ position: "absolute", bottom: 10, left: 10 }}>
                        Map Panel Menu
                      </MapPanelMenu>
                    </div>
                  </>
                )}
                {activeSegment === "ToolbarInputs" && (
                  <>
                    <p>Variants: `ToolbarTextInput`, `ToolbarNumberInput`, `ToolbarRangeInput`, `ToolbarColorInput`, `ToolbarDateTimeInput`</p>
                    <div className="demo-row">
                      <ToolbarTextInput placeholder="Text" />
                      <ToolbarNumberInput defaultValue={7} />
                      <ToolbarDateTimeInput />
                    </div>
                    <div className="demo-row">
                      <ToolbarRangeInput defaultValue={40} />
                      <ToolbarColorInput defaultValue="#4caf50" />
                    </div>
                  </>
                )}
                {activeSegment === "Panels" && (
                  <>
                    <p>Components: `SurfacePanel`, `SurfacePanelHeader`</p>
                    <SurfacePanel>
                      <SurfacePanelHeader>Panel header</SurfacePanelHeader>
                      <div>Panel body content</div>
                    </SurfacePanel>
                  </>
                )}
                {activeSegment === "DetailsPanel" && (
                  <>
                    <p>Components: `DetailsPanel`, `DetailsSummary`, `DetailsBody`</p>
                    <DetailsPanel open>
                      <DetailsSummary>Advanced Settings</DetailsSummary>
                      <DetailsBody>
                        <StandardTextInput placeholder="Value" />
                      </DetailsBody>
                    </DetailsPanel>
                  </>
                )}
                {activeSegment === "FormGrid" && (
                  <>
                    <p>Components: `FormGrid`, `InputGroup`</p>
                    <FormGrid>
                      <InputGroup>
                        Name
                        <input placeholder="Project name" />
                      </InputGroup>
                      <InputGroup>
                        Mode
                        <select>
                          <option>Auto</option>
                          <option>Manual</option>
                        </select>
                      </InputGroup>
                    </FormGrid>
                  </>
                )}
                {activeSegment === "ButtonRow" && (
                  <>
                    <p>Components: `ButtonRow`, `PrimaryButton`, `GhostButton`, `SmallButton`, `CollapseButton`</p>
                    <ButtonRow>
                      <PrimaryButton>Run</PrimaryButton>
                      <GhostButton>Cancel</GhostButton>
                      <SmallButton>Small</SmallButton>
                      <CollapseButton>Collapse</CollapseButton>
                    </ButtonRow>
                  </>
                )}
                {activeSegment === "Summary" && (
                  <>
                    <p>Components: `SummaryGrid`, `SummaryItem`</p>
                    <SummaryGrid>
                      <SummaryItem>Lift: 1.2</SummaryItem>
                      <SummaryItem>Drag: 0.04</SummaryItem>
                    </SummaryGrid>
                  </>
                )}
                {activeSegment === "Feedback" && (
                  <>
                    <p>Components: `ErrorBox`, `LoadingBadge`</p>
                    <ErrorBox>Sample error message.</ErrorBox>
                    <LoadingBadge>Loading…</LoadingBadge>
                  </>
                )}
                {activeSegment === "ToggleRow" && (
                  <>
                    <p>Component: `ToggleRow`</p>
                    <ToggleRow>
                      <input type="checkbox" defaultChecked />
                      Toggle row
                    </ToggleRow>
                  </>
                )}
                {activeSegment === "Select" && (
                  <>
                    <p>Variants: `StandardSelect`, `StandardMultiSelect`, `ToolbarSelect`, `ToolbarSelect1`, `ToolbarOption`</p>
                    <StandardSelect>
                      <option>Alpha</option>
                      <option>Beta</option>
                    </StandardSelect>
                    <StandardMultiSelect>
                      <option>One</option>
                      <option>Two</option>
                    </StandardMultiSelect>
                    <ToolbarSelect>
                      <ToolbarOption>Toolbar Select</ToolbarOption>
                    </ToolbarSelect>
                    <ToolbarSelectWrapper>
                      <ToolbarSelect1>
                        <ToolbarOption>Toolbar Select 1</ToolbarOption>
                      </ToolbarSelect1>
                      <ProgressBar style={{ position: "relative" }} />
                    </ToolbarSelectWrapper>
                  </>
                )}
                {activeSegment === "TextInput" && (
                  <>
                    <p>Variants: `StandardTextInput`, `ToolbarTextInput`</p>
                    <StandardTextInput placeholder="Standard" />
                    <ToolbarTextInput placeholder="Toolbar" />
                  </>
                )}
                {activeSegment === "NumberInput" && (
                  <>
                    <p>Variants: `StandardNumberInput`, `ToolbarNumberInput`</p>
                    <StandardNumberInput defaultValue={10} />
                    <ToolbarNumberInput defaultValue={22} />
                  </>
                )}
                {activeSegment === "DateTimeInput" && (
                  <>
                    <p>Variants: `StandardDateTimeInput`, `ToolbarDateTimeInput`</p>
                    <StandardDateTimeInput />
                    <ToolbarDateTimeInput />
                  </>
                )}
                {activeSegment === "TextArea" && (
                  <>
                    <p>Variants: `StandardTextArea`</p>
                    <StandardTextArea placeholder="Notes..." />
                  </>
                )}
                {activeSegment === "Checkbox" && (
                  <>
                    <p>Variants: `StandardCheckbox`, `StandardCheckboxLabel`</p>
                    <StandardCheckboxLabel>
                      <StandardCheckbox />
                      Check me
                    </StandardCheckboxLabel>
                  </>
                )}
                {activeSegment === "Toggle" && (
                  <>
                    <p>Variants: `ToggleSwitch`, `ToolbarCheckbox`</p>
                    <ToggleSwitch>
                      <ToggleInput defaultChecked />
                      <ToggleTrack>
                        <ToggleThumb />
                      </ToggleTrack>
                      Toggle
                    </ToggleSwitch>
                    <ToolbarCheckboxLabel>
                      <ToolbarCheckbox defaultChecked />
                      Checkbox
                    </ToolbarCheckboxLabel>
                  </>
                )}
                {activeSegment === "Segmented" && (
                  <>
                    <p>Variants: `SegmentedControl`, `ToolbarSegmentedControl`</p>
                    <SegmentedControl>
                      <SegmentedButton $active>One</SegmentedButton>
                      <SegmentedButton>Two</SegmentedButton>
                    </SegmentedControl>
                    <ToolbarSegmentedControl>
                      <ToolbarSegmentedButton $active>One</ToolbarSegmentedButton>
                      <ToolbarSegmentedButton>Two</ToolbarSegmentedButton>
                    </ToolbarSegmentedControl>
                  </>
                )}
                {activeSegment === "SurfaceButton" && (
                  <>
                    <p>Variant: `SurfaceButton`</p>
                    <div style={{ width: 140, height: 80 }}>
                      <SurfaceButton>Surface</SurfaceButton>
                    </div>
                  </>
                )}
                {activeSegment === "Progress" && (
                  <>
                    <p>Variants: `ProgressBar`, `ProgressBarStepped`</p>
                    <div style={{ position: "relative", height: 24 }}>
                      <ProgressBar style={{ position: "absolute", bottom: 0 }} />
                    </div>
                    <div style={{ position: "relative", height: 24 }}>
                      <ProgressBarStepped style={{ position: "absolute", bottom: 0 }} />
                    </div>
                  </>
                )}
                {activeSegment === "TabsHeader" && (
                  <>
                    <p>Variants: `TabsHeader`, `TabButton`</p>
                    <TabsHeader>
                      <TabButton className="active">One</TabButton>
                      <TabButton>Two</TabButton>
                    </TabsHeader>
                  </>
                )}
                {activeSegment === "Table" && (
                  <>
                    <p>Variants: `StandardTable`, `CompactTable`</p>
                    <StandardTable
                      headers={standardHeaders}
                      data={standardRows}
                      renderRow={(row, Cell) => (
                        <>
                          <Cell>{row.name}</Cell>
                          <Cell>{row.value}</Cell>
                          <Cell>{row.status}</Cell>
                          <Cell>-</Cell>
                        </>
                      )}
                    />
                    <CompactTable>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Case A</td>
                          <td>Ready</td>
                        </tr>
                      </tbody>
                    </CompactTable>
                  </>
                )}
                {activeSegment === "ResizableTable" && (
                  <>
                    <p>Variant: `ResizableTable`</p>
                    <ResizableTable
                      columns={[
                        { key: "name", label: "Name" },
                        { key: "status", label: "Status" }
                      ]}
                      data={[
                        { name: "Alpha", status: "Ready" },
                        { name: "Bravo", status: "Running" }
                      ]}
                    />
                  </>
                )}
                {activeSegment === "Modal" && (
                  <>
                    <p>Variants: `Modal`</p>
                    <StandardButton onClick={() => setModalOpen(true)}>Open Modal</StandardButton>
                  </>
                )}
                {activeSegment === "ToolbarModal" && (
                  <>
                    <p>Component: `ToolbarModalWrapper`</p>
                    <ToolbarModalWrapper style={{ position: "static" }}>
                      <div style={{ padding: 12 }}>Toolbar modal wrapper</div>
                    </ToolbarModalWrapper>
                  </>
                )}
                {activeSegment === "CollapsibleCard" && (
                  <>
                    <p>Component: `CollapsibleCard`</p>
                    <CollapsibleCard title="Expanded card" subtitle="Use for dense settings">
                      <div style={{ display: "grid", gap: 8 }}>
                        <StandardTextInput placeholder="Title" />
                        <StandardSelect>
                          <option>Mode: Auto</option>
                          <option>Mode: Manual</option>
                        </StandardSelect>
                      </div>
                    </CollapsibleCard>
                  </>
                )}
                {activeSegment === "Tabs" && (
                  <>
                    <p>Variants: `PillTabBar`, `PillTabButton`, `ModalTabs`</p>
                    <PillTabBar>
                      <PillTabButton $active>Tab A</PillTabButton>
                      <PillTabButton>Tab B</PillTabButton>
                    </PillTabBar>
                    <ModalTabs>
                      <ModalTabButton $active>Modal A</ModalTabButton>
                      <ModalTabButton>Modal B</ModalTabButton>
                    </ModalTabs>
                  </>
                )}
                {activeSegment === "Badge" && (
                  <>
                    <p>Variants: `DefinitionBadge`, `StatusPill`, `SettingsBadge`</p>
                    <DefinitionBadge $variant="success">ok</DefinitionBadge>
                    <DefinitionBadge $variant="pending">pending</DefinitionBadge>
                    <DefinitionBadge $variant="error">error</DefinitionBadge>
                    <StatusPill $status="Running">Running</StatusPill>
                    <SettingsBadge>beta</SettingsBadge>
                  </>
                )}
                {activeSegment === "Resizers" && (
                  <>
                    <p>Variants: `ResizerStack`, `ResizerRow`, `ResizerColumn`</p>
                    <ResizerStack>
                      <ResizerRow>
                        <ResizerPane $basis={60}>Left</ResizerPane>
                        <ResizerHandleVertical />
                        <ResizerPane $basis={40} $alt>
                          Right
                        </ResizerPane>
                      </ResizerRow>
                      <ResizerColumn>
                        <ResizerPane $basis={50}>Top</ResizerPane>
                        <ResizerHandleHorizontal />
                        <ResizerPane $basis={50} $alt>
                          Bottom
                        </ResizerPane>
                      </ResizerColumn>
                    </ResizerStack>
                  </>
                )}
                {activeSegment === "SplitPanel" && (
                  <>
                    <p>Component: `SplitPanel`</p>
                    <div style={{ minHeight: 200 }}>
                      <SplitPanel
                        left={<div className="panel-lite">Left panel</div>}
                        right={<div className="panel-lite">Right panel</div>}
                      />
                    </div>
                  </>
                )}
                {activeSegment === "WidgetGrid" && (
                  <>
                    <p>Components: `WidgetGrid`, `WidgetFrame`</p>
                    <WidgetGridDemo isEditMode />
                  </>
                )}
                {activeSegment === "LongPress" && (
                  <>
                    <p>Component: `LongPressIndicator`</p>
                    <div style={{ position: "relative", height: 120 }}>
                      <LongPressIndicator style={{ left: 60, top: 60, position: "absolute" }} />
                    </div>
                  </>
                )}
                {activeSegment === "QueueList" && (
                  <>
                    <p>Components: `QueueList`, `QueueItem`</p>
                    <QueueList>
                      <QueueItem>
                        <span>Queue job 1</span>
                        <GhostButton>Remove</GhostButton>
                      </QueueItem>
                    </QueueList>
                  </>
                )}
                {activeSegment === "FileList" && (
                  <>
                    <p>Components: `FileList`, `FileRow`</p>
                    <FileList>
                      <FileRow>
                        <input type="checkbox" defaultChecked />
                        airfoil_a.dat
                      </FileRow>
                      <FileRow>
                        <input type="checkbox" />
                        airfoil_b.dat
                      </FileRow>
                    </FileList>
                  </>
                )}
                {activeSegment === "Stats" && (
                  <>
                    <p>Components: `StatsGrid`, `StatCard`, `StatLabel`, `StatValue`, `StatRange`</p>
                    <StatsGrid>
                      <StatCard>
                        <StatLabel>Lift</StatLabel>
                        <StatValue>1.22</StatValue>
                        <StatRange>
                          <input placeholder="min" />
                          <input placeholder="max" />
                        </StatRange>
                      </StatCard>
                      <StatCard $alert>
                        <StatLabel>Drag</StatLabel>
                        <StatValue>0.07</StatValue>
                      </StatCard>
                    </StatsGrid>
                  </>
                )}
                {activeSegment === "Logs" && (
                  <>
                    <p>Components: `LogsContainer`, `LogDisplay`, `CommandSender`, `InputField`</p>
                    <LogsContainer style={{ height: 120 }}>
                      <LogDisplay>{"[12:00] Connected\n[12:01] Data stream OK"}</LogDisplay>
                    </LogsContainer>
                    <CommandSender>
                      <InputField placeholder="Command" />
                      <StandardButton>Send</StandardButton>
                    </CommandSender>
                  </>
                )}
                {activeSegment === "Indicators" && (
                  <>
                    <p>Components: `LedIndicator`, `StatusPill`</p>
                    <div className="demo-row">
                      <LedIndicator connected />
                      <LedIndicator />
                      <StatusPill $status="Queued">Queued</StatusPill>
                    </div>
                  </>
                )}
                {activeSegment === "FileBrowser" && (
                  <>
                    <p>Component: `FileBrowser`</p>
                    <div style={{ height: 200 }}>
                      <FileBrowser fileTree={sampleFileTree} />
                    </div>
                  </>
                )}
                {activeSegment === "Graph" && (
                  <>
                    <p>Component: Chart.js Line</p>
                    <div className="chart-shell">
                      <Line data={chartData} options={chartOptions} />
                    </div>
                  </>
                )}
                {activeSegment === "MonacoEditor" && (
                  <>
                    <p>Component: Monaco Editor</p>
                    <div className="monaco-shell">
                      <Editor
                        height="160px"
                        defaultLanguage="cpp"
                        theme="vs-dark"
                        defaultValue={`// OpenFOAM config\nFoamFile\n{\n  version 2.0;\n  format ascii;\n}\n`}
                        options={{ minimap: { enabled: false }, fontSize: 12, scrollBeyondLastLine: false }}
                      />
                    </div>
                  </>
                )}
                {activeSegment === "ThreeViewer" && (
                  <>
                    <p>Component: Three.js viewer</p>
                    <div className="viewer-shell">
                      <Canvas camera={{ position: [2.6, 2.2, 2.8], fov: 50 }}>
                        <ambientLight intensity={0.6} />
                        <directionalLight position={[4, 4, 2]} intensity={0.8} />
                        <mesh position={[-0.8, 0, 0]}>
                          <boxGeometry args={[0.7, 0.7, 0.7]} />
                          <meshStandardMaterial color="#4caf50" />
                        </mesh>
                        <mesh position={[0.8, 0, 0]}>
                          <sphereGeometry args={[0.45, 32, 32]} />
                          <meshStandardMaterial color="#4c87af" />
                        </mesh>
                        <mesh position={[0, -0.8, 0]}>
                          <coneGeometry args={[0.35, 0.8, 32]} />
                          <meshStandardMaterial color="#f5a524" />
                        </mesh>
                        <OrbitControls enableZoom={false} />
                      </Canvas>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        )}

        {activeTab === "guide" && (
          <section className="panel guide-layout">
            <aside className="guide-nav">
              <div className="guide-title">Developer Guide</div>
              <nav>
                {[
                  { id: "guide-inputs", label: "Inputs" },
                  { id: "guide-buttons", label: "Buttons" },
                  { id: "guide-toggles", label: "Toggles" },
                  { id: "guide-tabs", label: "Tabs & Segments" },
                  { id: "guide-tables", label: "Tables" },
                  { id: "guide-layout", label: "Layout" },
                  { id: "guide-feedback", label: "Feedback" }
                ].map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="guide-link">
                    {item.label}
                  </a>
                ))}
              </nav>
            </aside>
            <div className="guide-content">
              <section id="guide-inputs" className="guide-section">
                <h2>Inputs</h2>
                <p>Use `StandardTextInput`, `StandardNumberInput`, `StandardTextArea`, `StandardSelect`.</p>
                <div className="demo-row">
                  <StandardTextInput placeholder="Text" />
                  <StandardNumberInput placeholder="Number" />
                  <StandardSelect>
                    <option>Option</option>
                  </StandardSelect>
                  <ColorPicker />
                </div>
              </section>
              <section id="guide-buttons" className="guide-section">
                <h2>Buttons</h2>
                <p>Use the Standard* variants for semantic actions.</p>
                <div className="demo-row">
                  <StandardButton>Primary</StandardButton>
                  <StandardButtonGhost>Ghost</StandardButtonGhost>
                  <StandardButtonSecondary>Secondary</StandardButtonSecondary>
                  <StandardButtonSuccess>Success</StandardButtonSuccess>
                </div>
              </section>
              <section id="guide-toggles" className="guide-section">
                <h2>Toggles</h2>
                <div className="demo-row">
                  <ToggleSwitch>
                    <ToggleInput />
                    <ToggleTrack>
                      <ToggleThumb />
                    </ToggleTrack>
                    Toggle
                  </ToggleSwitch>
                </div>
              </section>
              <section id="guide-tabs" className="guide-section">
                <h2>Tabs & Segmented Controls</h2>
                <div className="demo-row">
                  <ToolbarSegmentedControl $scroll $labelMode="selected">
                    <ToolbarSegmentedButton $active data-active="true">
                      <span className="label">Active</span>
                    </ToolbarSegmentedButton>
                    <ToolbarSegmentedButton>Hidden Label</ToolbarSegmentedButton>
                  </ToolbarSegmentedControl>
                </div>
              </section>
              <section id="guide-tables" className="guide-section">
                <h2>Tables</h2>
                <StandardTable
                  headers={[{ key: "name", label: "Name" }, { key: "value", label: "Value" }]}
                  data={[{ name: "Alpha", value: "1" }, { name: "Beta", value: "2" }]}
                  compact
                  headerBg="var(--color-panel)"
                  renderRow={(row, Cell) => (
                    <>
                      <Cell>{row.name}</Cell>
                      <Cell>{row.value}</Cell>
                    </>
                  )}
                />
              </section>
              <section id="guide-layout" className="guide-section">
                <h2>Layout</h2>
                <div className="demo-row">
                  <SurfacePanel>
                    <SurfacePanelHeader>Panel Header</SurfacePanelHeader>
                    <div>Content</div>
                  </SurfacePanel>
                  <DetailsPanel>
                    <DetailsSummary>Expandable</DetailsSummary>
                    <DetailsBody>Details body</DetailsBody>
                  </DetailsPanel>
                </div>
              </section>
              <section id="guide-feedback" className="guide-section">
                <h2>Feedback</h2>
                <div className="demo-row">
                  <StatusPill $status="Running">Running</StatusPill>
                  <ErrorBox>Example error message</ErrorBox>
                  <LoadingBadge>Loading…</LoadingBadge>
                </div>
              </section>
            </div>
          </section>
        )}
      </main>

      <div className="tab-dock">
        <SegmentedControl $scroll>
          {["theme", "controls", "tables", "widgets", "catalog", "guide"].map((tab) => (
            <SegmentedButton key={tab} $active={activeTab === tab} onClick={() => setActiveTab(tab)}>
              {tab}
            </SegmentedButton>
          ))}
        </SegmentedControl>
      </div>

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h3 style={{ marginTop: 0 }}>System Alert</h3>
          <p style={{ color: "var(--color-text-muted)" }}>
            Modal preview with primary and secondary actions.
          </p>
          <div className="demo-row">
            <StandardButtonSuccess>Acknowledge</StandardButtonSuccess>
            <Button backgroundColor="rgb(231, 75, 75)" color="white">
              Dismiss
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default App;
