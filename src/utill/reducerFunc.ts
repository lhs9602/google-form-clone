import { surveyProps } from "../data/Type";

// 기존 질문들의 focus 상태를 모두 해제하는 함수
export const clearFocus = (state: surveyProps[]) => {
  return state.map((question) => ({
    ...question,
    isFocused: false,
  }));
};
//특정 질문 탐색
export const findQuestion = (state: surveyProps[], id: string): surveyProps => {
  return state.find((question) => question.id === id) as surveyProps;
};

//특정 질문의 인덱스 탐색
export const findQuestionIndex = (state: surveyProps[], id: string) => {
  return state.findIndex((question) => question.id === id);
};
