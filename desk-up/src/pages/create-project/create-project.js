import React from "react";
import ReactDOM from "react-dom/client";
import "./create-project.css";



class CreateProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: "null",
            authorizedUsers: []
        };
    }

    handleName = (event) => {
        event.preventDefault();

        this.setState({projectName: event.target.value});
    }
    
    handleAddUser = (event) => {
        event.preventDefault();

        const newAuthUsers = this.state.authorizedUsers.slice();    // create a copy array
        newAuthUsers.push(event.target.value);
        this.setState({authorizedUsers: newAuthUsers});
    }

    handleCreate = (event) => {
        event.preventDefault();

        window.location.assign("/my-projects");
    }

    render() {
        return (
            <div className="create-proj">
                <h1>Create Project</h1>
                <form action="">
                    <div>
                        <p>Enter project name</p>
                        <input
                            type="text"
                            onChange={this.handleName}
                            placeholder="Type project name..."
                        />
                    </div>
                    <div>
                        <p>Add authorized users</p>
                        <input
                            type="text"
                            onChange={this.handleAddUser}
                            placeholder="Type user's name..."
                        />
                        <button className="addUser" onClick={this.handleAddUser}>Add User</button>
                    </div>
                    <button className="create" onClick={this.handleCreate}>Create Project</button>
                </form>
            </div>
        );
    }
}

// ===================================================================================================================================================

export default CreateProject;