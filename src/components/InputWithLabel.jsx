import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./InputWithLabel.module.css";

export default function InputWithLabel({ children, value, handleTitleChange }) {
  const inputRef = useRef();

  useEffect(() => inputRef.current.focus());

  return (
    <>
      <label htmlFor="todoTitle" className={styles.label}>
        {children}
      </label>
      <input
        className={styles.input}
        id="todoTitle"
        name="title"
        value={value}
        onChange={handleTitleChange}
        ref={inputRef}
      ></input>
    </>
  );
}

InputWithLabel.propTypes = {
  children: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
};
