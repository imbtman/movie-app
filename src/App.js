import "./App.css";
import Home from "./components/Home";
import Movie from "../src/components/Movie"
import Search from "./components/Search";

//React-Router imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/search" element={<Search/>} />
      </Routes>
    </Router>
  );
}

export default App;
