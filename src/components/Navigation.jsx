import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

export default function Navigation({ allTodoLists }) {
  return (
    <nav className={styles.nav}>
      <button type="button">
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

//todo ``** Need to get the list to regenerate on list button clicks. Maybe add a side effect to listen for a change. Can even be a unique state that changes every click.
