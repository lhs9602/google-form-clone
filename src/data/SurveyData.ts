// surveyUtils.ts
import { nanoid } from "@reduxjs/toolkit";
import { contentProps, surveyProps } from "./Type";

// 초기 설문지 데이터
export const initialdata: surveyProps[] = [
  {
    id: nanoid(),
    type: "title",
    title: "제목 없는 설문지",
    contents: "",
    isFocused: false,
    isRequired: false,
  },
];

// 새로운 질문을 생성
// id와 질문의 순서를 인자로 받아 새로운 질문 객체를 반환
export const questionForm = (id: string, length: number): surveyProps => ({
  id,
  type: "radio",
  title: `질문 ${length}`,
  contents: [
    {
      contentId: id,
      text: `옵션 1`,
    },
  ],
  isFocused: true,
  isRequired: false,
  isEtc: false,
});

// 새로운 옵션을 생성하는 함수
// id와 옵션의 순서을 인자로 받아 새로운 옵션 객체를 반환
export const contentsForm = (id: string, num: number): contentProps => ({
  contentId: id,
  text: `옵션 ${num}`,
});

//질문 타입 모음
export const menuItems = [
  { value: "text", label: "단답형" },
  { value: "textarea", label: "장문형" },
  { value: "radio", label: "객관식 질문" },
  { value: "checkBox", label: "체크박스" },
  { value: "dropDown", label: "드롭다운" },
];
