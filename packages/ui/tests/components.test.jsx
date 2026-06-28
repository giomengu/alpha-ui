import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import {
  ThemeGlobals,
  StandardButton,
  CollapsibleCard,
  WidgetGrid,
  WidgetFrame,
  PrimaryButton,
  PillTabButton,
  FileBrowser
} from "../src/index";

const SimpleWidget = ({ widget }) => <div>Widget {widget.id}</div>;

describe("alpha-ui components", () => {
  it("renders ThemeGlobals and StandardButton", () => {
    render(
      <>
        <ThemeGlobals />
        <StandardButton>Click</StandardButton>
      </>
    );

    expect(screen.getByText("Click")).toBeInTheDocument();
  });

  it("toggles CollapsibleCard", () => {
    render(
      <CollapsibleCard title="Card Title" defaultOpen>
        <div>Inner</div>
      </CollapsibleCard>
    );

    expect(screen.getByText("Inner")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Card Title"));
    expect(screen.queryByText("Inner")).toBeNull();
  });

  it("renders WidgetGrid with WidgetFrame", () => {
    const widgets = [
      { id: "1", type: "simple", position: { x: 0, y: 0 }, size: { width: 1, height: 1 } }
    ];

    render(
      <div style={{ width: 400, height: 300 }}>
        <WidgetGrid
          widgets={widgets}
          gridConfig={{ columns: 2, rows: 2, aspectRatio: true }}
          widgetRegistry={{ simple: SimpleWidget }}
          WidgetFrame={WidgetFrame}
        />
      </div>
    );

    expect(screen.getByText("Widget 1")).toBeInTheDocument();
  });

  it("renders alphafoam controls and file browser", () => {
    const tree = { name: "root", type: "folder", children: [{ name: "file.txt", type: "file" }] };
    render(
      <div>
        <PrimaryButton>Run</PrimaryButton>
        <PillTabButton $active>Tab</PillTabButton>
        <FileBrowser fileTree={tree} />
      </div>
    );

    expect(screen.getByText("Run")).toBeInTheDocument();
    expect(screen.getByText("Tab")).toBeInTheDocument();
    expect(screen.getByText("file.txt")).toBeInTheDocument();
  });
});
