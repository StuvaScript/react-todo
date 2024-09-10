import styles from "./TodoListItem.module.css";

export default function TodoListItem({ id, todo, onRemoveTodo }) {
  return (
    <li className={styles.listItem}>
      <p>{todo}</p>
      <span></span>
      <button type="button" onClick={() => onRemoveTodo(id)}>
        Remove
      </button>
    </li>
  );
}
