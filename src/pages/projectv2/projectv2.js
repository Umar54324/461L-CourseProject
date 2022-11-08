import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Button from "@mui/material/Button";
import { TextField, touchRippleClasses } from "@mui/material";
import "./projectv2.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { createStore } from "state-pool";
import { activeUser } from "../login/login";

// let names = [];

async function getAllProjects(username) {
  let user = username.toString();
  const url = "http://127.0.0.1:5000///getAllProjects/" + user;
  const response = await fetch(url);
  const data = await response.json();
  // names = data;
  return data;
}
async function getCPUCheckedOut(username, projectName) {
  let user = username.toString();
  const url = "http://127.0.0.1:5000///getCPU/" + user + "/" + projectName;
  const response = await fetch(url);
  const data = await response.text();
  return data;
}
async function getGPUCheckedOut(username, projectName) {
  let user = username.toString();
  const url = "http://127.0.0.1:5000///getGPU/" + user + "/" + projectName;
  const response = await fetch(url);
  const data = await response.text();
  return data;
}
async function getTotalCPUAvailable() {
  const url = "http://127.0.0.1:5000///getAvailability/CPU";
  const response = await fetch(url);
  const data = await response.text();
  return data;
}
async function getTotalGPUAvailable() {
  const url = "http://127.0.0.1:5000///getAvailability/GPU";
  const response = await fetch(url);
  const data = await response.text();
  return data;
}
async function checkInBE(username, projectName, itemName, quantity) {
  const url =
    "http://127.0.0.1:5000///checkInUser/" +
    username +
    "/" +
    projectName +
    "/" +
    itemName +
    "/" +
    quantity;
  const response = await fetch(url);
  const data = await response.text();
  return data;
}
async function checkOutBE(username, projectName, itemName, quantity) {
  const url =
    "http://127.0.0.1:5000///checkOutUser/" +
    username +
    "/" +
    projectName +
    "/" +
    itemName +
    "/" +
    quantity;
  const response = await fetch(url);
  const data = await response.text();
  return data;
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function MultipleSelectCheckmarks(props) {
  const [personName, setPersonName] = React.useState([]);
  const [names, setNames] = React.useState([]);
  //getAllProjects(props.user);
  const getData = () => {
    fetch("http://127.0.0.1:5000///getAllProjects/" + props.user)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setNames(myJson);
      });
  };
  useEffect(() => {
    getData();
  });

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
    props.parentInputChange(value);
  };

  return (
    <div>
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-simple-select-label">Project List</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={personName}
            label="Age"
            onChange={handleChange}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        {/* <SingleProject id= "mainProject" user = {"saleh"} projectName = {projectI} onChange></SingleProject> */}
      </div>
    </div>
  );
}

function GenButton(props) {
  return (
    <Button className="Button" variant="outlined" onClick={props.onClick}>
      {props.value}
    </Button>
  );
}

