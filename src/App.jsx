// todo **`` Create a new branch each week!!

import "./App.css";

const todoList = [
  { id: 1, title: "Go to store" },
  { id: 2, title: "Read book" },
  { id: 3, title: "Buy a monkey" },
];

function App() {
  return (
    <>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
