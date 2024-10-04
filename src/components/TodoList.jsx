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
  DATE: (todoList) => todoList,
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

  const sortByOptions = [
    { innerText: "Title", value: "TITLE" },
    { innerText: "Created Date", value: "DATE" },
  ];

  return (
    <>
      <div className={styles.dropDownContainer}>
        <div className={styles.dropDownTarget}>
          Sort by:
          <div className={styles.dropDownBox}>
            <ul className={styles.dropDownList}>
              {sortByOptions.map(({ innerText, value }) => (
                <li key={value} onClick={() => handleSort(value)}>
                  {innerText}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ul className={styles.unorderedList}>
        {sortedList.map(({ id, title }) => (
          <TodoListItem
            key={id}
            todo={title}
            id={id}
            onRemoveTodo={onRemoveTodo}
          />
        ))}
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