function JoinButton(props) {
  return (
    <Button className="Button" variant="contained" onClick={props.onClick}>
      {props.value}
    </Button> //Material UI Component 1
  );
}

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joinButton: "Join",
      isJoined: false,
      set1CheckedOut: 0,
      set2CheckedOut: 0,
      set1Val: 0,
      set2Val: 0,
      cpuAvailable: 50,
      gpuAvailable: 100,
    };
    //this.initializeVals();
    this.initializeVals = this.initializeVals.bind(this);
    this.handleGenClick = this.handleGenClick.bind(this);
    this.handleSet1Change = this.handleSet1Change.bind(this);
    this.handleSet2Change = this.handleSet2Change.bind(this);
  }

  async initializeVals() {
    let initCPUVal = await getCPUCheckedOut(
      localStorage.getItem("CurrentUser"),
      //activeUser.getValue(),
      this.props.value
    );
    let initGPUVal = await getGPUCheckedOut(
      localStorage.getItem("CurrentUser"),
      //   activeUser.getValue(),
      this.props.value
    );
    // console.log(initCPUVal);
    // console.log(initGPUVal);
    this.setState({
      set1CheckedOut: initCPUVal,
      set2CheckedOut: initGPUVal,
      set1Val: initCPUVal,
      set2Val: initGPUVal,
    });
    // console.log(this.state.set1CheckedOut);
    // console.log(this.state.set2CheckedOut);
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.value != this.props.value) {
      await this.initializeVals();
      await this.updateCPUCap();
      await this.updateGPUCap();
    }
    // this.initializeVals = this.initializeVals.bind(this);
    // this.handleGenClick = this.handleGenClick.bind( this);
    // this.handleSet1Change = this.handleSet1Change.bind(this);
    // this.handleSet2Change = this.handleSet2Change.bind(this);
  }
  async updateCPUCap() {
    let av = await getTotalCPUAvailable();
    this.setState({
      cpuAvailable: av,
    });
  }
  async updateGPUCap() {
    let av = await getTotalGPUAvailable();
    this.setState({
      gpuAvailable: av,
    });
  }
  async handleGenClick(name, set) {
    if (name == "Check In") {
      if (set == "Set1") {
        //CPU
        let num = await checkInBE(
          localStorage.getItem("CurrentUser"),
          //   activeUser.getValue(),
          this.props.value,
          "CPU",
          this.state.set1Val
        );
        this.setState({
          set1CheckedOut: Number(
            Number(this.state.set1CheckedOut) - Number(num)
          ),
        });
        await this.updateCPUCap();
      } else {
        let num = await checkInBE(
          localStorage.getItem("CurrentUser"),
          //   activeUser.getValue(),
          this.props.value,
          "GPU",
          this.state.set2Val
        );
        this.setState({
          set2CheckedOut: Number(
            Number(this.state.set2CheckedOut) - Number(num)
          ),
        });
        await this.updateGPUCap();
      }
    } else {
      if (set == "Set1") {
        //CPU
        let num = await checkOutBE(
          localStorage.getItem("CurrentUser"),
          //   activeUser.getValue(),
          this.props.value,
          "CPU",
          this.state.set1Val
        );
        this.setState({
          set1CheckedOut: Number(
            Number(this.state.set1CheckedOut) + Number(num)
          ),
        });
        await this.updateCPUCap();
      } else {
        let num = await checkOutBE(
          localStorage.getItem("CurrentUser"),
          //   activeUser.getValue(),
          this.props.value,
          "GPU",
          this.state.set2Val
        );
        this.setState({
          set2CheckedOut: Number(
            Number(this.state.set2CheckedOut) + Number(num)
          ),
        });
        await this.updateGPUCap();
      }
    }
  }
  renderJoinButton() {
    return (
      <JoinButton
        value={this.state.joinButton}
        onClick={() => this.handleClick()}
      />
    );
  }
  renderGenButton(name, set) {
    return (
      <GenButton
        id={set}
        value={name}
        onClick={() => this.handleGenClick(name, set)}
      />
    );
  }
  handleSet1Change(param) {
    this.setState({
      set1Val: param,
    });
  }
  handleSet2Change(param) {
    this.setState({
      set2Val: param,
    });
  }
  render() {
    return (
      <div className="Project">
        <div className="PName">
          <h1>{this.props.value}</h1>
        </div>
        <div className="Set1">
          <b id="b">
            CPU: {this.state.set1CheckedOut} checked out ,{" "}
            {this.state.cpuAvailable} available
          </b>
          <TextField
            id="outlinedset1"
            label="Enter Qty"
            variant="outlined"
            onChange={(event) => this.handleSet1Change(event.target.value)}
          />
          {this.renderGenButton("Check In", "Set1")}
          {this.renderGenButton("Check Out", "Set1")}
          {/* {this.renderJoinButton()}                    */}
        </div>
        <div className="Set2">
          <b id="b">
            GPU: {this.state.set2CheckedOut} checked out ,{" "}
            {this.state.gpuAvailable} available
          </b>

          <TextField
            id="outlinedset2"
            label="Enter Qty"
            variant="outlined"
            onChange={(event) => this.handleSet2Change(event.target.value)}
          />
          {this.renderGenButton("Check In", "Set2")}
          {this.renderGenButton("Check Out", "Set2")}
        </div>
      </div>
    );
  }
}
class ProjectsV2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "N/A",
    };
    // console.log(store.getState("activeUser"));
    this.onInputChange = this.onInputChange.bind(this);
  }
  onInputChange(name) {
    this.setState({
      projectName: name,
    });
  }
  render() {
    return (
      <div>
        <div>
          <MultipleSelectCheckmarks
            user={localStorage.getItem("CurrentUser")}
            //user={activeUser.getValue()}
            parentInputChange={this.onInputChange}
          ></MultipleSelectCheckmarks>
        </div>
        <div className="Projects">
          <div className="Entrys">
            <Entry value={this.state.projectName} />
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectsV2;
