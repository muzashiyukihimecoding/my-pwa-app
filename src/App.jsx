import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const total = todos.length;
  const done = todos.filter((t) => t.completed).length;

  return (
    <div className="app">
      <header>
        <h1>✅ TaskFlow</h1>
        <p>Kelola tugas offline kapan saja</p>
      </header>

      <div className="stats">
        <span>📋 Total: {total}</span>
        <span>✔️ Selesai: {done}</span>
        {total > 0 && (
          <button onClick={clearCompleted} className="clear-btn">
            Hapus Selesai
          </button>
        )}
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Tambah tugas..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>+</button>
      </div>

      <ul className="todo-list">
        {todos.length === 0 && <p className="empty">Belum ada tugas 😊</p>}
        {[...todos]
          .sort((a, b) => a.completed - b.completed)
          .map((todo) => (
            <li key={todo.id} className={todo.completed ? "done" : ""}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)}>✕</button>
            </li>
          ))}
      </ul>

      <footer>⚡ Dibangun dengan Vite + PWA by Rasyid Nabil Pujantara</footer>
    </div>
  );
}

export default App;
