import TodoListItem from "./TodoListItem";
import styles from "./TodoList.module.css";
import PropTypes from "prop-types";
import { useState } from "react";
import UpArrowIcon from "../assets/icons/up-arrow-icon.svg?react";
import DownArrowIcon from "../assets/icons/down-arrow-icon.svg?react";

const SORTS = {
  TITLE: (todoList) =>
    todoList.sort((a, b) =>
      a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
    ),
  CREATED: (todoList) =>
    todoList.sort((a, b) => (a.createdTime > b.createdTime ? 1 : -1)),
};

const sortOptions = [
  { innerText: "Title", value: "TITLE" },
  { innerText: "Created Time", value: "CREATED" },
];

export default function TodoList({ todoList, onRemoveTodo }) {
  const [sort, setSort] = useState({
    sortKey: "CREATED",
    isReverse: false,
  });

  const sortFunction = SORTS[sort.sortKey];
  const sortedList = sort.isReverse
    ? sortFunction(todoList).reverse()
    : sortFunction(todoList);

  const handleSort = (sortKey) => setSort({ sortKey, isReverse: false });

  const handleReverse = () => setSort({ ...sort, isReverse: !sort.isReverse });

  const currentSortOption = sortOptions.filter(
    (options) => options.value === sort.sortKey
  )[0].innerText;

  return (
    <>
      {todoList[0] && (
        <div className={styles.dropDownContainer}>
          <div className={styles.dropDownTarget}>
            Sort by
            <DownArrowIcon height="1rem" width="1rem" fill="#1d1d1d" />
            <div className={styles.dropDownBox}>
              <ul className={styles.dropDownList}>
                {sortOptions.map(({ innerText, value }) => (
                  <li key={value} onClick={() => handleSort(value)}>
                    {innerText}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <span className={styles.currentSortOption} onClick={handleReverse}>
            {currentSortOption}
            <button type="button">
              {sort.isReverse ? (
                <UpArrowIcon height="1rem" width="1rem" fill="#1d1d1d" />
              ) : (
                <DownArrowIcon height="1rem" width="1rem" fill="#1d1d1d" />
              )}
            </button>
          </span>
        </div>
      )}
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
      createdTime: PropTypes.string,
    })
  ),
  onRemoveTodo: PropTypes.func,
};
