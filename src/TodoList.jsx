import TodoListItem from "./TodoListItem";
import styles from "./TodoList.module.css";

export default function TodoList({ todoList, onRemoveTodo }) {
  return (
    <ul className={styles.unorderedList}>
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
