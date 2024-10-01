import TodoListItem from "./TodoListItem";
import styles from "./TodoList.module.css";
import PropTypes from "prop-types";
import { useState } from "react";

const SORTS = {
  // NONE: (todoList) => todoList,
  TITLE: (todoList) =>
    todoList.sort((a, b) =>
      a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
    ),
};

export default function TodoList({ todoList, onRemoveTodo }) {
  const [sort, setSort] = useState({
    sortKey: "TITLE",
    isReverse: false,
  });

  const handleSort = (sortKey) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;

    setSort({ sortKey, isReverse });
  };

  const sortFunction = SORTS[sort.sortKey];
  const sortedList = sort.isReverse
    ? sortFunction(todoList).reverse()
    : sortFunction(todoList);

  return (
    <>
      <div>
        <span>Sort by: </span>
        <button onClick={() => handleSort("TITLE")}>title</button>
      </div>

      <ul className={styles.unorderedList}>
        {sortedList.map(
          ({ id, title }) =>
            console.log(id) || (
              <TodoListItem
                key={id}
                todo={title}
                id={id}
                onRemoveTodo={onRemoveTodo}
              />
            )
        )}
      </ul>
    </>
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
