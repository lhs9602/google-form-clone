import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["survey"],
};

const persistedReducer = persistReducer(persistConfig);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
