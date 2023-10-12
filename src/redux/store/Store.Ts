import { surveySlice } from "../reducer/Reducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

//로컬 스토리지 저장을 위해 redux-persist의 옵션 설정
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["survey"],
};
export const rootReducer = combineReducers({
  survey: surveySlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
