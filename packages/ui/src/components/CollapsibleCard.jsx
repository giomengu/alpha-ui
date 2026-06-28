import { useState } from "react";
import styled from "styled-components";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const CardShell = styled.section`
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg-scaled);
  background: var(--color-card);
  box-shadow: var(--shadow-soft);
  display: flex;
  flex-direction: column;
  max-height: 100%;
  min-height: 20px;
  min-width: 20px;
  overflow: hidden;
`;

const CardHeader = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  cursor: pointer;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const CardSubtitle = styled.span`
  font-size: 12px;
  color: var(--color-text-muted);
`;

const CardBody = styled.div`
  padding: 14px;
  border-top: 1px solid var(--color-border);
  overflow: auto;
`;

const IconWrap = styled.span`
  width: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
`;

const ActionSlot = styled.div`
  margin-left: auto;
`;

const CollapsibleCard = ({ title, subtitle, defaultOpen = true, actions, children }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <CardShell>
      <CardHeader onClick={() => setOpen((prev) => !prev)} type="button">
        <IconWrap>{open ? <FaChevronDown /> : <FaChevronRight />}</IconWrap>
        <TitleBlock>
          <CardTitle>{title}</CardTitle>
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </TitleBlock>
        {actions && <ActionSlot onClick={(event) => event.stopPropagation()}>{actions}</ActionSlot>}
      </CardHeader>
      {open && <CardBody>{children}</CardBody>}
    </CardShell>
  );
};

export default CollapsibleCard;
