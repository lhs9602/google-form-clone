import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import { NumIcon } from "./OptionMark.styled";

export const OptionMark = ({ type, num }: { type: string; num: number }) => {
  return (
    <>
      {type === "radio" && <Radio disabled />}
      {type === "checkBox" && <Checkbox disabled />}
      {type === "dropDown" && <NumIcon>{num + 1}.</NumIcon>}
    </>
  );
};
