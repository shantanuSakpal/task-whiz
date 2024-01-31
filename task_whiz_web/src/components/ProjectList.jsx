import React, { useState } from 'react';

const ProjectList = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [bidDueDate, setBidDueDate] = useState('');

  const taskList = [
    {
        "id": "T12345",
        "task_status": "In Progress",
        "task_description": "Create an intuitive interface for effortless task creation, assignment, and tracking.",
        "task_dependencies": null,
        "task_priority": "High",
        "task_due_date": "Two months from now",
        "task_assign_to": [
            "Sara",
            "Alex"
        ],
        "task_id": "T12345",
        "task_name": "Develop a user-friendly task manager app"
    },
    {
        "id": "T13579",
        "task_priority": "Medium",
        "task_due_date": "one Week from now ",
        "task_name": "Make Springboot Authentication API controllers",
        "task_status": "To Do",
        "task-assign_to": [
            "Uday",
            "Abhishek"
        ],
        "task_description": "Develop API controllers for user registration, login, token verification, password reset, and token refresh.  Requirements: - Validate and securely store user data. - Implement token-based authentication. - Ensure security measures against common vulnerabilities. - Provide clear documentation. - Write unit and integration tests.",
        "task_dependencies": [
            "T12345"
        ],
        "task_id": "T13579"
    },
    {
        "id": "T67890",
        "task_assign_to": [
            "Alex",
            "Sarah"
        ],
        "task_description": "Ensure seamless integration with popular project management tools to enhance usability.",
        "task_status": "To Do",
        "task_name": "Integrate the task manager app with existing tools",
        "task_dependencies": [
            "T12345"
        ],
        "task_due_date": "After the initial beta release",
        "task_priority": "Medium",
        "task_id": "T67890"
    }
];

  const handleCardClick = (task) => {
    setSelectedTask(task);
  };

  const handleBidClick = () => {
    // Implement your bidding logic here
    // You can access the bidDueDate state for the entered due date
    alert(`Placing bid for task: ${selectedTask.task_name} with due date: ${bidDueDate}`);
    setSelectedTask(null); // Reset selectedTask after bidding
    setBidDueDate(''); // Reset bidDueDate after bidding
  };

  return (
    <div className="relative">
      <h1 className='p-3 text-center text-xl'><strong>Task under bidding</strong></h1>
      {taskList.map((task) => (
        <div key={task.task_id}>
          <div
            className='flex justify-between cursor-pointer'
            style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}
            onClick={() => handleCardClick(task)}
          >
            <div>
              <h2>{task.task_name}</h2>
              <h3 style={{ color: 'grey' }}>{task.task_due_date}</h3>
            </div>
            <button style = { { background: "#7352ff", color : "white"}}className='p-3 rounded-lg'>Place Bid</button>
          </div>
        </div>
      ))}

      {/* Dialogue box/modal */}
      {selectedTask && (
        <div className='fixed top-1/2 left-1/2 right-1/2 mx-5 transform -translate-x-1/2 -translate-y-1/2   m-5 p-4 bg-white rounded-lg shadow-lg'>
          <h2 className='text-xl font-semibold mb-2'>{selectedTask.task_name}</h2>
          <p>{selectedTask.task_description}</p>
          <p>Due Date: {selectedTask.task_due_date}</p>
          <input
            type="text"
            id="dueDate"
            name="dueDate"
            placeholder="Enter your due date"
            value={bidDueDate}
            onChange={(e) => setBidDueDate(e.target.value)}
            className="mt-3 p-3 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button onClick={handleBidClick} style = { { background: "#7352ff", color : "white"}} className='p-2 m-3 rounded-lg bg-purple-600 mt-3'>
            Place Bid
          </button>
          <button onClick={() => setSelectedTask(null)}style = { { background: "red", color : "white"}} className='p-2  m- 3rounded-lg bg-gray-400 mt-3 rounded-lg'>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
