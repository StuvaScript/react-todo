import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoContainer from "./components/TodoContainer";
import Navigation from "./components/Navigation";
import CreateTodo from "./components/CreateTodo";
import { useState, useEffect } from "react";

const url = `https://api.airtable.com/v0/${
  import.meta.env.VITE_AIRTABLE_BASE_ID
}/${import.meta.env.VITE_TABLE_NAME}`;

const createTodoField = async (todoListName) => {
  try {
    const airtableData = {
      fields: {
        todoListName: todoListName,
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

const fetchTodoLists = async () => {
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

    const todoLists = data.records.map((record) => record.fields.todoListName);

    const removeDuplicateTodoLists = todoLists.reduce((newArray, todoList) => {
      if (!newArray.includes(todoList)) {
        newArray.push(todoList);
      }
      return newArray;
    }, []);

    return removeDuplicateTodoLists;
  } catch (error) {
    console.log(error.message);
  }
};

export default function App() {
  const [allTodoLists, setAllTodoLists] = useState([]);

  const addTodoList = async (newTodoListTitle) => {
    // ``** optimistic rendering **``
    setAllTodoLists([...allTodoLists, newTodoListTitle]);

    // If the response fails, remove the newly added todo
    const res = await createTodoField(newTodoListTitle);
    if (!res) {
      console.log("Didn't work");
      // removeTodo(newTodo.id);
      return;
    }

    // const newTodoObject = {
    //   ...newTodo,
    //   id: res.id, // This is the updated ID. Our initial temporary ID was created in the AddTodoForm.jsx file
    // };

    // setTodoList([...todoList, newTodoObject]);

    // todo ``** Need to use Navigate() hook here to jump straight to the new todo list. If the POST response fails, we can Navigate() back to the CreateTodo file **``
  };

  useEffect(() => {
    fetchTodoLists().then((value) => setAllTodoLists(value));
  }, []);

  return (
    <Router>
      <Navigation allTodoLists={allTodoLists} />
      <Routes>
        <Route
          path="/:currentTodoListTitle"
          element={
            <TodoContainer
              tableName={import.meta.env.VITE_TABLE_NAME}
              allTodoLists={allTodoLists}
            />
          }
        />
        <Route
          path="/new"
          element={
            <CreateTodo
              onAddTodoList={addTodoList}
              // allTodoLists={allTodoLists}
            />
          }
        />
        <Route path="/404" element={<h1>404: Page not found</h1>} />
      </Routes>
    </Router>
  );
}
