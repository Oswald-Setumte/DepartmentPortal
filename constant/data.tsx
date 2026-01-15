import {
  Crosshair,
  HandHelping,
  Home,
  LayoutDashboard,
  Send,
  User,
  Users,
} from "lucide-react";

export type SideBar = [
  {
    link: string;
    to: string;
  }
];

export const sideBar = [
  {
    link: "Dashboard",
    to: "/student/dashbord",
    icons: <LayoutDashboard />,
  },
  {
    link: "Team",
    to: "/student/createteam",
    icons: <Users />,
  },
  {
    link: "Get Team",
    to: "/student/createteam",
    icons: <Crosshair />,
  },
  {
    link: "Proposal Submittion",
    to: "/student/submittion",
    icons: <Send />,
  },
];
