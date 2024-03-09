import React from "react";
import { Link } from "react-router-dom";

export default function Table() {
	// const router = useRout
	return (
		<div className="px-4 py-5 border border-lightGray w-full max-w-[36.75rem] rounded-lg">
			<h1>Top Students</h1>
			<p className="mt-1 text-sm font-normal text-zinc-500">
				These are the students who had shown the most progress this week!!
			</p>
			<Row name="John Doe" progress="90%" />
			<Row name="John Doe" progress="90%" />
			<Row name="John Doe" progress="90%" />
			<Row name="John Doe" progress="90%" />
		</div>
	);
}

function Row({ name, progress }) {
	return (
		<Link
			className="flex hover:text-accent-purple transition items-center text-sm justify-between px-3 py-3 border-b w-full border-lightGray"
			to={`/dashboard/${name}`}
		>
			<p className="font-light">{name}</p>
			<p className="flex items-center gap-1">
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
						d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
					/>
				</svg>

				<span className="font-light">{progress}</span>
			</p>
		</Link>
	);
}
