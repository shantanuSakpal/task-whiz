import React, { useState, useEffect } from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";
import {
  updateDoc,
  doc,
  getDocs,
  collection,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import assign_to from "../assignment";
import { useNavigate } from "react-router-dom";

export default function Kanban({ tasks }) {
  const [kanbanData, setKanbanData] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const navigate = useNavigate();
  const [fields, setFields] = useState([
    {
      text: "ID",
      key: "Id",
      type: "TextBox",
      isPrimaryKey: true,
      edit: false,
    },
    {
      text: "Status",
      key: "Status",
      type: "DropDown",
      validationRules: { required: true },
    },
    {
      text: "Summary",
      key: "Summary",
      type: "TextArea",
      validationRules: { required: true },
    },
    // Add other fields as needed
    { text: "Priority", key: "Priority", type: "TextBox" },
    {
      text: "Assignee",
      key: "Assignee",
      type: "TextArea",
    },
    { text: "Dependencies", key: "Dependencies", type: "TextBox" },
    { text: "Due Date", key: "DueDate", type: "TextBox" },
  ]);

  // Modify the fetchBestEmp function to update the Assignee field options
  const fetchBestEmp = async () => {
    const data = await assign_to();
    console.log("BEST EMPLOYEE data", data);
    setAssignees(data);
  };

  // Inside your component...

  useEffect(() => {
    setKanbanData(convertFirebaseDataToKanbanData(tasks));
  }, [tasks, assignees]);

  // ... rest of your component remains the same

  const convertFirebaseDataToKanbanData = (tasks) => {
    return tasks.map((task) => {
      const truncatedSummary = task.task_description
        ? task.task_description.split(" ").slice(0, 20).join(" ")
        : "";

      return {
        Id: task.id,
        Title: task.task_name,
        Status: task.task_status,
        Summary: truncatedSummary,
        Priority: task.task_priority,
        Assignee: task.task_assign_to?.join(", "),
        Dependencies: task.task_dependencies?.join(", ") || "",
        DueDate: task.task_due_date,
      };
    });
  };

  const kanbanGrid = [
    { headerText: "To Do", keyField: "to_do", allowToggle: true },
    { headerText: "In Progress", keyField: "in_progress", allowToggle: true },
    { headerText: "Done", keyField: "done", allowToggle: true },
  ];

  // const fields = [
  //   { text: "ID", key: "Id", type: "TextBox", isPrimaryKey: true, edit: false },
  //   {
  //     text: "Status",
  //     key: "Status",
  //     type: "DropDown",
  //     validationRules: { required: true },
  //   },
  //   {
  //     text: "Summary",
  //     key: "Summary",
  //     type: "TextArea",
  //     validationRules: { required: true },
  //   },
  //   { text: "Priority", key: "Priority", type: "TextBox" },
  //   { text: "Assignee", key: "Assignee", type: "TextBox" },
  //   { text: "Dependencies", key: "Dependencies", type: "TextBox" },
  //   { text: "Due Date", key: "DueDate", type: "TextBox" },
  // ];

  const allotTasks = async () => {
    try {
      // Iterate over tasks and add them to "Tasks" collection
      for (const task of tasks) {
        // Add the task to the "Tasks" collection
        await addDoc(collection(db, "Tasks"), task);

        // Optionally, you can remove the task from the original collection if needed
        // For example, if "tasks" is a state variable, you can update the state
        // to remove the allotted tasks
        // setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
      }
      console.log("Tasks allotted successfully!");
      // Redirect to the dashboard
      navigate("/project/project-01");
    } catch (error) {
      console.error("Error allotting tasks:", error);
    }
  };

  return (
    <div>
      <KanbanComponent
        id="kanban"
        keyField="Status"
        dataSource={kanbanData}
        cardSettings={{
          contentField: "Summary",
          headerField: "Title",
          tagsField: "Priority",
        }}
        dialogSettings={{
          fields: fields,
        }}
        cardDoubleClick={(args) => {
          console.log(args.data);
          //SET ARGS.DATA TO local storage as selectedCard
          localStorage.setItem("selectedCard", JSON.stringify(args.data));
          fetchBestEmp();
        }}
      >
        <ColumnsDirective>
          {kanbanGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
      </KanbanComponent>
      {assignees && assignees.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
            right: 100,
            background: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
            borderTopRightRadius: "10px",
            zIndex: 999,
          }}
        >
          <p>Assignees:</p>
          <ul>
            {assignees.map((assignee) => (
              <li key={assignee}>{assignee}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="w-full flex justify-end">
        {window.location.pathname === "/newtask" && (
          <button
            className="p-2 text-black rounded-lg bg-purple-600 font-bold m-2 w-fit right-0"
            onClick={allotTasks}
          >
            Allot task
          </button>
        )}
      </div>
    </div>
  );
}
