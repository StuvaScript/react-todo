import { useState } from "react";
import AddIcon from "../assets/icons/add-icon.svg?react";
import { useNavigate } from "react-router-dom";
import InputWithLabel from "./InputWithLabel";
// import styles from "./AddTodoForm.module.css";
import styles from "./CreateTodo.module.css";

// todo ``** Need PropTypes **``

export default function CreateTodo({ onAddTodoList, allTodoLists }) {
  const [todoListTitle, setTodoListTitle] = useState("");
  const [duplicateWarning, setDuplicateWarning] = useState(false);

  const navigate = useNavigate();

  const handleTitleChange = (event) => setTodoListTitle(event.target.value);

  const handleAddTodoList = (event) => {
    event.preventDefault();
    if (todoListTitle === "") {
      return;
    }

    const checkForDuplicateName = allTodoLists.some(
      (list) => list.toLowerCase() === todoListTitle.toLowerCase()
    );

    if (checkForDuplicateName) {
      setDuplicateWarning(true);
    } else {
      onAddTodoList(todoListTitle.trim());

      setTodoListTitle("");
      setDuplicateWarning(false);
      navigate(`/${todoListTitle}`, { state: todoListTitle });
    }
  };

  return (
    <div className={styles.newTodoContainer}>
      <h1>New Todo List</h1>

      <form onSubmit={handleAddTodoList} className={styles.form}>
        <InputWithLabel
          todoTitle={todoListTitle}
          handleTitleChange={handleTitleChange}
          id="todoListTitle"
          name="title"
        >
          Create New Todo List:
        </InputWithLabel>

        <button type="submit">
          <AddIcon height="20px" width="20px" />
        </button>
      </form>
      {duplicateWarning && <span>Name already taken</span>}
    </div>
  );
}
