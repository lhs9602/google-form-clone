import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import { styled } from "styled-components";

export const NumIcon = styled.div`
  font-size: 18px;
  padding-right: 6px;
  text-align: center;
  padding-bottom: 3px;
  padding-left: 15px;
`;

export const OptionMark = ({ type, num }: { type: string; num: number }) => {
  return (
    <>
      {type === "radio" && <Radio disabled />}
      {type === "checkBox" && <Checkbox disabled />}
      {type === "dropDown" && <NumIcon>{num + 1}.</NumIcon>}
    </>
  );
};
