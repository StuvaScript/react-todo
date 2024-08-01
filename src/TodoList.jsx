import TodoListItem from "./TodoListItem";

export default function TodoList({ todoList, onRemoveTodo }) {
  return (
    <ul>
      {todoList.map(({ id, title }) => (
        <TodoListItem
          key={id}
          todo={title}
          id={id}
          onRemoveTodo={onRemoveTodo}
        />
      ))}
    </ul>
  );
}
