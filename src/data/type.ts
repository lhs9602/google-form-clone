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
        etc?: boolean;
      }[];
  isFocused: boolean;
  isRequired?: boolean;
}

export interface stateProps {
  survey: surveyProps[];
  _persist: PersistState;
}
