import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase.config.jsx"; // Update this path with the correct path to your firebase config
import Kanban from "../Kanban.jsx";
import TaskDependency from "../../components/TaskDependency.jsx";
import { useParams } from "react-router-dom";
import assign_to from "../../assignment.js";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [projectData, setProjectData] = useState({});
  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    // assign_to();

    const url = window.location.href;
    const id = url.substring(url.lastIndexOf("/") + 1);

    setProjectId(id);

    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(db, "Tasks");
        const tasksSnapshot = await getDocs(tasksCollection);
        const tasksData = tasksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        //  task =
        // {
        //     "id": "T12345",
        //     "task_status": "In Progress",
        //     "task_description": "Create an intuitive interface for effortless task creation, assignment, and tracking.",
        //     "task_dependencies": null,
        //     "task_priority": "High",
        //     "task_due_date": "Two months from now",
        //     "task_assign_to": [
        //         "shantanu@gmail.com",
        //
        //     ],
        //     "task_id": "T12345",
        //     "task_name": "Develop a user-friendly task manager app"
        // },

        //get email from local storage
        const email = sessionStorage.getItem("userEmail");
        //filter tasks based on email
        let filteredTasks = tasksData;
        // if (email !== "admin@gmail.com") {
        //   filteredTasks = tasksData?.filter((task) =>
        //     task.task_assign_to.includes(email)
        //   );
        // }
        console.log(filteredTasks);
        setTasks(filteredTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
    const fetchProjectData = async () => {
      if (projectId) {
        try {
          const projectsCollection = collection(db, "Projects");
          const projectQuery = query(
            projectsCollection
            // where("projectId", "==", projectId)
          );
          const projectSnapshot = await getDocs(projectQuery);
          const projectData = projectSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // console.log(projectData);
          setProjectData(projectData[0]);
        } catch (error) {
          console.error("Error fetching project data:", error);
        }
      }
    };

    fetchProjectData();
  }, []);

  return (
    <div className="p-8">
      <Kanban tasks={tasks} />

      <div className="w-full  border border-red-500  p-10 bg-white my-10">
        <h1 className="text-2xl font-bold p-6 w-full text-center">
          Task Dependency
        </h1>
        {tasks.length > 0 && <TaskDependency tasks={tasks} />}
      </div>
    </div>
  );
};

export default Dashboard;
