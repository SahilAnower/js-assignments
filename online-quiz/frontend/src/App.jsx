import ExamPage from "./pages/ExamPage";
import HomePage from "./pages/HomePage";
import ResultPage from "./pages/ResultPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useQuizStore } from "./store/store";

function App() {
  const { user, currResult } = useQuizStore((state) => state);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route
          exact
          path="/exam"
          element={
            currResult ? (
              <ResultPage />
            ) : !user.email ? (
              <HomePage />
            ) : (
              <ExamPage />
            )
          }
        />
        <Route exact path="/results" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
