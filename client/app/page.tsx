import { revalidateTag } from "next/cache";
import { todo } from "node:test";
import React from "react";
interface Todos {
  title: string;
  description: string;
}
const Home = async () => {
  const res = await fetch("http://localhost:8000/todos", {
    cache: "no-cache",
    next: {
      tags: ["todos"],
    },
  });

  const todos: Todos[] = await res.json();

  const addTodos = async (e: FormData) => {
    "use server";
    const title = e.get("title")?.toString();
    const description = e.get("description")?.toString();
    if (!title || !description) return;

    const data = {
      title,
      description,
    };
    await fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    revalidateTag("todos");
  };
  return (
    <div className="flex justify-center my-4 gap-4 px-4">
      <div className="flex-1">
        <div className="w-full max-w-sm ">
          <form className="w-full flex flex-col gap-3" action={addTodos}>
            <input
              type="text"
              name="title"
              placeholder="title"
              className="w-full max-w-sm rounded-md outline-none py-1 px-1 border"
            />
            <input
              type="text"
              name="description"
              placeholder="description"
              className="w-full max-w-sm rounded-md outline-none py-1 px-1 border"
            />
            <button className="bg-sky-500 max-w-xs py-2 px-2 rounded-md mx-auto">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="flex-1 flex flex-wrap gap-4">
        {todos.map((todo, index) => (
          <div className="flex flex-col border shadow w-44 py-2" key={index}>
            <h4>{todo.title}</h4>
            <p>{todo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
