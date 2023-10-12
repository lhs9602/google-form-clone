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
  // survey에서 초기 배열을 생성. 각 질문의 제목과 필수 여부, 값을 포함한 배열을 반환
  const initialArray = survey.map((question) => {
    const value = question.type === "checkBox" ? [] : "";
    return [question.title, { isRequired: question.isRequired, value: value }];
  });
  const navigate = useNavigate();
  // 첫 번째 요소는 제목이므로 배열에서 제거
  initialArray.shift();

  //응답 저장을 위한 form
  const formik = useFormik<FormValues>({
    // 초기값 설정
    initialValues: Object.fromEntries(initialArray),
    // 유효성 검사 함수
    validate,
    // submit 이벤트 핸들러
    onSubmit: (values) => {
      console.log(values);
      // 결과 페이지로 이동
      navigate("/formResponse", { state: values });
    },
  });

  //일반 응답을 저장
  const handleResponse = (type: string, newValue: string | string[]) => {
    formik.setFieldValue(`${type}.value`, newValue);
    console.log("newValue", newValue);
    console.log("formik", formik.values);
  };
  //체크 박스 응답을 저장
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

  //응답 제출
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //필수 질문 답변여부 확인
    if (Object.keys(formik.errors).length > 0) {
      alert("필수값을 입력하지 않았습니다");
      return;
    }
    // formik의 submit 핸들러 호출
    formik.handleSubmit(e);
  };

  //응답 리셋
  const handleReset = () => {
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <ViewFormContainer>
        {survey.map((question) => {
          // 각 질문 유형에 따라 적절한 컴포넌트 렌더링
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
          {/* 제출 버튼 */}
          <Button type="submit" variant="contained">
            제출하기
          </Button>
          {/*응답 초기화 버튼 */}
          <Button variant="contained" onClick={handleReset} color="secondary">
            양식 지우기
          </Button>
        </ViewFormFooter>
      </ViewFormContainer>
    </form>
  );
}
export default ViewForm;
