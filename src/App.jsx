import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoContainer from "./components/TodoContainer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoContainer />} />
        {/* The route below was required in the homework but was never touched upon what to do with it */}
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
