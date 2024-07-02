export default function AddTodoForm({ onAddTodo }) {
  function handleAddTodo(event) {
    event.preventDefault();
    let todoTitle = event.target.title.value;
    console.log(todoTitle);
    onAddTodo(todoTitle);
    event.target.title.value = "";
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title </label>
      <input id="todoTitle" name="title"></input>
      <button>Add</button>
    </form>
  );
}
