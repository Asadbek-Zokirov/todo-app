import React from 'react';
import { GripVertical } from 'lucide-react'; // можно любую иконку

function TodoItem({ todo, onToggle, onDelete, dragHandleProps }) {
  return (
    <div className={`todo-item ${todo.priority}`}>
      <div className="left">
      <span className="drag-handle" {...dragHandleProps}>
  <GripVertical size={18} />
</span>

        <input type="checkbox" checked={todo.completed} onChange={onToggle} />
        <div className="text">
          <span className={todo.completed ? 'completed' : ''}>
            {todo.task}
          </span>
          {todo.description && (
            <div className="description">{todo.description}</div>
          )}
        </div>
      </div>
      <div className="right">
        <span className={`priority-tag ${todo.priority}`}>
          {todo.priority}
        </span>
        <button type="button" onClick={onDelete}>✕</button>
      </div>
    </div>
  );
}

export default TodoItem;
