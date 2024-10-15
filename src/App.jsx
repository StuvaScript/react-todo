import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoContainer from "./components/TodoContainer";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <TodoContainer tableName={import.meta.env.VITE_TABLE_NAME} />
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </Router>
  );
}
