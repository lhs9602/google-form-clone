import { styled } from "styled-components";
import { TextField } from "@mui/material";

export const QuestionContainer = styled.div`
  padding: 24px;
  outline: none;
  display: flex;
  flex-direction: column;
  height: fit-content;
  gap: 12px;
  font-size: 24pt;
`;
export const HeaderContainer = styled.div`
  display: flex;
  gap: 12px;
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
