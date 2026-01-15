import App from "../src/App";
import SignUp from "../src/auth/SignUp";
import SignIn from "../src/auth/LogIn";
import LectureSignUp from "../src/auth/LecturerSignUP";
import { createBrowserRouter } from "react-router-dom";
import Submit from "../src/student/Submit";
import Layout from "../components/Layout";
import Team from "../src/student/Team";

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
  {
    path: "/student/submittion",
    element: (
      <Layout>
        <Submit />,
      </Layout>
    ),
  },
  {
    path: "/student/creatTeam",
    element: (
      <Layout>
        <Team />,
      </Layout>
    ),
  },
]);
