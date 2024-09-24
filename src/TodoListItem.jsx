import styles from "./TodoListItem.module.css";
import TrashCanIcon from "./assets/icons/trash-can-icon.svg?react";

export default function TodoListItem({ id, todo, onRemoveTodo }) {
  return (
    <li className={styles.listItem}>
      <p>{todo}</p>
      <button type="button" onClick={() => onRemoveTodo(id)}>
        <TrashCanIcon height="25px" width="25px" />
      </button>
    </li>
  );
}
