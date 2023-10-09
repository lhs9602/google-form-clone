import styled from "styled-components";

export const HeaderContainer = styled.div`
  padding: 24px;
  padding-left: 0px;
  outline: none;
  display: flex;
`;

export const PreviewContainer = styled.div`
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgb(218, 220, 224);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: relative;
  padding: 20px;
  padding-top: 0px;
  gap: 10px;
`;
export const CustomContainer = styled.div`
  display: flex;
  margin-left: -11px;
  margin-right: 16px;
`;
