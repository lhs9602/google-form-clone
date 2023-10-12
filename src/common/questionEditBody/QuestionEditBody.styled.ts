import { styled } from "styled-components";
import { TextField } from "@mui/material";

export const QuestionContainer = styled.span<{ $isFocused: boolean }>`
  padding: 24px;
  padding-top: 10px;

  outline: none;
  display: flex;
  flex-direction: column;
  height: fit-content;

  font-size: 24pt;
  position: relative;
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 5px;
`;
export const QuestionField = styled(TextField)<{ $isFocused: boolean }>`
  div {
    background-color: transparent;

    &::before {
      border-bottom: ${({ $isFocused }) =>
        $isFocused ? `1px solid gray` : "none"};
      border-bottom-style: none !important;
    }
  }
`;
export const DragHand = styled.div`
  display: flex;
  justify-content: center;
  visibility: visible;
  opacity: 0;
  transition: opacity 0.3s, visibility 0.3s;
  &:hover {
    visibility: visible;
    opacity: 1;
  }
  cursor: move;
`;
