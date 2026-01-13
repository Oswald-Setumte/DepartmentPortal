import App from "../src/App";
import SignUp from "../src/auth/signUp";
import SignIn from "../src/auth/logIn";
import LectureSignUp from "../src/auth/LecturerSignUP";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signup/lecturer",
    element: <LectureSignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
]);
