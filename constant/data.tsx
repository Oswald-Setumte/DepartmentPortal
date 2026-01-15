import { Home } from "lucide-react";

export type SideBar = [
  {
    link: string;
    to: string;
  }
];

export const sideBar = [
  {
    link: "Home",
    to: "/",
    icons: <Home />,
  },
  {
    link: "SignUp",
    to: "/signup",
    icons: "",
  },
  {
    link: "SignIn",
    to: "/signin",
    icons: "",
  },
  {
    link: "Proposal Submittion",
    to: "/student/submittion",
    icons: "",
  },
];
