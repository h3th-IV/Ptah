import { Route, Routes } from "react-router-dom";
import About from "./About";
import "./App.css";
import Home from "./Home";
import Links from "./Links";
import Projects from "./Projects";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/links" element={<Links />} />
      </Routes>
    </div>
  );
}

export default App;
