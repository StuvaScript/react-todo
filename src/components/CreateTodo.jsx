import { useEffect, useRef, useState } from "react";
import AddIcon from "../assets/icons/add-icon.svg?react";

// todo ``** Need PropTypes **``

export default function CreateTodo({ onAddTodoList, allTodoLists }) {
  const [todoListTitle, setTodoListTitle] = useState("");
  const [duplicateWarning, setDuplicateWarning] = useState(false);

  const handleTitleChange = (event) => setTodoListTitle(event.target.value);

  const handleAddTodoList = (event) => {
    event.preventDefault();
    if (todoListTitle === "") {
      return;
    }

    const checkForDuplicateName = allTodoLists.some((list) =>
      list.toLowerCase().includes(todoListTitle.toLowerCase())
    );

    if (checkForDuplicateName) {
      setDuplicateWarning(true);
      return;
    }

    onAddTodoList(todoListTitle.trim());

    setTodoListTitle("");
    setDuplicateWarning(false);
  };

  const inputRef = useRef();

  useEffect(() => inputRef.current.focus(), []);

  return (
    <>
      <h1>New Todo List</h1>

      <form onSubmit={handleAddTodoList}>
        <label htmlFor="todoListTitle">Create New Todo List:</label>
        <input
          id="todoListTitle"
          name="todoListTitle"
          value={todoListTitle}
          onChange={handleTitleChange}
          ref={inputRef}
        ></input>
        <button type="submit">
          <AddIcon height="20px" width="20px" />
        </button>
      </form>
      {duplicateWarning && <span>Name already taken</span>}
    </>
  );
}
