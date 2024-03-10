import React from "react";
import { Link } from "react-router-dom";

export default function OgHome() {
	return (
		<div className="text-white w-[50rem] mt-20 text-center mx-auto">
			<div className="px-4 py-3 rounded-lg mx-auto font-light text-sm w-fit bg-primary">
				AutoLearn.ai: Tailored Learning for Every Ability
			</div>
			<h1 className="mt-5 text-5xl">Empowerment in Learning: Unlocking Potential !!</h1>
			<p className="mt-5">
				AutoLearn.ai is a pioneering educational platform designed specifically for learners with
				disabilities. Our mission is to create a supportive and inclusive virtual environment that
				caters to the unique needs of each student.
			</p>
			<div className="flex mt-6 w-fit mx-auto items-center gap-2">
				<Link
					to={"/dashboard"}
					className="text-sm font-light flex border-white/80 items-center gap-1 border rounded-lg px-4 py-3"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className="w-5 h-5"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
					</svg>
					<span>Go to DashBoard</span>
				</Link>
				<Link to={"/meet"} className="rounded-lg px-4 py-3 bg-accent-purple text-white">
					New Session
				</Link>
			</div>
		</div>
	);
}
