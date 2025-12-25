"use client";
type Todo = {
  title: string;
  created_at: string;
};
import { ChangeEvent, FormEvent, useState } from "react";

export default function Home() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const setInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo.trim()) return;
    const newTodo: Todo = {
      title: todo,
      created_at: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
    setTodo("");
  };
  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.created_at !== id));
  };
  return (
    <div className="flex items-center justify-center flex-col h-[50vh] gap-10">
      <h1 className="text-center text-2xl font-semibold">
        TODO Next + TypeScript
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={todo}
          onChange={setInputValue}
          placeholder="enter todo title"
          className="p-2 border rounded"
        />
        <button className="p-2 border bg-black text-white rounded cursor-pointer">
          Add Todo
        </button>
      </form>
      {/* todo show */}
      <ul>
        {todos &&
          todos.map((todo: Todo) => {
            return (
              <li key={todo.created_at}>
                {todo.title}{" "}
                <button
                  onClick={() => handleDelete(todo.created_at)}
                  className="border"
                >
                  Delete
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
