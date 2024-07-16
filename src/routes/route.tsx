import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "../pages/LogIn/logIn";
import HomeLayout from "../layouts/homeLayout";
import SignUp from "../pages/SignUp/signUp";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LogIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/" element={<HomeLayout />}></Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
