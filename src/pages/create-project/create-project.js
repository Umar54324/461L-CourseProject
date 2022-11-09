import React from "react";
import ReactDOM from "react-dom/client";
import "./create-project.css";
import { activeUser } from "../login/login";

async function createProj(origUser, project, description, owner) {
  let user = origUser.toString();
  let proj = project.toString();
  let desc = description.toString();
  let userOwn = owner.toString();
  const url =
    "http://127.0.0.1:5000///createProject/" +
    user +
    "/" +
    proj +
    "/" +
    desc +
    "/" +
    userOwn;
  const response = await fetch(url);
  const data = await response.text();
  return data;
}

async function addAuthorizedUser(userToAdd, project, description, currentUser) {
  let authUser = userToAdd.toString();
  let proj_name = project.toString();
  let desc = description.toString();
  let currUser = currentUser.toString();
  const url =
    "http://127.0.0.1:5000///addAuthorizedUser/" +
    authUser +
    "/" +
    proj_name +
    "/" +
    desc +
    "/" +
    currUser;
  const response = await fetch(url);
  const data = await response.text();
  return data;
}

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "null",
      authorizedUsers: "",
      projectDesc: "",
    };
  }

  handleNameChange = (event) => {
    event.preventDefault();

    this.setState({ projectName: event.target.value });
  };

  handleUserChange = (event) => {
    event.preventDefault();

    // const newAuthUsers = this.state.authorizedUsers.slice(); // create a copy array
    // newAuthUsers.push(event.target.value);
    this.setState({ authorizedUsers: event.target.value });
  };

  handleDescChange = (event) => {
    event.preventDefault();

    this.setState({ projectDesc: event.target.value });
  };

  handleCreate = async (event) => {
    event.preventDefault();
    let userArr = this.state.authorizedUsers.split(",");
    let alrExists = await createProj(
      activeUser.getValue(),
      this.state.projectName,
      "filler for now",
      activeUser.getValue()
    );
    console.log(alrExists);
    if (alrExists === "False") {
      return;
    } else {
      for (const element of userArr) {
        addAuthorizedUser(
          element,
          this.state.projectName,
          "filler for now",
          activeUser.getValue()
        );
      }
    }
    alert(
      "Successfully created project " +
        "'" +
        this.state.projectName +
        "'" +
        "\n" +
        "Added users " +
        this.state.authorizedUsers
    );
    //window.location.assign("/projects");
  };

  render() {
    return (
      <div className="create-proj">
        <h1>Create Project</h1>
        <form action="">
          <div>
            <p>Enter project name</p>
            <input
              type="text"
              onChange={this.handleNameChange}
              placeholder="Type project name..."
            />
          </div>
          <div>
            <p>Add authorized users</p>
            <input
              type="text"
              onChange={this.handleUserChange}
              placeholder="Type user's name..."
            />
            {/* <button className="addUser" onClick={this.handleAddUser}>
              Add User
            </button> */}
          </div>
          <div>
            <p>Enter project description</p>
            <input
              type="text"
              onChange={this.handleDescChange}
              placeholder="Type description..."
            />
          </div>
          <button className="create" onClick={this.handleCreate}>
            Create Project
          </button>
        </form>
      </div>
    );
  }
}

// ===================================================================================================================================================

export default CreateProject;
