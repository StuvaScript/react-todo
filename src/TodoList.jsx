import TodoListItem from "./TodoListItem";

export default function TodoList({ todoList }) {
  return (
    <ul>
      {todoList.map(({ id, title }) => (
        <TodoListItem key={id} todo={title} />
      ))}
    </ul>
  );
}
