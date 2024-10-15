import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import PropTypes from "prop-types";

export default function Navigation({ allTodoLists }) {
  return (
    <nav className={styles.nav}>
      <button type="button" className={styles.createNewTodoList}>
        <Link to="/new">New Todo List</Link>
      </button>

      {allTodoLists.map((list) => (
        <button key={list} type="button">
          <Link to={`/${list}`} state={list}>
            {list}
          </Link>
        </button>
      ))}
    </nav>
  );
}

Navigation.propTypes = {
  allTodoLists: PropTypes.arrayOf(PropTypes.string),
};
