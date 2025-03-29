import React, { useState } from 'react';

function AddTodo({ onAdd }) {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleAdd = () => {
    if (!task.trim()) return;
    onAdd(task, description, priority);
    setTask('');
    setDescription('');
  };

  return (
    <div className="add-todo">
      <input
        type="text"
        placeholder="Task name"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddTodo;
