import { useCallback, useEffect, useState } from "react";
import styles from "./TodoContainer.module.css";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import PropTypes from "prop-types";

export default function TodoContainer({ tableName }) {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url = `https://api.airtable.com/v0/${
    import.meta.env.VITE_AIRTABLE_BASE_ID
  }/${tableName}`;

  const deleteTodo = async (id) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
      };

      const res = await fetch(`${url}/${id}`, options);

      if (!res.ok) {
        const message = `Error: ${res.status}`;
        throw new Error(message);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const postTodo = async (todo) => {
    try {
      const airtableData = {
        fields: {
          title: todo,
        },
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
        body: JSON.stringify(airtableData),
      };

      const res = await fetch(url, options);

      if (!res.ok) {
        const message = `Error: ${res.status}`;
        throw new Error(message);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const fetchData = useCallback(async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      const res = await fetch(url, options);

      if (!res.ok) {
        const message = `Error: ${res.status}`;
        throw new Error(message);
      }

      const data = await res.json();

      const todos = data.records.map((record) => {
        const todo = {
          title: record.fields.title,
          id: record.id,
          createdTime: record.createdTime,
        };
        return todo;
      });

      return todos;
    } catch (error) {
      console.log(error.message);
    }
  }, [url]);

  useEffect(() => {
    fetchData()
      .then((value) => setTodoList(value))
      .then(() => setIsLoading(false));
  }, [fetchData, tableName]);

  useEffect(() => {
    !isLoading &&
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [isLoading, todoList]);

  const addTodo = async (newTodo) => {
    // ``** optimistic rendering **``
    setTodoList([...todoList, newTodo]);

    // If the response fails, remove the newly added todo
    const res = await postTodo(newTodo.title);
    if (!res) {
      removeTodo(newTodo.id);
      return;
    }

    const newTodoObject = {
      ...newTodo,
      id: res.id, // This is the updated ID. Our initial temporary ID was created in the AddTodoForm.jsx file
    };

    setTodoList([...todoList, newTodoObject]);
  };

  const removeTodo = async (id) => {
    const oldList = todoList;

    // ``** optimistic rendering **``
    const newLIst = todoList.filter((todoItem) => todoItem.id !== id);
    setTodoList(newLIst);

    // If the response fails, change the todo list back to the previous list
    const deleteRes = await deleteTodo(id);
    if (deleteRes === null) {
      setTodoList(oldList);
    }
  };

  return (
    <>
      <div className={styles.titleAndForm}>
        <h1>Todo List</h1>
        <AddTodoForm onAddTodo={addTodo} />
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </>
  );
}

TodoContainer.propTypes = {
  tableName: PropTypes.string,
};
