import React from "react";
import ReactDOM from "react-dom/client";
import "./pages/login/login.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  redirect,
} from "react-router-dom";
import Projects from "./pages/my-projects/my-projects.js";
import "./pages/my-projects/my-projects.css";
async function registerUser(username, password) {
  let user = username.toString();
  let pass = password.toString();
  const url = "http://127.0.0.1:5000///registerUser/" + user + "/" + pass;
  const response = await fetch(url);
  const data = await response.text();
  console.log(data);
}

async function verifyLogin(username, password) {
  let user = username.toString();
  let pass = password.toString();
  const url = "http://127.0.0.1:5000///verifyLogin/" + user + "/" + pass;
  const response = await fetch(url);
  const data = await response.text();
  console.log(data);
  return data;
}



class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "user",
      pass: "pass",
    };
  }

  handleUser = (event) => {
    event.preventDefault();

    this.setState({ user: event.target.value }, () => {
      console.log(this.state.user, "user");
    });
  };

  handlePass = (event) => {
    event.preventDefault();

    this.setState({ pass: event.target.value }, () => {
      console.log(this.state.pass, "pass");
    });
  };

   handleLogin = async (event) => {
    event.preventDefault();
    
    let str = await verifyLogin(this.state.user, this.state.pass); //must use await
    
    if (str === "False") {
      alert("Incorrect Credentials");
    } else {
      window.location.assign("/projects");
    }
  };

  handleSignUp = (event) => {
    event.preventDefault();

    registerUser(this.state.user, this.state.pass);
  };

  render() {
    return (
      <div>
        <h1>DeskUp</h1>
        <h4>Level up your desk.</h4>
        <form action="">
          <div>
            <input
              type="text"
              onChange={this.handleUser}
              placeholder="Enter username"
            />
          </div>
          <div>
            <input
              type="password"
              onChange={this.handlePass}
              placeholder="Enter password"
            />
          </div>
          <button onClick={this.handleLogin}>Log In</button>
          <button onClick={this.handleSignUp}>Sign Up</button>
        </form>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        {/* <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="projects" element={<Projects />} />
          </Routes>
        </BrowserRouter> */}
        <div className="login">
          <BrowserRouter>
            <Routes>
              <Route index element={<Login />} />
              <Route path="projects" element={<Projects />} />
            </Routes>
          </BrowserRouter>
          {/* <Login></Login> */}
        </div>
      </div>
    );
  }
}

// ===================================================================================================================================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
