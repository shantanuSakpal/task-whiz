// icons
import { MdHomeFilled as HomeIcon } from "react-icons/md";
import { IoChatboxEllipsesOutline as ChatIcon } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { SiGooglechat } from "react-icons/si";
import { SiGooglemeet } from "react-icons/si";
import { IoMdAnalytics } from "react-icons/io";

export const sideMenuData = [
  {
    text: "Dashboard",
    icon: <MdSpaceDashboard />,
    route: "/dashboard",
  },
  {
    text: "Teams",
    icon: <RiTeamFill />,
    route: "/teams",
  },
  {
    text: "Chat",
    icon: <SiGooglechat />,
    route: "/chat",
  },
  {
    text: "Meet",
    icon: <SiGooglemeet />,
    route: "/meet",
  },
  {
    text: "Analytics",
    icon: <IoMdAnalytics />,
    route: "/analytics",
  },
  // {
  //   text: "Chat",
  //   icon: <ChatIcon />,
  //   route: "/chat",
  // },
  // {
  //   text: "",
  //   icon: < />,
  // },
];
