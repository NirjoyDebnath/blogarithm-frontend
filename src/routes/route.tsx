import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "../pages/LogIn/logIn";
import HomeLayout from "../layouts/homeLayout";
import SignUp from "../pages/SignUp/signUp";
import Home from "../pages/Home/home";
import Story from "../pages/Story/story";
import Profile from "../pages/Profile/profile";
import ProfileLayout from "../layouts/profileLayout";
import ProfileStories from "../pages/Profile/profileStories";
import ProfileUpdate from "../pages/Profile/profileUpdate";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/logIn" element={<LogIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path=":id" element={<Story />} />
        <Route path="user/:id" element={<ProfileLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="stories" element={<ProfileStories />} />
          <Route path="update" element={<ProfileUpdate />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
