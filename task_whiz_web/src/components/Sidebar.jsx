import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { IoMdContacts } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase.config.jsx";
import { useStateContext } from "../contexts/ContextProvider";
import { AiOutlineCalendar } from "react-icons/ai";

const Sidebar = () => {
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);

  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsCollection = collection(db, "teams");
        const teamsSnapshot = await getDocs(teamsCollection);
        const teamsData = teamsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeams(teamsData);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(db, "projects");
        const projectsSnapshot = await getDocs(projectsCollection);
        const projectsData = projectsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
    fetchTeams();
  }, []);
  const generateLinks = () => {
    const projectLinks = projects.map((project) => ({
      name: project.name,
      icon: <MdDashboard />,
      url: `project/${project.id}`,
    }));

    const teamLinks = teams.map((team) => ({
      name: team.name,
      icon: <IoMdContacts />,
      url: `team/${team.id}`,
    }));

    return [
      {
        title: "Dashboard",
        links: projectLinks,
      },
      {
        title: "Your Team",
        links: teamLinks,
      },
    ];
  };

  let links = generateLinks();

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>Aivy</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => {
                  let dynamicLink;
                  if (link.url.startsWith("project")) {
                    const project = projects.find(
                      (p) => p.id === link.url.split("/")[1]
                    );
                    dynamicLink = project ? project.name : "";
                  } else if (link.url.startsWith("team")) {
                    const team = teams.find(
                      (t) => t.id === link.url.split("/")[1]
                    );
                    dynamicLink = team ? team.name : "";
                  }
                  return (
                    <NavLink
                      to={`/${link.url}`}
                      key={link.name}
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : "",
                      })}
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      {link.icon}
                      <span className="capitalize ">{dynamicLink}</span>
                    </NavLink>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="mt-10">
            <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
              Manage
            </p>
            <NavLink
              to="/calendar"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <AiOutlineCalendar />
              <span className="capitalize ">Calendar</span>
            </NavLink>
            <NavLink
              to=""
              onClick={() => {
                window.location.href = "http://localhost:3001/";
              }}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={normalLink}
            >
              <AiOutlineCalendar />
              <span className="capitalize ">Meet</span>
            </NavLink>
            <NavLink
              to="/projectlist"
            
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={normalLink}
            >
              <AiOutlineCalendar />
              <span className="capitalize ">Unassigned Tasks</span>
            </NavLink>
            <NavLink
              to="/leaderboard"
            
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={normalLink}
            >
              <AiOutlineCalendar />
              <span className="capitalize ">Leaderboard</span>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
