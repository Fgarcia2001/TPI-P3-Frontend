import "./App.css";
import AuthPage from "./Views/Auth/AuthPage";
import Menu from "./Views/Menu/Menu";
import { BrowserRouter, Route, Routes } from "react-router";
import NotFound from "./Views/NotFound/NotFoun";
import Admin from "./Views/Admin/Admin";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Menu />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
