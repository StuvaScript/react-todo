import { useEffect, useState } from "react";
import "./App.css";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

const useSemiPersistentState = () => {
  const [todoList, setTodoList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("savedTodoList")) || [];
    } catch (e) {
      console.error("Failed to parse 'savedTodoList'", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
};

function App() {
  const [todoList, setTodoList] = useSemiPersistentState();

  const addTodo = (newTodo) => setTodoList([...todoList, newTodo]);

  const removeTodo = (id) => {
    const newLIst = todoList.filter((item) => item.id !== id);

    setTodoList(newLIst);
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
}

export default App;
