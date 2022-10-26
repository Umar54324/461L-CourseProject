import React from 'react';
import ReactDOM from 'react-dom/client';
import './login/login.css';


async function createUser(username, password){
    let user = username.toString();
    let pass = password.toString();
    const url = "/createUser/";
    const response = await fetch(url);
    const data = await response.text();
}

async function verifyLogin(username, password) {
    let user = username.toString();
    let pass = password.toString();
    const url = "/verify/";
    const response = await fetch(url);
    const data = await response.text();
}


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 'user',
            pass: 'pass'
        };
    }


    handleUser = (event) => {
        event.preventDefault();
        this.setState({ user: event.target.value }, () => {
            console.log(this.state.user, 'user');
          }); 
    }
    
    handlePass = (event) => {
        event.preventDefault();
        this.setState({ pass: event.target.value }, () => {
            console.log(this.state.pass, 'pass');
          }); 
    }

    handleLogin = (event) => {
        event.preventDefault();
        
        verifyLogin(this.state.user, this.state.pass)
    }

    handleSignUp = (event) => {
        event.preventDefault();
        
        createUser(this.state.user, this.state.pass)
    }


    render() {
        return (
            <div>
                <h1>DeskUp</h1>
                <h4>Level up your desk.</h4>
                <form action="">
                    <div>
                        <input
                            type="text" onChange = {this.handleUser} placeholder="Enter username"
                        />
                        
                        </div>
                    <div>
                        <input 
                            defaultValue = {this.state.pass}
                            type="text" onChange = {this.handlePass} placeholder="Enter password"
                        /> 
                    </div>
                    <button defaultValue = {this.state.display} onClick={this.handleLogin}>Log In</button>
                    <button>Sign Up</button>  
                </form>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <div className="login">
                    <Login />
                </div>
            </div>
        );
    }
}

// ===================================================================================================================================================
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
