import React from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Cards";
import LineChart from "../components/LineChart";
import RadarChart from "../components/RadarChart";
import BarChart from "../components/BarChartSm";

export default function UserAnalytics() {
	const location = useLocation();
	const currentRoute = location.pathname;

	function generateRandomArray(numElements, min, max) {
		let randomNumbers = [];

		for (let i = 0; i < numElements; i++) {
			// Generate a random number between min (inclusive) and max (inclusive)
			let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
			randomNumbers.push(randomNumber);
		}

		return randomNumbers;
	}

	function generateRandomTimestamps(numElements, startTime, endTime) {
		const formatTime = (date) => date.toISOString().split("T")[1].substr(0, 8);

		let timestamps = [];

		// Convert time strings to Date objects assuming the same day
		let startDate = new Date(`1970-01-01T${startTime}Z`);
		let endDate = new Date(`1970-01-01T${endTime}Z`);

		// Calculate the difference in milliseconds
		let diff = endDate - startDate;

		for (let i = 0; i < numElements; i++) {
			// Create a new random date within the range
			let randomDate = new Date(startDate.getTime() + Math.random() * diff);
			// Format the time in HH:MM:SS format
			timestamps.push(formatTime(randomDate));
		}

		return timestamps;
	}

	let randomArray = generateRandomArray(6, 1, 7);
	let randomTimestamps = generateRandomTimestamps(6, "09:00:00", "17:00:00");
	console.log(randomArray);

	// const lineTimeArr = ["09:45:40", "09:45:41", "09:45:41", "09:45:42", "09:45:42", "09:45:43"];
	const lineTimeArr = generateRandomTimestamps(6, "09:00:00", "17:00:00");
	const barTimeArr = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
	const radarTimeArr = ["OS", "ML", "DSA", "Java", "BMS", "DBMS"];
	const lineDataArr = generateRandomArray(6, 1, 7);
	const barDataArr = generateRandomArray(7, 20, 100);
	const radarDataArr = generateRandomArray(6, 10, 100);
	// const lineDataArr = [1, 3, 5, 2, 3, 4];
	// const barDataArr = [98, 45, 78, 23, 56, 89, 45];
	// const radarDataArr = [60, 10, 70, 50, 80, 70];
	return (
		<div className="text-white">
			<div className="border-0 px-5 py-5  max-w-full">
				<h1 className="font-medium text-2xl my-2">User Analytics</h1>
				<Card
					title={"Name"}
					value={currentRoute.substring(currentRoute.lastIndexOf("/") + 1).replace("%20", " ")}
					subTitle={"+20.1% from last month"}
				/>
			</div>
			<div className="flex flex-wrap gap-5 mt-5 px-5">
				<div className="border border-lightGray px-5 py-5 rounded-lg max-w-full">
					<p className="font-light">{"Performance"}</p>
					<h1 className="font-medium text-2xl mt-1">{"Learning Trends"}</h1>
					<p className="mt-1 text-sm font-normal text-zinc-500">{"Semantic & Literal"}</p>
					<LineChart timeArr={lineTimeArr} dataArr={lineDataArr} label={"Total Revenue"} />
				</div>
				<div className="border border-lightGray px-5 py-5 rounded-lg max-w-full">
					<p className="font-light">Test Scores</p>
					<h1 className="font-medium text-2xl mt-1">Evalutions this week</h1>
					<p className="mt-1 text-sm font-normal text-zinc-500">March 4 - March 10</p>
					<BarChart timeArr={barTimeArr} dataArr={barDataArr} label={"Evaluations"} />
				</div>
				<div className="border border-lightGray px-5 py-5 rounded-lg max-w-full">
					<p className="font-light">{"Test Scores"}</p>
					<h1 className="font-medium text-2xl mt-1">{"Subjectwise Analysis"}</h1>
					<p className="mt-1 text-sm font-normal text-zinc-500">{"subTitle"}</p>
					<RadarChart timeArr={radarTimeArr} dataArr={radarDataArr} label={"Scores"} />
				</div>
			</div>
		</div>
	);
}
