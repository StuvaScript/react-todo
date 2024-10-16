import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./InputWithLabel.module.css";

export default function InputWithLabel({
  children,
  todoTitle,
  handleTitleChange,
  id,
  name,
}) {
  const inputRef = useRef();

  useEffect(() => inputRef.current.focus(), []);

  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {children}
      </label>
      <input
        className={styles.input}
        id={id}
        name={name}
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
  id: PropTypes.string,
  name: PropTypes.string,
};
