import { useEffect, useRef } from "react";

export default function InputWithLabel({ children, value, handleChange }) {
  const inputRef = useRef();

  useEffect(() => inputRef.current.focus());

  return (
    <>
      <label htmlFor="todoTitle">{children} </label>
      <input
        id="todoTitle"
        name="title"
        value={value}
        onChange={handleChange}
        ref={inputRef}
      ></input>
    </>
  );
}
