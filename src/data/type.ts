import { PersistState } from "redux-persist/lib/types";

export interface surveyProps {
  id: string;
  type: string;
  title: string;
  contents:
    | string
    | {
        contentId?: string;
        text?: string;
      }[];
  isFocused: boolean;
  isRequired?: boolean;
  isEtc?: boolean;
}

export interface stateProps {
  survey: surveyProps[];
  _persist: PersistState;
}

export interface TypeSelectorProps {
  value: string;
  id: string;
}
