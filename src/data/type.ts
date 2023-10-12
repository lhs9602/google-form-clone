import { PersistState } from "redux-persist/lib/types";
import {
  DraggableProvidedDragHandleProps,
  DropResult,
} from "react-beautiful-dnd";

export interface surveyProps {
  id: string;
  type: string;
  title: string;
  contents: string | contentProps[];
  isFocused: boolean;
  isRequired?: boolean;
  isEtc?: boolean;
}
export interface contentProps {
  contentId: string;
  text: string;
}
export interface handleResponseProps {
  (type: string, newValue: string): void;
}

export interface stateProps {
  survey: surveyProps[];
  _persist: PersistState;
}

export interface TypeSelectorProps {
  value: string;
  id: string;
}
export interface QuestionValue {
  isRequired: boolean;
  value: string | string[];
}

export interface FormValues {
  [key: string]: QuestionValue;
}
export interface FormResponseProps {
  isRequired: boolean;
  value: string;
}
export interface EditBoxProps {
  id: string;
  type: string;
  isFocused: boolean;
  handle?: DraggableProvidedDragHandleProps;
}
export interface QuestionHeaderProps {
  id: string;
  title: string;
  type: string;
  isFocused: boolean;
}
export interface DragAndDropProps {
  questionData: surveyProps;
  isFocused: boolean;
  handleOnDragEnd: (result: DropResult) => void;
}
export interface OptionItemProps {
  questionId: string;
  option: contentProps;
  index: number;
  questionType: string;
  isFocused: boolean;
}
