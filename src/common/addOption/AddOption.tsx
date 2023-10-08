import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";

import { OptionMark } from "../optionMark/OptionMark";
import { OptionContainer } from "../questionEditBody/QuestionEditBody.styled";
import { Typography } from "@mui/material";

export const AddOption = ({
  type,
  num,
  isEtc,
}: {
  type: string;
  num: number;
  isEtc?: boolean;
}) => {
  const dispatch = useDispatch();

  return (
    <OptionContainer>
      <OptionMark type={type} num={isEtc ? num + 1 : num} />
      <Button variant="text">옵션 추가</Button>
      {!isEtc && (
        <>
          <Typography>또는</Typography>
          <Button variant="text">'기타' 추가</Button>
        </>
      )}
    </OptionContainer>
  );
};
