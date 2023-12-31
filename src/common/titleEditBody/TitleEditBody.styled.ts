import { styled } from "styled-components";
import { TextField } from "@mui/material";

export const TitleContainer = styled.div`
  padding: 24px;
  outline: none;
  display: flex;
  flex-direction: column;
  height: fit-content;
  gap: 12px;
`;
export const TitleField = styled(TextField)<{
  $isFocused: boolean;
}>`
  div {
    background-color: transparent;

    &::before {
      border-bottom: ${({ $isFocused }) =>
        $isFocused ? `1px solid gray` : "none"};
    }
  }
`;
