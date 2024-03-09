import React, { useEffect, useState } from "react";
import HomeCard from "../components/HomeCard";

import { v4 as uuid } from "uuid";
import { MdVideoCall as NewCallIcon } from "react-icons/md";
import { MdAddBox as JoinCallIcon } from "react-icons/md";
import { BsCalendarDate as CalenderIcon } from "react-icons/bs";
import { MdScreenShare as ScreenShareIcon } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
const roomId = uuid();

const Home = () => {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const [date, setDate] = useState(new Date());
	const suggestedTasks = [
		{
			task_id: "T12345",
			task_name: "Improve Website Navigation",
			task_description:
				"The website's navigation is not intuitive and it takes a while to find what is needed.",
		},
		{
			task_id: "T23456",
			task_name: "Increase Mobile Usability",
			task_description:
				"On mobile, some of the buttons are too small to tap and text is hard to read.",
		},
		{
			task_id: "T34567",
			task_name: "Fix Login Issue",
			task_description:
				"There is trouble logging in even when entering the right password, as it says invalid credentials.",
		},
		{
			task_id: "T45678",
			task_name: "Repair Product Comparison Tool",
			task_description:
				"The product comparison tool fails to load when more than 3 items are selected, making it useless.",
		},
	];

	function refreshClock() {
		setDate(new Date());
	}
	useEffect(() => {
		const timerId = setInterval(refreshClock, 1000);
		return function cleanup() {
			clearInterval(timerId);
		};
	}, []);

	return (
		<div className="bg-primary min-h-screen text-white">
			<div className="flex h-full md:gap-2 flex-col md:flex-row">
				<div className="p-3 w-auto h-auto items-center">
					<div className="flex gap-2 md:gap-6 mb-3 md:mb-6">
						<Link to={`/room/${roomId}`} className="block w-full">
							<HomeCard
								title="New Meeting"
								desc="Create a new meeting"
								icon={<NewCallIcon />}
								iconBgColor="lightYellows"
								bgColor="bg-yellow"
								route={`/room/`}
							/>
						</Link>
						<HomeCard
							title="Join Meeting"
							desc="via invitation link"
							icon={<JoinCallIcon />}
							bgColor="bg-blue"
						/>
					</div>

					{/* <div>
            <div className="p-3 md:p-4 md:rounded-xl rounded md:text-base text-sm md:mt-6 mt-2 text-white md:font-semibold text-center w-full bg-blue">
              Made with love by
              <a
                href="https://github.com/theviralboy"
                target={"_blank"}
                rel="noreferrer"
              >
                {" "}
                Sahil Verma
              </a>
            </div>
          </div> */}
				</div>
				<div className="flex-grow md:h-screen  p-3 md:p-4">
					<div className="relative md:h-52 w-full bg-slate-500 rounded md:rounded-2xl p-3">
						<div className="md:absolute bottom-2 left-2 md:bottom-6 md:left-6">
							<p className="md:text-7xl text-4xl text-white">
								{`${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${
									date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
								}`}
							</p>
							<p className="text-slate-300 font-thin my-1">
								{`${days[date.getDay()]},${date.getDate()} ${
									months[date.getMonth()]
								} ${date.getFullYear()}`}
							</p>
						</div>
					</div>
					<div className="pt-5"></div>
				</div>
				{/* suggested task  */}
			</div>
			<h2 className="text-xl font-semibold p-1">Suggested Tasks </h2>
			{suggestedTasks.map((task) => {
				return (
					<div>
						<div className="left-card flex">
							<div>
								<div className="left-card-title"> {task.task_name}</div>
								<div> {task.task_description}</div>
							</div>

							<button className="assign-button">
								<div>Assign To</div>
								<IoIosArrowRoundForward style={{ fontSize: "40px" }} />
							</button>
						</div>
						{/* //right card */}
					</div>
				);
			})}
		</div>
	);
};

export default Home;
