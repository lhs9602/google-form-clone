import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";

import { OptionMark } from "../optionMark/OptionMark";
import { OptionContainer } from "../questionEditBody/QuestionEditBody.styled";
import { Typography } from "@mui/material";
import { addEtc, addOption } from "../../redux/reducer/Reducer";

export const AddOption = ({
  id,
  type,
  num,
  isEtc,
}: {
  id: string;
  type: string;
  num: number;
  isEtc?: boolean;
}) => {
  const dispatch = useDispatch();

  const handleOption = () => {
    dispatch(addOption({ id: id, num: num }));
  };
  const handleEtc = () => {
    dispatch(addEtc({ id: id }));
  };
  return (
    <OptionContainer style={{ paddingLeft: "20px" }}>
      {/* 타입에 따라 앞에 오는 아이콘 변경 */}
      <OptionMark type={type} num={isEtc ? num + 1 : num} />
      <Button variant="text" onClick={handleOption}>
        옵션 추가
      </Button>
      {/* 기타를 사용하는 객관식과 체크박스만 사용가능 */}
      {/* 이미 기타 항목이 있다면 보이지 않음*/}
      {!isEtc && type !== "dropDown" && (
        <>
          <Typography>또는</Typography>
          <Button variant="text" onClick={handleEtc}>
            '기타' 추가
          </Button>
        </>
      )}
    </OptionContainer>
  );
};
