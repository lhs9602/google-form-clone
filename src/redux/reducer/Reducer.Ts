import { createSlice, nanoid } from "@reduxjs/toolkit";
import { surveyProps } from "../../data/Type";

const initialdata: surveyProps[] = [
  {
    id: nanoid(),
    type: "title",
    title: "제목 없는 설문지",
    contents: "",
    isFocused: false,
    isRequired: false,
  },
];

const questionForm = (id: string): surveyProps => ({
  id,
  type: "radio",
  title: "제목",
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

export const surveySlice = createSlice({
  name: "survey",
  initialState: initialdata,
  reducers: {
    addQuestion: (state) => {
      const newState = state.map((question) => ({
        ...question,
        isFocused: false,
      }));
      const newQuestion = questionForm(nanoid());
      newState.push(newQuestion);
      return newState;
    },
    deleteQuestion: (state, action) => {
      const newState = state.map((question) => ({
        ...question,
        isFocused: false,
      }));
      const targetIndex = newState.findIndex(
        (question) => question.id === action.payload.id
      );

      if (targetIndex !== -1) {
        newState.splice(targetIndex, 1);
        //제거한 요소의 이전 요소가 title이 아니라면 이전 요소에 focus
        if (newState[targetIndex - 1].type !== "title") {
          newState[targetIndex - 1].isFocused = true;
        }
        //제거한 요소의 다음 요소가 존재하면 그 요소에 focus
        else if (targetIndex < state.length) {
          newState[targetIndex].isFocused = true;
        }
        //남은 요소가 title밖에 없다면 title에 focus
        else if (state.length === 1) {
          newState[0].isFocused = true;
        }

        return newState;
      }
    },
    focusState: (state, action) => {
      const newState = state.map((question) => ({
        ...question,
        isFocused: false,
      }));
      const targetState = newState.find(
        (question) => question.id === action.payload
      ) as surveyProps;
      targetState.isFocused = true;
      return newState;
    },
    setTitle: (state, action) => {
      const targetState = state.find(
        (question) => question.id === action.payload.id
      ) as surveyProps;
      targetState.title = action.payload.text;
    },

    setTitleContent: (state, action) => {
      const targetState = state.find(
        (question) => question.id === action.payload.id
      ) as surveyProps;
      targetState.contents = action.payload.text;
    },
    changeType: (state, action) => {
      const targetState = state.find(
        (question) => question.id === action.payload.id
      ) as surveyProps;

      if (["text", "textarea"].includes(action.payload.type)) {
        targetState.contents = " ";
        targetState.isEtc = false;
      } else if (
        ["text", "textarea"].includes(targetState.type) &&
        ["radio", "checkBox", "dropDown"].includes(action.payload.type)
      ) {
        targetState.contents = [
          {
            contentId: nanoid(),
            text: `옵션 1`,
          },
        ];

        if (action.payload.type === "dropDown") {
          targetState.isEtc = false;
        }
      }
      targetState.type = action.payload.type;
      console.log(targetState);
    },
  },
});

export const {
  addQuestion,
  deleteQuestion,
  focusState,
  setTitle,
  setTitleContent,
  changeType,
} = surveySlice.actions;
