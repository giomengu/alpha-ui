import React, { useState } from "react";
import styled from "styled-components";
import { FaFolder, FaFolderOpen, FaFile, FaChevronRight, FaChevronDown } from "react-icons/fa";

const BrowserContainer = styled.div`
  flex: 1;
  min-height: 0;
  min-width: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
  user-select: none;
`;

const TreeItem = styled.div`
  padding: 4px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: ${(props) => props.$depth * 16}px;
  border-radius: 4px;
  min-width: 0;

  &:hover {
    background: var(--color-panel);
  }

  ${(props) =>
    props.$selected &&
    `
    background: var(--color-panel);
    color: var(--color-text);
  `}
`;

const ItemName = styled.span`
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileBrowser = ({ fileTree, onFileSelect, onSelectItem, selectedPath }) => {
  const [expandedFolders, setExpandedFolders] = useState({});

  const toggleFolder = (path) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const renderTreeItem = (node, path = "", depth = 0) => {
    const currentPath = path ? `${path}/${node.name}` : node.name;
    const isFolder = node.type === "folder";
    const isExpanded = expandedFolders[currentPath];
    const isSelected = currentPath === selectedPath;

    return (
      <React.Fragment key={currentPath}>
        <TreeItem
          $depth={depth}
          $selected={isSelected}
          onClick={() => {
            if (isFolder) {
              toggleFolder(currentPath);
              onSelectItem?.(currentPath, "folder");
            } else {
              onSelectItem?.(currentPath, "file");
              onFileSelect?.(currentPath);
            }
          }}
        >
          {isFolder ? (
            <>
              {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
              {isExpanded ? <FaFolderOpen color="var(--color-warning)" /> : <FaFolder color="var(--color-warning)" />}
            </>
          ) : (
            <FaFile color="var(--color-info)" />
          )}
          <ItemName>{node.name}</ItemName>
        </TreeItem>

        {isFolder && isExpanded && node.children?.map((child) => renderTreeItem(child, currentPath, depth + 1))}
      </React.Fragment>
    );
  };

  return <BrowserContainer>{fileTree && renderTreeItem(fileTree)}</BrowserContainer>;
};

export default FileBrowser;
