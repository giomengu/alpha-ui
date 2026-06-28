import React from "react";
import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--color-backdrop, rgba(0, 0, 0, 0.6));
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200000;
`;

const ModalBox = styled.div`
  background: var(--color-surface);
  color: var(--color-text);
  padding: 20px;
  border-radius: var(--radius-lg-scaled);
  min-width: 300px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: ${(props) => (props.$scrollBody ? "auto" : "hidden")};
  overflow-x: hidden;
  box-shadow: var(--shadow-strong);

  ${(props) =>
    props.$fixedSize &&
    `
    width: 80vw;
    height: 80vh;
    max-width: 80vw;
    max-height: 80vh;

    @media (max-width: 720px) {
      width: 100vw;
      height: 100vh;
      max-width: 100vw;
      max-height: 100vh;
      border-radius: 0;
    }
  `}
`;

const CloseButton = styled.button`
  float: right;
  margin-bottom: 10px;
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  border-radius: var(--radius-sm-scaled);
  cursor: pointer;
`;

export default function Modal({ children, onClose, fixedSize = false, scrollBody = true }) {
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalBox $fixedSize={fixedSize} $scrollBody={scrollBody} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} type="button">
          X
        </CloseButton>
        {children}
      </ModalBox>
    </ModalBackdrop>
  );
}
