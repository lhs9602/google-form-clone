import { useFormik } from "formik";
import { ViewFormContainer, ViewFormFooter } from "./ViewForm.styled";
import { TitlePreviewBox } from "../../component/titlePreviewBox/TitlePreviewBox";
import { useSelector } from "react-redux";
import { FormValues, stateProps } from "../../data/Type";
import { CheckBoxPreviewBox } from "../../component/checkBoxPreviewBox/CheckBoxPreviewBox";
import { DropDownPreviewBox } from "../../component/dropDownPreviewBox/DropDownPreviewBox";
import { RadioPreviewBox } from "../../component/radioPreviewBox/RadioPreviewBox";
import { TextPreviewBox } from "../../component/textPreviewBox/TextPreviewBox";
import { TextareaPreviewBox } from "../../component/textareaPreviewBox/TextareaPreviewBox";
import { Button } from "@mui/material";
import { validate } from "../../utill/validate";

function ViewForm() {
  const survey = useSelector((state: stateProps) => state.survey);
  const initialArray = survey.map((question) => {
    return [question.title, { isRequired: question.isRequired, value: "" }];
  });
  const formik = useFormik<FormValues>({
    initialValues: Object.fromEntries(initialArray),
    validate,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.keys(formik.errors).length > 0) {
      alert("Please fill out all required fields!");
      return;
    }
    console.log(e);
    //formik.handleSubmit(e);
  };

  const handleResponse = (type: string, newValue: string | string[]) => {
    formik.setFieldValue(`${type}.value`, newValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ViewFormContainer>
        {survey.map((question) => {
          if (question.type === "title") {
            return (
              <TitlePreviewBox
                key={question.id}
                title={question.title}
                contents={question.contents as string}
              />
            );
          } else if (question.type === "text") {
            return (
              <TextPreviewBox
                key={question.id}
                question={question}
                handleResponse={handleResponse}
                valuse={formik.values[question.title].value}
              />
            );
          } else if (question.type === "textarea") {
            return (
              <TextareaPreviewBox
                key={question.id}
                question={question}
                handleResponse={handleResponse}
                valuse={formik.values[question.title].value}
              />
            );
          } else if (question.type === "radio") {
            return (
              <RadioPreviewBox
                key={question.id}
                question={question}
                handleResponse={handleResponse}
                valuse={formik.values[question.title].value}
              />
            );
          } else if (question.type === "checkBox") {
            return (
              <CheckBoxPreviewBox
                key={question.id}
                question={question}
                handleResponse={handleResponse}
                valuse={formik.values[question.title].value}
              />
            );
          } else if (question.type === "dropDown") {
            return (
              <DropDownPreviewBox
                key={question.id}
                question={question}
                handleResponse={handleResponse}
                valuse={formik.values[question.title].value}
              />
            );
          }
        })}
        <ViewFormFooter>
          <Button type="submit" variant="contained">
            제출하기
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              window.location.reload();
            }}
            color="secondary"
          >
            양식 지우기
          </Button>
        </ViewFormFooter>
      </ViewFormContainer>
    </form>
  );
}
export default ViewForm;
