"use server";

import { revalidateTag } from "next/cache";

export const AddTodo = async (e: FormData) => {
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
