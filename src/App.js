import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import Home from "./Components/Home";
import Addpost from "./Components/Addpost";
import PostState from "./context/post/PostState";
function App() {
  return (
    <PostState>
    <Router>
          <Navbar/>
          <div className="container">
            <Routes>
              <Route path="/addpost" element={<Addpost/>}/>
              <Route path="/" element={<Home/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<Signup/>} />
            </Routes>
          </div>
        </Router>
    </PostState>
  );
}

export default App;
