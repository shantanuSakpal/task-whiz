import React, { useState } from "react";

const TaskModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "block" : "hidden"}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="taskName">Task Name:</label>
          <input
            type="text"
            id="taskName"
            name="task_name"
            value={formData.task_name}
            onChange={handleChange}
            required
          />

          <label htmlFor="taskId">Task ID:</label>
          <input
            type="text"
            id="taskId"
            name="task_id"
            value={formData.task_id}
            onChange={handleChange}
            required
          />

          <label htmlFor="taskStatus">Task Status:</label>
          <input
            type="text"
            id="taskStatus"
            name="task_status"
            value={formData.task_status}
            onChange={handleChange}
            required
          />

          <label htmlFor="taskDescription">Task Description:</label>
          <textarea
            id="taskDescription"
            name="task_description"
            value={formData.task_description}
            onChange={handleChange}
            required
          />

          <label htmlFor="taskPriority">Task Priority:</label>
          <input
            type="text"
            id="taskPriority"
            name="task_priority"
            value={formData.task_priority}
            onChange={handleChange}
            required
          />

          <label htmlFor="taskAssignTo">Task Assign To:</label>
          <input
            type="text"
            id="taskAssignTo"
            name="task_assign_to"
            value={formData.task_assign_to}
            onChange={handleChange}
            required
          />

          <label htmlFor="taskDueDate">Task Due Date:</label>
          <input
            type="datetime-local"
            id="taskDueDate"
            name="task_due_date"
            value={formData.task_due_date}
            onChange={handleChange}
            required
          />

          <label htmlFor="taskDependencies">Task Dependencies:</label>
          <input
            type="text"
            id="taskDependencies"
            name="task_dependencies"
            value={formData.task_dependencies}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
