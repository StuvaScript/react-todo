import { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import styles from "./AddTodoForm.module.css";
import AddIcon from "../assets/icons/add-icon.svg?react";
import PropTypes from "prop-types";

export default function AddTodoForm({ onAddTodo, currentList }) {
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => setTodoTitle(event.target.value);

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (todoTitle === "") {
      return;
    }
    onAddTodo({
      title: todoTitle.trim(),
      createdTime: new Date().toString(),
      todoListName: currentList,
      id: Date.now().toString(), // This ID is temporary. We are optimistically rendering our todos before we get the response back from our API call. We use this as our key in our list in the TodoList.jsx file. After our API response comes back as OK, we update the ID with the one provided by Airtable in the TodoContainer.jsx file.
    });

    setTodoTitle("");
  };

  return (
    <form onSubmit={handleAddTodo} className={styles.form}>
      <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
        id="todoTitle"
        name="title"
      >
        Title:
      </InputWithLabel>
      <button type="submit">
        <AddIcon height="20px" width="20px" />
      </button>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
  currentList: PropTypes.string,
};
