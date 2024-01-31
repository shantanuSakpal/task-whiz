import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import Dashboard from "./pages/[projectname]/Dashboard";
import { Navbar, Sidebar, ThemeSettings } from "./components";
import Calendar from "./pages/Calendar";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";
import Team from "./pages/[teamname]/Teams";
import LoginPage from "./pages/LoginPage";
import Leaderboard from "./components/LeaderBoard";
import ProjectList from "./components/ProjectList";
import EmployeeLearning from "./pages/Employeelearning";
import NewTasksDashboard from "./pages/[newtask]/NewTasksDashboard";

// ... (import statements)

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const isLoginPage = window.location.pathname === "/";

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu && !isLoginPage ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          {!isLoginPage ? (
            <div
              className={
                activeMenu
                  ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                  : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
              }
            >
              {!isLoginPage && (
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                  <Navbar />
                </div>
              )}
              <div>
                {themeSettings && <ThemeSettings />}

                <Routes>
                  {/* pages  */}
                  <Route path="/team/:teamname" element={<Team />} />
                  {/* apps  */}
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/project/:projectname" element={<Dashboard />} />
                  <Route path="/newtask" element={<NewTasksDashboard />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/projectlist" element={<ProjectList />} />
                  <Route path="/learning/:taskid" element={<EmployeeLearning />} />
                </Routes>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-full">
                {themeSettings && <ThemeSettings />}

                <Routes>
                  <Route path="/" element={<LoginPage />} />
                </Routes>
              </div>
            </div>
          )}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
