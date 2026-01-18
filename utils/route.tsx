import App from "../src/App";
import SignUp from "../src/auth/SignUp";
import SignIn from "../src/auth/LogIn";
import LectureSignUp from "../src/auth/LecturerSignUP";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Team from "../src/student/Team";
import Dashboard from "../src/student/Dashboard/Dashboard";

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
    path: "/student/createteam",
    element: (
      <Layout>
        <Team />,
      </Layout>
    ),
  },
  {
    path: "/student/overview",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
]);
