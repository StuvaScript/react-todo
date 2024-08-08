import { useEffect, useState } from "react";
import "./App.css";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

const savedTodoList = "savedTodoList";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            todoList: () => {
              try {
                return JSON.parse(localStorage.getItem(savedTodoList)) || [];
              } catch (e) {
                console.error(`Failed to parse ${savedTodoList}`, e);
                return [];
              }
            },
          },
        });
      }, 2000);
    }).then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    !isLoading && localStorage.setItem(savedTodoList, JSON.stringify(todoList));
  }, [isLoading, todoList]);

  const addTodo = (newTodo) => setTodoList([...todoList, newTodo]);

  const removeTodo = (id) => {
    const newLIst = todoList.filter((item) => item.id !== id);

    setTodoList(newLIst);
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </>
  );
}

export default App;
