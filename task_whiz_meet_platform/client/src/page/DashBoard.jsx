import React from "react";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import RadarChart from "../components/RadarChart";
import Card from "../components/Cards";
import Table from "../components/Table";
import { Link } from "react-router-dom";

export default function DashBoard() {
	const lineTimeArr = ["09:45:40", "09:45:41", "09:45:41", "09:45:42", "09:45:42", "09:45:43"];
	const lineDataArr = [0, 1, 2, 3, 0];
	const barTimeArr = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
	const barDataArr = [98, 45, 78, 23, 56, 89, 45];

	return (
		<div className="px-3 text-white">
			<div className="flex items-center justify-between mt-4">
				<h1 className="text-2xl font-medium">DashBoard</h1>
				<div className="flex items-center gap-2">
					<button className="text-sm font-light flex border-white/80 items-center gap-1 border rounded-lg px-4 py-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
							/>
						</svg>
						<span> March 10, 2024</span>
					</button>
					<Link to={"/"} className="rounded-lg px-4 py-3 bg-accent-purple text-white">
						Go Back
					</Link>
				</div>
			</div>
			<div className="flex items-center w-full justify-between gap-3 mt-3">
				<Card title={"Total Students Mentored"} value={"+40"} subTitle={"+5.1% from last month"} />
				<Card title={"Total Sessions Conducted"} value={"36"} subTitle={"+12.2% from last month"} />
				<Card
					title={"Average Session Duration"}
					value={"48 mins"}
					subTitle={"-7.3% from last month"}
				/>
				<Card title={"Engagement Rate"} value={"64.91 %"} subTitle={"+11.1% from last month"} />
			</div>
			<div className="flex mt-4">
				{/* <LineChart timeArr={lineTimeArr} dataArr={lineDataArr} label={"Name"} /> */}
				<BarChart timeArr={barTimeArr} dataArr={barDataArr} label={"Hours Counseled"} />
				<Table />
			</div>
			{/* <RadarChart timeArr={lineTimeArr} dataArr={lineDataArr} label={"Name"} /> */}
		</div>
	);
}
