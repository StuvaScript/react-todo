export default function TodoListItem({ id, todo, onRemoveTodo }) {
  return (
    <li>
      {todo}
      &nbsp;
      <button type="button" onClick={() => onRemoveTodo(id)}>
        Remove
      </button>
    </li>
  );
}
