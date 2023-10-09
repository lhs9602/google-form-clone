import { styled } from "styled-components";

export const BoxContainer = styled.div`
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgb(218, 220, 224);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: relative;
`;

export const FocusLine = styled.div`
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  position: absolute;
  top: 1px;
  left: 0px;
  background-color: rgb(66, 133, 244);
  height: 100%;
  width: 6px;
  z-index: 1;
`;
export const TitleHeader = styled.div`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 10px;
  left: -1px;
  top: -1px;
  width: 100%;
  background-color: rgb(103, 58, 183);
  z-index: 2;
`;
