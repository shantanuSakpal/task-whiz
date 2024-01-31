import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase.config.jsx"; // Update this path with the correct path to your firebase config
import Kanban from "../Kanban.jsx";
import TaskDependency from "../../components/TaskDependency.jsx";
import { useParams } from "react-router-dom";
const NewTasksDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchNewTasks = async () => {
      try {
        const tasksCollection = collection(db, "newTasks");
        const tasksSnapshot = await getDocs(tasksCollection);
        const tasksData = tasksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        //get email from local storage
        //filter tasks based on email
        console.log(tasksData);
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchNewTasks();
  }, []);

  return (
    <div className="p-8">
      <div className="w-full flex justify-end"></div>
      <Kanban tasks={tasks} />
    </div>
  );
};

export default NewTasksDashboard;
