import { useLocation } from "react-router-dom";
import { FormResponseBox, ResponseContainer } from "./FormResponse.styled";
import { Divider } from "@mui/joy";
import { Typography } from "@mui/material";
import { FormResponseProps } from "../../data/Type";

//제목과 응답을 출력
function FormResponse() {
  const { state } = useLocation();
  //state를 {title,value}의배열로 변환.
  const result = Object.entries(state).map(([key, value]) => {
    const Selectvalue = value as FormResponseProps;
    return { title: key, value: Selectvalue.value };
  });

  return (
    <FormResponseBox>
      {/* 질문의 제목과 답변들을 출력 */}
      {result.map((Select, index) => {
        return (
          <div key={index}>
            <ResponseContainer>
              <Typography variant="h5" color="primary">
                Title {index + 1}:
              </Typography>
              <Typography variant="h6">{Select.title}</Typography>
            </ResponseContainer>
            <ResponseContainer>
              <Typography variant="h5" color="secondary">
                옵션값:
              </Typography>
              <Typography variant="h6">{Select.value}</Typography>
            </ResponseContainer>
            <Divider />
          </div>
        );
      })}
    </FormResponseBox>
  );
}
export default FormResponse;
