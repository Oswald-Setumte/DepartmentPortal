import { LayoutDashboard, Users } from "lucide-react";

export type SideBar = [
  {
    link: string;
    to: string;
  }
];

export const sideBar = [
  {
    link: "Overview",
    to: "/student/overview",
    icons: <LayoutDashboard />,
  },
  {
    link: "Team",
    to: "/student/createteam",
    icons: <Users />,
  },
];

export const progress = [
  {
    name: "Draft",
    w: "w-[25%]",
  },
  {
    name: "Submitted",
    w: "w-[50%]",
  },
  {
    name: "Reviewed",
    w: "w-[75%]",
  },
  {
    name: "Accepted",
    w: "w-[100%]",
  },
];
