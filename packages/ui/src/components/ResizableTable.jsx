import React, { useMemo, useState } from "react";
import styled from "styled-components";

const TableWrapper = styled.div`
  height: 100%;
  overflow: auto;
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md-scaled);
  background: var(--color-bg);
`;

const TableElem = styled.table`
  width: max-content;
  min-width: 100%;
  border-collapse: collapse;
  color: var(--color-text);
  font-size: 12px;
`;

const HeaderCell = styled.th`
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 8px 10px;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  text-align: left;
  font-weight: 700;
  white-space: nowrap;
`;

const DataCell = styled.td`
  padding: 6px 10px;
  border-bottom: 1px solid var(--color-border);
  white-space: nowrap;
  color: var(--color-text);
`;

const Resizer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 6px;
  cursor: col-resize;
`;

const Row = styled.tr`
  background: ${(props) => (props.$striped ? "var(--color-surface)" : "var(--color-bg)")};
`;

const ResizableTable = ({
  columns = [],
  data = [],
  renderCell,
  defaultWidth = 160,
  minWidth = 80
}) => {
  const initialWidths = useMemo(() => {
    const widths = {};
    columns.forEach((col) => {
      widths[col.key] = col.width || defaultWidth;
    });
    return widths;
  }, [columns, defaultWidth]);

  const [widths, setWidths] = useState(initialWidths);

  const startResize = (key, event) => {
    event.preventDefault();
    const startX = event.clientX;
    const startWidth = widths[key] || defaultWidth;

    const onMove = (e) => {
      const next = Math.max(minWidth, startWidth + (e.clientX - startX));
      setWidths((prev) => ({ ...prev, [key]: next }));
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <TableWrapper>
      <TableElem>
        <colgroup>
          {columns.map((col) => (
            <col key={col.key} style={{ width: widths[col.key] || defaultWidth }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map((col) => (
              <HeaderCell key={col.key}>
                <div style={{ position: "relative", paddingRight: 8 }}>
                  {col.label}
                  <Resizer onMouseDown={(e) => startResize(col.key, e)} />
                </div>
              </HeaderCell>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <Row key={idx} $striped={idx % 2 === 1}>
              {columns.map((col) => (
                <DataCell key={col.key}>
                  {renderCell ? renderCell(row, col) : row[col.key]}
                </DataCell>
              ))}
            </Row>
          ))}
        </tbody>
      </TableElem>
    </TableWrapper>
  );
};

export default ResizableTable;
