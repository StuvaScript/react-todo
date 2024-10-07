import { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import styles from "./AddTodoForm.module.css";
import AddIcon from "../assets/icons/add-icon.svg?react";
import PropTypes from "prop-types";

export default function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => setTodoTitle(event.target.value);

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (todoTitle === "") {
      return;
    }
    onAddTodo({
      title: todoTitle.trim(),
      id: Date.now().toString(),
      createdTime: new Date().toString(),
    });

    setTodoTitle("");
  };

  return (
    <form onSubmit={handleAddTodo} className={styles.form}>
      <InputWithLabel value={todoTitle} handleChange={handleTitleChange}>
        Title:
      </InputWithLabel>
      <button>
        <AddIcon height="20px" width="20px" />
      </button>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
};
