import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "../pages/LogIn/logIn";
import HomeLayout from "../layouts/homeLayout";
import SignUp from "../pages/SignUp/signUp";
import Home from "../pages/Home/home";
import Dummy from "../pages/Dummy/dummy";
import Story from "../pages/Story/story";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/logIn" element={<LogIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/" element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Story />} />
        <Route path="/dummy" element={<Dummy />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
