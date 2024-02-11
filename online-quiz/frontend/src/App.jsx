import ExamPage from "./pages/ExamPage";
import HomePage from "./pages/HomePage";
import ResultPage from "./pages/ResultPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/exam" element={<ExamPage />} />
        <Route exact path="/results" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
