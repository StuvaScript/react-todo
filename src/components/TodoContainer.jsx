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

  const fetchData = async () => {
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

      const todos = data.records.map((todoObject) => {
        const todo = {
          title: todoObject.fields.title,
          id: todoObject.id,
          createdTime: todoObject.createdTime,
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
    console.log(res.createdTime);
    if (!res) {
      removeTodo(newTodo.id);
      return;
    }
    const newTodoObject = {
      title: newTodo.title,
      id: res.id,
      createdTime: newTodo.createdTime,
    };

    setTodoList([...todoList, newTodoObject]);
  };

  const removeTodo = async (id) => {
    const oldList = todoList;

    const newLIst = todoList.filter((todoItem) => todoItem.id !== id);
    setTodoList(newLIst);

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
