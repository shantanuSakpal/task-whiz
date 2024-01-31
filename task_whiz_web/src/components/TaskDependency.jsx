import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
// import tasks from '../components/Charts/tasks.json';

export default function TaskDependency({ tasks }) {
  // console.log("tasks,", tasks);

  // const tasks = [
  //   {
  //     id: "T12345",
  //     task_dependencies: null,
  //     task_id: "T12345",
  //     task_status: "In Progress",
  //     task_due_date: "Two months from now",
  //     task_assign_to: ["Sara", "Alex"],
  //     task_description:
  //       "Create an intuitive interface for effortless task creation, assignment, and tracking.",
  //     task_priority: "High",
  //     task_name: "Develop a user-friendly task manager app",
  //   },
  //   {
  //     id: "T67890",
  //     task_due_date: "After the initial beta release",
  //     task_id: "T67890",
  //     task_dependencies: ["T12345"],
  //     task_description:
  //       "Ensure seamless integration with popular project management tools to enhance usability.",
  //     task_priority: "Medium",
  //     task_name: "Integrate the task manager app with existing tools",
  //     task_assign_to: ["Alex", "Sarah"],
  //     task_status: "To Do",
  //   },
  // ];

  // Convert tasks data to nodes with adjusted positions
  const nodes = tasks.map((task, index) => ({
    id: task.task_id,
    position: { x: index * 250, y: index * 100 }, // Adjusted positions for better spacing
    data: { label: task.task_name },
  }));

  // Convert task dependencies to edges
  const edges = tasks
    .filter(
      (task) => task.task_dependencies && task.task_dependencies.length > 0
    )
    .map((task) =>
      task.task_dependencies.map((dependency) => ({
        id: `e-${task.task_id}-${dependency}`,
        source: task.task_id,
        target: dependency,
      }))
    )
    .flat();

  const [currentNodes, setCurrentNodes, onNodesChange] = useNodesState(nodes);
  const [currentEdges, setCurrentEdges, onEdgesChange] = useEdgesState(edges);

  const onConnect = useCallback(
    (params) => setCurrentEdges((eds) => addEdge(params, eds)),
    [setCurrentEdges]
  );

  return (
    <div style={{ width: "100%", height: "50vh" }} className="p-5 m-5">
      <ReactFlow
        nodes={currentNodes}
        edges={currentEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
