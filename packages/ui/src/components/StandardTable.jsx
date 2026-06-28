import React, { useMemo, useState } from "react";
import styled from "styled-components";

const TableWrapper = styled.div`
  max-height: 500px;
  overflow-y: auto;
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md-scaled);
  height: 100%;
  background: var(--color-surface);
`;

const TableElem = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  color: var(--color-text);
  position: relative;
`;

const HeaderCell = styled.th.withConfig({
  shouldForwardProp: (prop) => prop !== "$sortable"
})`
  padding: ${(props) => (props.$compact ? "6px" : "8px")};
  border-bottom: 1px solid var(--color-border);
  cursor: ${(props) => (props.$sortable ? "pointer" : "default")};
  background-color: ${(props) => props.$headerBg || "var(--color-surface)"};
  color: var(--color-text);
  position: sticky;
  top: 0;
  text-align: left;
  z-index: 3;
`;

const DataCell = styled.td`
  padding: ${(props) => (props.$compact ? "6px 8px" : "8px")};
  text-align: left;
  border-bottom: 1px solid var(--color-border);
  background-color: transparent;
`;

const Row = styled.tr`
  background-color: ${(props) => {
    if (!props.$striped) return props.$rowBg;
    return props.$odd ? props.$rowAltBg : props.$rowBg;
  }};
`;

const FilterBar = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-card);
`;

const FilterInput = styled.input`
  flex: 1;
  padding: 6px 10px;
  border-radius: var(--radius-md-scaled);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  outline: none;
`;

const Resizer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 8px;
  cursor: col-resize;
  background: linear-gradient(
    to right,
    transparent,
    var(--color-border),
    transparent
  );
`;

const HeaderContent = styled.div`
  position: relative;
  padding-right: 8px;
`;

const HeaderLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const HeaderSort = styled.div`
  font-size: 10px;
  line-height: 1;
  margin-top: 2px;
  color: var(--color-text-muted);
`;

const StandardTable = ({
  headers = [],
  data = [],
  renderRow,
  striped = true,
  compact = false,
  showHeader = true,
  sortable = true,
  resizableColumns = false,
  minColumnWidth = 80,
  defaultColumnWidth = 160,
  filterable = false,
  filterKeys,
  filterPlaceholder = "Filter rows...",
  rowBg = "transparent",
  rowAltBg = "var(--color-bg)",
  headerBg
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [localFilter, setLocalFilter] = useState("");
  const [columnWidths, setColumnWidths] = useState(() => {
    const widths = {};
    headers.forEach((header) => {
      const key = header.key || header.label;
      widths[key] = header.width || defaultColumnWidth;
    });
    return widths;
  });

  const startResize = (key, event) => {
    event.preventDefault();
    event.stopPropagation();
    const startX = event.clientX;
    const startWidth = columnWidths[key] || defaultColumnWidth;

    const onMove = (e) => {
      const next = Math.max(minColumnWidth, startWidth + (e.clientX - startX));
      setColumnWidths((prev) => ({ ...prev, [key]: next }));
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const requestSort = (key, sortableHeader) => {
    if (!sortable || !sortableHeader) return;
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    const { key, direction } = sortConfig;
    if (!key) return 0;
    const valA = a[key] ?? "";
    const valB = b[key] ?? "";
    if (valA < valB) return direction === "asc" ? -1 : 1;
    if (valA > valB) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const filterValue = filterable ? localFilter.trim().toLowerCase() : "";
  const keysToFilter = filterKeys || headers.map((h) => h.key).filter(Boolean);

  const filteredData = useMemo(() => {
    if (!filterValue) return sortedData;
    return sortedData.filter((row) =>
      keysToFilter.some((key) => {
        const value = row[key];
        if (value == null) return false;
        return String(value).toLowerCase().includes(filterValue);
      })
    );
  }, [filterValue, keysToFilter, sortedData]);

  return (
    <TableWrapper>
      {filterable && (
        <FilterBar>
          <FilterInput
            value={localFilter}
            onChange={(event) => setLocalFilter(event.target.value)}
            placeholder={filterPlaceholder}
          />
        </FilterBar>
      )}
      <TableElem>
        {resizableColumns && (
          <colgroup>
            {headers.map((header) => {
              const key = header.key || header.label;
              return <col key={key} style={{ width: columnWidths[key] || defaultColumnWidth }} />;
            })}
          </colgroup>
        )}
        {showHeader && (
          <thead>
            <tr>
              {headers.map((h) => (
                <HeaderCell
                  key={h.key || h.label}
                  onClick={() => requestSort(h.key, h.sortable !== false)}
                  $sortable={sortable && h.sortable !== false}
                  $compact={compact}
                  $headerBg={headerBg}
                >
                  <HeaderContent>
                    <HeaderLabel>{h.label}</HeaderLabel>
                    {sortable && h.sortable !== false && sortConfig.key === h.key && (
                      <HeaderSort>{sortConfig.direction === "asc" ? "▲" : "▼"}</HeaderSort>
                    )}
                    {resizableColumns && (
                      <Resizer onMouseDown={(event) => startResize(h.key || h.label, event)} />
                    )}
                  </HeaderContent>
                </HeaderCell>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {filteredData.map((row, index) => {
            const Cell = (props) => <DataCell {...props} $compact={compact} />;
            const content = renderRow(row, Cell);
            if (React.isValidElement(content) && content.type === "tr") {
              const mergedStyle = {
                ...(content.props.style || {}),
                backgroundColor: striped
                  ? index % 2 === 1
                    ? rowAltBg
                    : rowBg
                  : rowBg
              };
              return React.cloneElement(content, {
                key: content.key || row.id || row.name || index,
                style: mergedStyle
              });
            }
            return (
              <Row
                key={row.id || row.name || index}
                $striped={striped}
                $odd={index % 2 === 1}
                $rowBg={rowBg}
                $rowAltBg={rowAltBg}
              >
                {content}
              </Row>
            );
          })}
        </tbody>
      </TableElem>
    </TableWrapper>
  );
};

export default StandardTable;
