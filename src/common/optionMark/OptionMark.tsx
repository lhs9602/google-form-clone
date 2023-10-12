import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import { NumIcon } from "./OptionMark.styled";

export const OptionMark = ({ type, num }: { type: string; num: number }) => {
  return (
    <>
      {/*라디오 버튼,체크 박스, 드롭다운에 맞는 아이콘을 렌더링 */}
      {type === "radio" && <Radio disabled />}
      {type === "checkBox" && <Checkbox disabled />}
      {type === "dropDown" && <NumIcon>{num + 1}.</NumIcon>}
    </>
  );
};
