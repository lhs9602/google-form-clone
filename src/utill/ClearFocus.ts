import { surveyProps } from "../data/type";

export const clearFocus = (state: surveyProps[]) => {
  const focusedIndex = state.findIndex((question) => question.isFocused);
  if (focusedIndex !== -1) {
    state[focusedIndex].isFocused = false;
  }
};
