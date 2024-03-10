"use client";

import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";

export default function BarChart({ timeArr, dataArr, label }) {
	const chartRef = useRef(null);

	/* 
      timeArr = [
        "09:45:40",
        "09:45:41",a
        "09:45:41",
        "09:45:42",
        "09:45:42",
        "09:45:43",
        
    ]
      dataArr = [0,1,2,3,0]
      */

	useEffect(() => {
		let chartInstance = null;

		if (chartRef.current) {
			chartInstance = new Chart(chartRef.current, {
				type: "bar",
				data: {
					labels: timeArr,
					datasets: [
						{
							label: label,
							data: dataArr,
							fill: false,
							pointRadius: 0,
							backgroundColor: "#5E1896",

							hoverBackgroundColor: "#BA61FF",
							tension: 0.1,
						},
					],
				},
				options: {
					plugins: {
						title: {
							display: true,
							text: "",
						},
					},
					responsive: true,
					scales: {
						x: {
							stacked: true,
						},
						y: {
							stacked: true,
						},
					},
				},
			});
		}

		return () => {
			if (chartInstance) {
				chartInstance.destroy();
			}
		};
	}, [dataArr.length]);

	return (
		<div className=" w-[32rem] rounded-lg ">
			<canvas id="new" ref={chartRef} />
		</div>
	);
}
