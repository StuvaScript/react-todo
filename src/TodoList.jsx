const todoList = [
  { id: 1, title: "Go to store" },
  { id: 2, title: "Read book" },
  { id: 3, title: "Buy a monkey" },
];

export default function TodoList() {
  return (
    <ul>
      {todoList.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );
}
