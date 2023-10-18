import { createSlice, nanoid } from "@reduxjs/toolkit";
import { contentProps } from "../../data/Type";
import { initialdata, questionForm, contentsForm } from "../../data/SurveyData";
import {
  clearFocus,
  findQuestion,
  findQuestionIndex,
} from "../../utill/reducerFunc";

export const surveySlice = createSlice({
  name: "survey",
  initialState: initialdata,
  reducers: {
    addQuestion: (state) => {
      const newState = clearFocus(state);

      newState.push(questionForm(nanoid(), newState.length));
      return newState;
    },

    deleteQuestion: (state, action) => {
      const newState = clearFocus(state);

      const targetIndex = findQuestionIndex(newState, action.payload.id);

      if (targetIndex !== -1) {
        newState.splice(targetIndex, 1);

        if (
          newState[targetIndex - 1] &&
          newState[targetIndex - 1].type !== "title"
        ) {
          newState[targetIndex - 1].isFocused = true;
        } else if (newState.length === 1 || targetIndex < state.length) {
          newState[targetIndex]
            ? (newState[targetIndex].isFocused = true)
            : (newState[0].isFocused = true);
        }
        return newState;
      }
    },

    focusState: (state, action) => {
      const newState = clearFocus(state);

      const targetState = findQuestion(newState, action.payload);

      targetState.isFocused = true;
      return newState;
    },

    setTitle: (state, action) => {
      const targetState = findQuestion(state, action.payload.id);

      targetState.title = action.payload.text;
    },

    setTitleContent: (state, action) => {
      const targetState = findQuestion(state, action.payload.id);

      targetState.contents = action.payload.text;
    },

    changeType: (state, action) => {
      const targetState = findQuestion(state, action.payload.id);

      const textTypes = ["text", "textarea"];
      const choiceTypes = ["radio", "checkBox", "dropDown"];

      if (textTypes.includes(action.payload.type)) {
        targetState.contents = " ";

        targetState.isEtc = false;
      } else if (
        textTypes.includes(targetState.type) &&
        choiceTypes.includes(action.payload.type)
      ) {
        targetState.contents = [contentsForm(nanoid(), 1)];

        if (action.payload.type === "dropDown") {
          targetState.isEtc = false;
        }
      }

      targetState.type = action.payload.type;
    },

    addOption: (state, action) => {
      const targetState = findQuestion(state, action.payload.id);

      const targetContents = targetState.contents as contentProps[];

      targetContents.push(contentsForm(nanoid(), action.payload.num + 1));
    },

    deleteOption: (state, action) => {
      const targetState = findQuestion(state, action.payload.id);

      const targetContents = targetState.contents as contentProps[];

      const targetOptionIndex = targetContents.findIndex(
        (option: contentProps) => option.contentId === action.payload.contentId
      );

      targetContents.splice(targetOptionIndex, 1);
    },

    changeOption: (state, action) => {
      const targetState = findQuestion(state, action.payload.id);

      const targetContents = targetState.contents as contentProps[];

      const targetOption = targetContents.find(
        (option: contentProps) => option.contentId === action.payload.contentId
      ) as contentProps;

      targetOption.text = action.payload.text;
    },

    addEtc: (state, action) => {
      const targetState = findQuestion(state, action.payload.id);

      targetState.isEtc = true;
    },

    deleteEtc: (state, action) => {
      const targetState = findQuestion(state, action.payload.id);

      targetState.isEtc = false;
    },

    copyQuestion: (state, action) => {
      const newState = clearFocus(state);

      const targetIndex = findQuestionIndex(newState, action.payload.id);

      newState.push({
        ...newState[targetIndex],
        id: nanoid(),
        title: `질문 ${newState.length}`,
        isFocused: true,
      });

      return newState;
    },

    changeRequired: (state, action) => {
      const targetState = findQuestion(state, action.payload.id);

      targetState.isRequired = !targetState.isRequired;
    },

    moveQuestion: (state, action) => {
      const newState = [...state];

      const { start, end } = action.payload;

      const targetState = newState.splice(Number(start), 1);

      newState.splice(Number(end), 0, ...targetState);

      return newState;
    },

    moveOption: (state, action) => {
      const targetState = findQuestion(state, action.payload.id);
      const contents = targetState.contents as contentProps[];

      const { start, end } = action.payload;

      const moveContents = contents.splice(Number(start), 1);

      contents.splice(Number(end), 0, ...moveContents);
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
  addOption,
  deleteOption,
  changeOption,
  addEtc,
  deleteEtc,
  copyQuestion,
  changeRequired,
  moveQuestion,
  moveOption,
} = surveySlice.actions;
