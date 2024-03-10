"use client";

import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";

export default function RadarChart({ timeArr, dataArr, label }) {
	const chartRef = useRef(null);

	console.log(timeArr);
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
				type: "radar",
				// type: "polarArea",
				data: {
					labels: timeArr,
					datasets: [
						{
							label: label,
							data: dataArr,
							fill: true,
							pointRadius: 0,
							borderWidth: 1,
							backgroundColor: "rgb(94, 24, 150,0.4)",
							borderColor: "#5E1896",
							tension: 0.1,
						},
					],
				},
				options: {
					plugins: {
						filler: {
							propagate: false,
						},
						"samples-filler-analyser": {
							target: "chart-analyser",
						},
					},
					interaction: {
						intersect: false,
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
		<div className=" w-[32rem]">
			<canvas id="new" ref={chartRef} />
		</div>
	);
}

// export default function LineChart({ timeArr, dataArr }: Props) {
//   const chartRef = useRef(null);

//   console.log(dataArr);

//   useEffect(() => {
//     let chartInstance: Chart | null = null;

//     if (chartRef.current) {
//       chartInstance = new Chart(chartRef.current, {
//         type: "line",
//         data: {
//           labels: [
//             "January",
//             "February",
//             "March",
//             "April",
//             "May",
//             "June",
//             "July",
//           ],
//           datasets: [
//             {
//               label: "My First Dataset",
//               data: [],
//               fill: false,
//               borderColor: "rgb(75, 192, 192)",
//               tension: 0.1,
//             },
//           ],
//         },
//       });
//     }

//     return () => {
//       if (chartInstance) {
//         chartInstance.destroy();
//       }
//     };
//   }, []);

//   return (
//     <div className="mx-auto h-50 max-w-6xl">
//       <canvas id="new" ref={chartRef} />
//     </div>
//   );
// }
