import { clearFocus } from "../../utill/ClearFocus";
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { surveyProps } from "../../data/type";

const initialdata: surveyProps[] = [
  {
    type: "title",
    title: "제목 없는 설문지",
    contents: "",
    isFocused: false,
  },
];

const questionForm = (): surveyProps => ({
  id: nanoid(),
  type: "radio",
  title: "",
  contents: [
    {
      contentId: nanoid(),
      text: `옵션 1`,
    },
  ],
  isFocused: true,
  isRequired: false,
});

export const surveySlice = createSlice({
  name: "survey",
  initialState: initialdata,
  reducers: {
    addQuestion: (state) => {
      clearFocus(state);
      const newQuestion = questionForm();
      state.push(newQuestion);
    },
    deleteQuestion: (state, action) => {
      const targetIndex = state.findIndex(
        (question) => question.id === action.payload.id
      );

      if (targetIndex !== -1) {
        state.splice(targetIndex, 1);
        //제거한 요소의 이전 요소가 title이 아니라면 이전 요소에 focus
        if (state[targetIndex - 1].type !== "title") {
          state[targetIndex - 1].isFocused = true;
        }
        //제거한 요소의 다음 요소가 존재하면 그 요소에 focus
        else if (targetIndex < state.length) {
          state[targetIndex].isFocused = true;
        }
        //남은 요소가 title밖에 없다면 title에 focus
        else if (state.length === 1) {
          state[0].isFocused = true;
        }
      }
    },
  },
});
