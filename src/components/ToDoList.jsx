import React, { useState, useEffect } from 'react';
import AddTodo from './AddTodo';
import TodoItem from './ToDoItem';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [id, setId] = useState(1);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('todos');
      if (saved) {
        const parsed = JSON.parse(saved);
        const arr = Object.entries(parsed).map(([id, todo]) => ({
          id: parseInt(id),
          ...todo,
        }));
        setTodos(arr);
        const maxId = arr.length ? Math.max(...arr.map((t) => t.id)) + 1 : 1;
        setId(maxId);
      }
    } catch {
      setTodos([]);
      setId(1);
    }
  }, []);

  useEffect(() => {
    const obj = todos.reduce((acc, todo) => {
      acc[todo.id] = {
        task: todo.task,
        description: todo.description,
        priority: todo.priority,
        completed: todo.completed,
      };
      return acc;
    }, {});
    localStorage.setItem('todos', JSON.stringify(obj));
  }, [todos]);

  const sensors = useSensors(useSensor(PointerSensor));

  const addTask = (task, description, priority) => {
    const newTodo = {
      id,
      task: task.trim(),
      description: description.trim(),
      priority,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setId((prev) => prev + 1);
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTask = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      const oldIndex = todos.findIndex((t) => t.id === active.id);
      const newIndex = todos.findIndex((t) => t.id === over.id);
      setTodos((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  return (
    <div className="todo-container">
      <AddTodo onAdd={addTask} />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={todos.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {todos.map((todo) => (
            <SortableItem
              key={todo.id}
              todo={todo}
              onToggle={() => toggleComplete(todo.id)}
              onDelete={() => removeTask(todo.id)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableItem({ todo, onToggle, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : 'auto',
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <TodoItem
        todo={todo}
        onToggle={onToggle}
        onDelete={onDelete}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

export default TodoList;
