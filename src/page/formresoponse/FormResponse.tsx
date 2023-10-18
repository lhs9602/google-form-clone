import { useLocation } from "react-router-dom";
import { FormResponseBox, ResponseContainer } from "./FormResponse.styled";
import { Divider } from "@mui/joy";
import { Typography } from "@mui/material";
import { FormResponseProps } from "../../data/Type";

//제목과 응답을 출력
function FormResponse() {
  const { state } = useLocation();

  const result = Object.entries(state).map(([key, value]) => {
    const Selectvalue = value as FormResponseProps;
    return { title: key, value: Selectvalue.value };
  });

  return (
    <FormResponseBox>
      {result.map((Select, index) => {
        return (
          <div key={index}>
            <ResponseContainer>
              <Typography
                style={{ whiteSpace: "nowrap" }}
                variant="h5"
                color="primary"
              >
                Title {index + 1}:
              </Typography>
              <Typography variant="h6">{Select.title}</Typography>
            </ResponseContainer>

            <ResponseContainer>
              <Typography
                style={{ whiteSpace: "nowrap" }}
                variant="h5"
                color="secondary"
              >
                옵션값:
              </Typography>

              {Array.isArray(Select.value) ? (
                Select.value.map((item, index) => (
                  <Typography key={index} variant="h6">
                    {item}
                  </Typography>
                ))
              ) : (
                <Typography variant="h6">{Select.value}</Typography>
              )}
            </ResponseContainer>
            <Divider />
          </div>
        );
      })}
    </FormResponseBox>
  );
}
export default FormResponse;
