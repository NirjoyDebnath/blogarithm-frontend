import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "../pages/LogIn/logIn";
import HomeLayout from "../layouts/homeLayout";
import SignUp from "../pages/SignUp/signUp";
import Home from "../pages/Home/home";
import Story from "../pages/Story/story";
import Profile from "../pages/Profile/profile";
import ProfileStories from "../pages/Profile/profileStories";
import CreateUpdateDeleteContextProvider from ".././contexts/createupdatedeleteContext";
import StoryContextProvider from ".././contexts/storyContext";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/logIn" element={<LogIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route
        path="/"
        element={
          <StoryContextProvider>
            <CreateUpdateDeleteContextProvider>
              <HomeLayout />
            </CreateUpdateDeleteContextProvider>
          </StoryContextProvider>
        }
      >
        <Route index element={<Home />} />
        <Route path="story/:id" element={<Story />} />
        <Route path="user/:id/profile" element={<Profile />} />
        <Route path="user/:id/stories" element={<ProfileStories />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
