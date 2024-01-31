import React, { useState, useEffect } from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";
import assign_to from "../assignment";

export default function Kanban({ tasks }) {

  const [assignees, setAssignees] = useState([]);
  const [clicked, setClicked] = useState(false);
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
    { text: "Assignee", key: "Assignee", type: "DropDown", dataSource: assignees ? assignees.map(a => ({ text: a, value: a })) : [] },
    { text: "Dependencies", key: "Dependencies", type: "TextBox" },
    { text: "Due Date", key: "DueDate", type: "TextBox" },
  ]);

  useEffect(() => {
    async function fetchData() {
      const data = await assign_to(); // get assignees array
      return setAssignees(data);

    }
    if (clicked) {
      fetchData();
      setFields([
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
        { text: "Assignee", key: "Assignee", type: "DropDown", dataSource: assignees ? assignees.map(a => ({ text: a, value: a })) : [] },
        { text: "Dependencies", key: "Dependencies", type: "TextBox" },
        { text: "Due Date", key: "DueDate", type: "TextBox" },
      ]);
      console.log("assignees", assignees)
    }
  }, [clicked]);
  // console.log("tasks,", tasks);
  const convertFirebaseDataToKanbanData = (tasks) => {
    return tasks.map((task) => {
      // Truncate the summary to 20 words
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
        Dependencies: task.task_dependencies?.join(", ") || [],
        DueDate: task.task_due_date,
      };
    });
  };

  const kanbanData = convertFirebaseDataToKanbanData(tasks);

  const kanbanGrid = [
    { headerText: "To Do", keyField: "To Do", allowToggle: true },
    { headerText: "In Progress", keyField: "In Progress", allowToggle: true },

    { headerText: "Done", keyField: "Done", allowToggle: true },
  ];

  // const fields = [
  //   {
  //     text: "ID",
  //     key: "Id",
  //     type: "TextBox",
  //     isPrimaryKey: true,
  //     edit: false,
  //   },
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
  //   // Add other fields as needed
  //   { text: "Priority", key: "Priority", type: "TextBox" },
  //   { text: "Assignee", key: "Assignee", type: "DropDown", dataSource: assignees ? assignees.map(a => ({ text: a, value: a })) : []},
  //   { text: "Dependencies", key: "Dependencies", type: "TextBox" },
  //   { text: "Due Date", key: "DueDate", type: "TextBox" },
  // ];

  return (
    <div >
      <KanbanComponent
        id="kanban"
        keyField="Status"
        dataSource={kanbanData}
        cardSettings={{
          contentField: "Summary",
          headerField: "Title",
          tagsField: "Priority",
        }}
        dialogSettings={{ fields: fields }}
        cardDoubleClick={(e) => {
          localStorage.setItem("selectedCard", JSON.stringify(e.data));
          setClicked(!clicked);
          // setTimeout(() => assign_to(), 2000);
        }}
      >
        <ColumnsDirective>
          {kanbanGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />

          ))}
        </ColumnsDirective>

      </KanbanComponent>
    </div>
  );
}
