import React from "react";
import ReactDOM from "react-dom/client";



async function registerUser(username, password) {
    let user = username.toString();
    let pass = password.toString();
    const url = "/registerUser/" + user + "/" + pass;
    const response = await fetch(url);
    const data = await response.text();
    console.log(data);
    return data;
}

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "user",
            pass: "pass"
        };
    }

    handleUser = (event) => {
        event.preventDefault();

        this.setState({ user: event.target.value });
    };

    handlePass = (event) => {
        event.preventDefault();

        this.setState({ pass: event.target.value });
    };

    handleCreate = async (event) => {
        event.preventDefault();

        let str = await registerUser(this.state.user, this.state.pass);
        if (str === "False") {
        alert("Username is taken");
        } else {
            window.location.assign("/login");
        }
    };

    render() {
        return (
            <div>
              <h1>DeskUp</h1>
              <h4>Level up your desk.</h4>
              <h3>Register</h3>
              <form action="">
                <div>
                  <input
                    type="text"
                    onChange={this.handleUser}
                    placeholder="Create a new username"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    onChange={this.handlePass}
                    placeholder="Create a new password"
                  />
                </div>
                <button onClick={this.handleCreate}>Create Account</button>
              </form>
            </div>
        );
    }
}

// ===================================================================================================================================================

export default Signup;