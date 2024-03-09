"use client";

import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";

export default function LineChart({ timeArr, dataArr, label }) {
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
        type: "line",
        data: {
          labels: timeArr,
          datasets: [
            {
              label: label,
              data: dataArr,
              fill: false,
              pointRadius: 0,
              //   borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          animation: {
            duration: 0,
          },
          plugins: {
            legend: {
              display: true, // This will hide the labels
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
    <div className=" w-[28rem]">
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
