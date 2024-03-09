import React from "react";

export default function Card({ title, value, subTitle }) {
	return (
		<div className="border border-lightGray px-5 py-5 rounded-lg max-w-full w-full">
			{/* // <div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-5 py-5 rounded-lg max-w-full w-full"> */}
			<p className="font-light">{title}</p>
			<h1 className="font-medium text-2xl mt-1">{value}</h1>
			<p className="mt-1 text-sm font-normal text-zinc-500">{subTitle}</p>
		</div>
	);
}
