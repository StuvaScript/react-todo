import TodoListItem from "./TodoListItem";
import styles from "./TodoList.module.css";
import PropTypes from "prop-types";

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

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  onRemoveTodo: PropTypes.func,
};
