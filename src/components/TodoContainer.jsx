import { useEffect, useState } from "react";
import styles from "./TodoContainer.module.css";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

export default function TodoContainer() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url = `https://api.airtable.com/v0/${
    import.meta.env.VITE_AIRTABLE_BASE_ID
  }/${import.meta.env.VITE_TABLE_NAME}`;

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

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      const res = await fetch(
        `${url}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`,
        options
      );

      if (!res.ok) {
        const message = `Error: ${res.status}`;
        throw new Error(message);
      }

      const data = await res.json();

      const sortedData = data.records.sort((a, b) =>
        a.fields.title.toLowerCase() > b.fields.title.toLowerCase() ? 1 : -1
      );

      const todos = sortedData.map((todoObject) => {
        const todo = {
          title: todoObject.fields.title,
          id: todoObject.id,
        };
        return todo;
      });

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    !isLoading &&
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [isLoading, todoList]);

  const addTodo = async (newTodo) => {
    setTodoList([...todoList, newTodo]);

    const res = await postTodo(newTodo.title);
    if (!res) {
      removeTodo(newTodo.id);
      return;
    }
    const newTodoObject = { title: res.fields.title, id: res.id };

    setTodoList([...todoList, newTodoObject]);
  };

  const removeTodo = (id) => {
    const newLIst = todoList.filter((todoItem) => todoItem.id !== id);

    setTodoList(newLIst);
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
