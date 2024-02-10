import ExamPage from "./pages/ExamPage";
import ResultPage from "./pages/ResultPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ExamPage />} />
        <Route exact path="/results" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
