import React from "react";

import { Routes, Route } from "react-router-dom";

// components
import Header from "./Header";
import Sidebar from "./Sidebar";

// pages
import Home from "../page/Home";
import Room from "../page/Room";
import NotFound from "../page/NotFound";
import NewRoom from "../page/NewRoom";
import DashBoard from "../page/DashBoard";
import OgHome from "../page/OgHome";
import UserAnalytics from "../page/UserAnalytics";
import Translator from "../page/Translator";

const App = () => {
	return (
		<div className="flex">
			<Sidebar />
			<div className="max-h-screen overflow-auto w-full">
				<Header />
				<Routes>
					<Route path="/" element={<OgHome />} />
					<Route path="/meet" element={<Home />} />
					<Route path="/dashboard" element={<DashBoard />} />
					<Route path="/dashboard/:userID" element={<UserAnalytics />} />
					{/* <Route path="/room/:roomID" element={<NewRoom />} /> */}
					<Route path="/room/:roomID" element={<Room />} />
					<Route path="/translator" element={<Translator />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</div>
	);
};

export default App;
