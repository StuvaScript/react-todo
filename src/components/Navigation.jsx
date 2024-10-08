import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <button>
        <Link to="/">Home</Link>
      </button>
      <button>
        <Link to="/new">New Todo List</Link>
      </button>
    </nav>
  );
}
