import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

import { ViewFormContainer, ViewFormFooter } from "./ViewForm.styled";
import { TitlePreviewBox } from "../../component/titlePreviewBox/TitlePreviewBox";
import { FormValues, stateProps } from "../../data/Type";
import { CheckBoxPreviewBox } from "../../component/checkBoxPreviewBox/CheckBoxPreviewBox";
import { DropDownPreviewBox } from "../../component/dropDownPreviewBox/DropDownPreviewBox";
import { RadioPreviewBox } from "../../component/radioPreviewBox/RadioPreviewBox";
import { TextPreviewBox } from "../../component/textPreviewBox/TextPreviewBox";
import { TextareaPreviewBox } from "../../component/textareaPreviewBox/TextareaPreviewBox";
import { validate } from "../../utill/validate";

function ViewForm() {
  const survey = useSelector((state: stateProps) => state.survey);

  const initialArray = survey.map((question) => {
    const value = question.type === "checkBox" ? [] : "";
    return [question.title, { isRequired: question.isRequired, value: value }];
  });
  const navigate = useNavigate();

  initialArray.shift();

  const formik = useFormik<FormValues>({
    initialValues: Object.fromEntries(initialArray),

    validate,

    onSubmit: (values) => {
      console.log(values);

      navigate("/formResponse", { state: values });
    },
  });

  const handleResponse = (type: string, newValue: string | string[]) => {
    formik.setFieldValue(`${type}.value`, newValue);
    console.log("newValue", newValue);
    console.log("formik", formik.values);
  };

  const checkboxHandler = (questionTitle: string, text: string) => {
    const checkBoxValue = formik.values[questionTitle].value as string[];

    if (checkBoxValue.includes(text)) {
      formik.setFieldValue(
        `${questionTitle}.value`,
        checkBoxValue.filter((item: string) => item !== text)
      );
    } else {
      formik.setFieldValue(`${questionTitle}.value`, [...checkBoxValue, text]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.keys(formik.errors).length > 0) {
      alert("필수값을 입력하지 않았습니다");
      return;
    }

    formik.handleSubmit(e);
  };

  const handleReset = () => {
    window.location.reload();
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
              />
            );
          } else if (question.type === "textarea") {
            return (
              <TextareaPreviewBox
                key={question.id}
                question={question}
                handleResponse={handleResponse}
              />
            );
          } else if (question.type === "radio") {
            return (
              <RadioPreviewBox
                key={question.id}
                question={question}
                handleResponse={handleResponse}
              />
            );
          } else if (question.type === "checkBox") {
            return (
              <CheckBoxPreviewBox
                key={question.id}
                question={question}
                checkValue={formik.values[question.title].value as string[]}
                handleResponse={checkboxHandler}
              />
            );
          } else if (question.type === "dropDown") {
            return (
              <DropDownPreviewBox
                key={question.id}
                question={question}
                handleResponse={handleResponse}
              />
            );
          }
        })}
        <ViewFormFooter>
          <Button type="submit" variant="contained">
            제출하기
          </Button>

          <Button variant="contained" onClick={handleReset} color="secondary">
            양식 지우기
          </Button>
        </ViewFormFooter>
      </ViewFormContainer>
    </form>
  );
}
export default ViewForm;
