import React, { useState, useRef, useEffect } from "react";
import Todo from "./Todo"; // Assuming you have a Todo component
import { v4 as uuidv4 } from "uuid";
import './App.css';

const LOCAL_STORAGE_KEY = "myKey";

function Todolist({ todos, toggleTodo }) {
  return (
    <div className="body">
      {todos.map(todo => (
        <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
      ))}
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, complete: !todo.complete } : todo
    );
    setTodos(newTodos);
  }

  function handleAddTodo() {
    const name = todoNameRef.current.value;
    if (name === "") return;

    setTodos((prevTodos) => [
      ...prevTodos,
      { id: uuidv4(), name: name, complete: false },
    ]);

    todoNameRef.current.value = "";
  }

  function handleClearComplete() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <div className="container">
      <Todolist todos={todos} toggleTodo={toggleTodo} />
      <input className="input" ref={todoNameRef} type="text" />
      <button className="add-button" onClick={handleAddTodo}>Add to do</button>
      <button className="clear-button" onClick={handleClearComplete}>Clear Complete</button>
      <div className="todos-left">{todos.filter((todo) => !todo.complete).length} left to do</div>
    </div>
  );
}

export default App;

