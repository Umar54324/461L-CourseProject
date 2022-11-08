import React from "react";
import ReactDOM from "react-dom/client";
import "./pages/login/login.css";
import Projects from "./pages/my-projects/my-projects.js";
import ProjectsV2 from "./pages/projectv2/projectv2.js";
import "./pages/projectv2/projectv2.css";
import "./pages/my-projects/my-projects.css";
import Signup from "./pages/sign-up/sign-up.js";
import "./pages/sign-up/sign-up.css";
import { Link } from "react-router-dom";
import Navbar from "./navbar/navbar";
import Login from "./pages/login/login";
import Card from "./components/Card.js";
import CreateProject from "./pages/create-project/create-project.js";
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  redirect,
  Switch,
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="navigator">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route index element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="projects" element={<ProjectsV2 />} />
              <Route path="sign-up" element={<Signup />} />
              <Route path="create-project" element={<CreateProject />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

// ===================================================================================================================================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
