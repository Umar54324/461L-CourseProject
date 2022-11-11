import React from "react";
import ReactDOM from "react-dom/client";
import "./login.css";
import { createGlobalstate, useGlobalState } from "state-pool";
import { createStore } from "state-pool";
import { Navigate } from "react-router-dom";

const store = createStore();
store.setState("activeUser", "null");
const activeUser = createGlobalstate("null");
async function verifyLogin(username, password) {
  let user = username.toString();
  let pass = password.toString();
  console.log(user);
  console.log(pass);
  const url = "/verifyLogin/" + user + "/" + pass;
  const response = await fetch(url);
  const data = await response.text();
  console.log(data);
  return data;
}

function Login(props) {
  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  // const[activeUser, setActiveUser] = store.useState("activeUser");
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     user: "user",
  //     pass: "pass",

  //   };
  // }

  const handleUser = (event) => {
    event.preventDefault();
    // this.setState({ user: event.target.value }, () => {
    //   console.log(this.state.user, "user");
    // });
    setUser(event.target.value);
  };

  const handlePass = (event) => {
    event.preventDefault();

    // this.setState({ pass: event.target.value }, () => {
    //   console.log(this.state.pass, "pass");
    // });

    setPass(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    // let str = await verifyLogin(this.state.user, this.state.pass); //must use await
    // console.log(user);
    // console.log(pass);
    let str = await verifyLogin(user, pass);
    // console.log(str);
    if (str === "False") {
      alert("Incorrect Credentials");
    } else {
      // activeUser= this.state.user
      activeUser.setValue(user);
      console.log(activeUser.getValue());

      localStorage.setItem("CurrentUser", user);
      window.location.assign("/projects");
    }
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    //registerUser(this.state.user, this.state.pass);
    window.location.assign("/sign-up");
  };

  return (
    <div className="login">
      <h1>DeskUp</h1>
      <h4>Level up your desk.</h4>
      <form action="">
        <div>
          <input
            type="text"
            onChange={handleUser}
            placeholder="Enter username"
          />
        </div>
        <div>
          <input
            type="password"
            onChange={handlePass}
            placeholder="Enter password"
          />
        </div>
        <button onClick={handleLogin}>Log In</button>
        <button onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
}
export { activeUser };
export default Login;
