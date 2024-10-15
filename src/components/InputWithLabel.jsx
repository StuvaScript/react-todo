import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./InputWithLabel.module.css";

export default function InputWithLabel({
  children,
  todoTitle,
  handleTitleChange,
}) {
  const inputRef = useRef();

  useEffect(() => inputRef.current.focus(), []);

  return (
    <>
      <label htmlFor="todoTitle" className={styles.label}>
        {children}
      </label>
      <input
        className={styles.input}
        id="todoTitle"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
        ref={inputRef}
      ></input>
    </>
  );
}

InputWithLabel.propTypes = {
  children: PropTypes.string,
  todoTitle: PropTypes.string,
  handleTitleChange: PropTypes.func,
};
