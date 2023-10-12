import { FormikErrors } from "formik";
import { FormValues } from "../data/Type";

//필수 질문에 답했는 지를 확인
export const validate = (values: FormValues): FormikErrors<FormValues> => {
  const errors: FormikErrors<FormValues> = {};

  // 질문 답변을 순회
  Object.entries(values).forEach(([key, { isRequired, value }]) => {
    // 필수 질문이 비어있을때
    if (
      isRequired &&
      (!value || (Array.isArray(value) && value.length === 0))
    ) {
      // errors 객체에 오류 메시지 추가
      errors[key] = { value: "fail" };
    }
  });

  // 오류 객체 반환
  return errors;
};
