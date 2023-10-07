import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit from "./page/edit/Edit";
import ViewForm from "./page/viewForm/ViewForm";
import FormResponse from "./page/formresoponse/FormResponse";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Edit />} />
          <Route path="/viewform" element={<ViewForm />} />
          <Route path="/formResponse" element={<FormResponse />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
