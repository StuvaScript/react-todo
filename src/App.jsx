import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoContainer from "./components/TodoContainer";
import Navigation from "./components/Navigation";
import CreateTodo from "./components/CreateTodo";
import { useState, useEffect } from "react";

const url = `https://api.airtable.com/v0/${
  import.meta.env.VITE_AIRTABLE_BASE_ID
}/${import.meta.env.VITE_TABLE_NAME}`;

const deleteTodoList = async (records) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const res = await fetch(`${url}?${records}`, options);

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

const createTodoList = async (todoListName) => {
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

    return data;
    // const todoLists = data.records.map((record) => record.fields.todoListName);

    // const removeDuplicateTodoLists = todoLists.reduce((newArray, todoList) => {
    //   if (!newArray.includes(todoList)) {
    //     newArray.push(todoList);
    //   }
    //   return newArray;
    // }, []);

    // return removeDuplicateTodoLists;
  } catch (error) {
    console.log(error.message);
  }
};

const extractUniqueTodoListNames = (data) => {
  const todoLists = data.records.map((record) => record.fields.todoListName);

  const removeDuplicateTodoLists = todoLists.reduce((newArray, todoList) => {
    if (!newArray.includes(todoList)) {
      newArray.push(todoList);
    }
    return newArray;
  }, []);

  return removeDuplicateTodoLists;
};

const formatIDsForDeleting = (records) => {
  let newString = "";

  records.forEach((record, index) => {
    newString += `records[]=${record.id}${index < records.length ? "&" : ""}`;
  });

  return newString;
};

export default function App() {
  const [allTodoLists, setAllTodoLists] = useState([]);

  const addTodoList = async (newTodoListTitle) => {
    // ``** optimistic rendering **``
    setAllTodoLists([...allTodoLists, newTodoListTitle]);

    // If the response fails, remove the newly added todo
    const res = await createTodoList(newTodoListTitle);
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

  const handleRemoveList = async (currentList) => {
    const data = await fetchTodoLists();

    const currentRecordsToBeDeleted = data.records.filter(
      (record) => record.fields.todoListName === currentList
    );
    // ``** The API can only delete 10 records at a time. This breaks the array into lengths that are 10 items long max.
    while (currentRecordsToBeDeleted.length > 0) {
      const records = currentRecordsToBeDeleted.splice(0, 10);
      const idString = formatIDsForDeleting(records);

      deleteTodoList(idString);
    }

    const updatedTodoLists = allTodoLists.filter(
      (list) => list.toLowerCase() !== currentList.toLowerCase()
    );
    setAllTodoLists(updatedTodoLists);

    // const oldList = todoList;

    // ``** optimistic rendering **``
    // const newLIst = todoList.filter((todoItem) => todoItem.id !== id);
    // setTodoList(newLIst);

    // If the response fails, change the todo list back to the previous list
    // const deleteRes = await deleteTodo(id);
    // if (deleteRes === null) {
    //   setTodoList(oldList);
    // }
  };

  useEffect(() => {
    fetchTodoLists()
      .then((data) => extractUniqueTodoListNames(data))
      .then((value) => setAllTodoLists(value));
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
              onRemoveList={handleRemoveList}
            />
          }
        />
        <Route
          path="/new"
          element={
            <CreateTodo
              onAddTodoList={addTodoList}
              allTodoLists={allTodoLists}
            />
          }
        />
        <Route path="/404" element={<h1>404: Page not found</h1>} />
      </Routes>
    </Router>
  );
}
