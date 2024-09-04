import { useState } from "react";
import InputWithLabel from "./InputWithLabel";

export default function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => setTodoTitle(event.target.value);

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (todoTitle === "") {
      return;
    }
    onAddTodo({ title: todoTitle, id: Date.now() });
    // onAddTodo(todoTitle);

    setTodoTitle("");
  };

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel value={todoTitle} handleChange={handleTitleChange}>
        Title:
      </InputWithLabel>
      <button>Add</button>
    </form>
  );
}
