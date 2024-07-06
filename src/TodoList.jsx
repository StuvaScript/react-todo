import TodoListItem from "./TodoListItem";

const todoList = [
  { id: 1, title: "Go to store" },
  { id: 2, title: "Read book" },
  { id: 3, title: "Buy a monkey" },
];

export default function TodoList() {
  return (
    <ul>
      {todoList.map(({ id, title }) => (
        <TodoListItem key={id} todo={title} />
      ))}
    </ul>
  );
}
