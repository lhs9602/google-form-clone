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

  return (
    <OptionContainer style={{ paddingLeft: "20px" }}>
      <OptionMark type={type} num={isEtc ? num + 1 : num} />
      <Button
        variant="text"
        onClick={() => {
          dispatch(addOption({ id, num }));
        }}
      >
        옵션 추가
      </Button>
      {!isEtc && type !== "dropDown" && (
        <>
          <Typography>또는</Typography>
          <Button
            variant="text"
            onClick={() => {
              dispatch(addEtc({ id }));
            }}
          >
            '기타' 추가
          </Button>
        </>
      )}
    </OptionContainer>
  );
};
