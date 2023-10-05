import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import GlobalStyle from "./style/GlobalStyle";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./redux/store/Store.js";
const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <GlobalStyle />
    <React.StrictMode>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </React.StrictMode>
  </Provider>
);
