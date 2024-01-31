import React, { useEffect, useState } from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase.config.jsx"; // Update this path with the correct path to your firebase config

import { Header } from "../components";

// eslint-disable-next-line react/destructuring-assignment
const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

const Scheduler = () => {
  const [scheduleObj, setScheduleObj] = useState();
  const [scheduleData, setScheduleData] = useState();
  /* scheduleData = [{
    Id: 1,
    Subject: "Explosion of Betelgeuse Star",
    Location: "Space Center USA",
    StartTime: "2021-01-10T04:00:00.000Z",
    EndTime: "2021-01-10T05:30:00.000Z",
    CategoryColor: "#1aaa55",
  },...] */
  const transformTasksToScheduleData = (tasks) => {
    return tasks.map((task) => ({
      Id: task.id,
      Subject: task.task_name,
      Location: task.task_status,
      StartTime: new Date(task.task_due_date),
      EndTime: new Date(task.task_due_date),
      CategoryColor: "#1aaa55", // You can set the color based on task properties
    }));
  };

  const change = (args) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };

  const onDragStart = (arg) => {
    // eslint-disable-next-line no-param-reassign
    arg.navigation.enable = true;
  };
  const fetchTasks = async () => {
    try {
      const tasksCollection = collection(db, "Tasks");
      const tasksSnapshot = await getDocs(tasksCollection);
      const tasksData = tasksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const transformedData = transformTasksToScheduleData(tasksData);
      console.log("transformedData", transformedData);
      setScheduleData(transformedData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Calendar" />
      <ScheduleComponent
        height="650px"
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={new Date(2024, 0, 10)}
        eventSettings={{ dataSource: scheduleData }}
        dragStart={onDragStart}
      >
        <ViewsDirective>
          {["Day", "Week", "WorkWeek", "Month", "Agenda"].map((item) => (
            <ViewDirective key={item} option={item} />
          ))}
        </ViewsDirective>
        <Inject
          services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
        />
      </ScheduleComponent>
      <PropertyPane>
        <table style={{ width: "100%", background: "white" }}>
          <tbody>
            <tr style={{ height: "50px" }}>
              <td style={{ width: "100%" }}>
                <DatePickerComponent
                  value={new Date(2021, 0, 10)}
                  showClearButton={false}
                  placeholder="Current Date"
                  floatLabelType="Always"
                  change={change}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </PropertyPane>
    </div>
  );
};

export default Scheduler;
