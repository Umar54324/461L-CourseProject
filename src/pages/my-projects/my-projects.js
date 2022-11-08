import React from "react";
import ReactDOM from "react-dom/client";
import "./my-projects.css";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

// GLOBAL VARS //////////////////////////
const options = [
  {
    label: "Select product...",
    value: "Select product...",
  },
  {
    label: "[HW] CPU (5 left in stock)",
    value: "[HW] CPU",
  },
  {
    label: "[HW] GPU (5 left in stock)",
    value: "[HW] GPU",
  },
  {
    label: "[HW] Power Supply (5 left in stock)",
    value: "[HW] Power Supply",
  },
  {
    label: "[PER] Gaming Mouse (5 left in stock)",
    value: "[PER] Gaming Mouse",
  },
  {
    label: "[PER] Gaming Headset (5 left in stock)",
    value: "[PER] Gaming Headset",
  },
  {
    label: "[PER] Gaming Keyboard (5 left in stock)",
    value: "[PER] Gaming Keyboard",
  },
  {
    label: "[DEC] RGB Lights (5 left in stock)",
    value: "[DEC] RGB Lights",
  },
  {
    label: "[DEC] Monitor Stand (5 left in stock)",
    value: "[DEC] Monitor Stand",
  },
  {
    label: "[DEC] Keyboard Mat (5 left in stock)",
    value: "[DEC] Keyboard Mat",
  },
];

let names = [];
/////////////////////////////////////////

async function getAllProjects(username){
    let user = username.toString();   
    const url = "http://127.0.0.1:5000///getAllProjects/" + user;
    const response = await fetch(url);
    const data = await response.json();   
    names = data;   
    // console.log(names);
    return data;
}

// ===================================================================================================================================================

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

 function MultipleSelectCheckmarks(props) {
  
  const [personName, setPersonName] = React.useState([]);
  const [projectI, setProject] = React.useState("");

  getAllProjects(props.user);
 
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(     
      typeof value === 'string' ? value.split(',') : value,
    );
    // console.log(value);
    setProject(value);
    console.log(projectI + "changed");
    props.parentInputChange(value);
    this.props.onClick()
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
      <SingleProject id= "mainProject" user = {"saleh"} projectName = {projectI} onChange></SingleProject>
    </div>
    </div>
  );
}

class SingleProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: props.projectName, // name of project
      checkoutCapacity: 0, // total # items checked out
      itemAvailability: Array(9).fill(10), // item stock (each element = stock of that item)
      itemToCheckOut: "Select product...", // item about to be checked out (value in drop-down)
      textQuantity: null,
      quantity: null, // # items about to be checked out (value in input box)
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleCheckin = this.handleCheckin.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  changeProjectName(newName){
    this.setState({
      projectName: newName
    })
  }
  handleSelect(event) {
    console.log("Product selected.");
    event.preventDefault();
    this.setState({ itemToCheckOut: event.target.value });
  }

  handleInput(event) {
    console.log("Quantity chosen.");
    event.preventDefault();
    this.setState({ textQuantity: event.target.value });
  }

  handleCheckin(event) {
    event.preventDefault();
    console.log("Item checked out.");
    this.setState({
      quantity: Number(this.state.textQuantity) + Number(this.state.quantity),
      checkoutCapacity:
        Number(this.state.checkoutCapacity) - Number(this.state.textQuantity),
    });
  }

  handleCheckout(event) {
    event.preventDefault();
    console.log("Item checked out.");
    this.setState({
      quantity: Number(this.state.textQuantity) + Number(this.state.quantity),
      checkoutCapacity:
        Number(this.state.checkoutCapacity) + Number(this.state.textQuantity),
    });
  }

  
  render() {
    return (
      <div>
        <h2>{this.state.projectName}</h2>
        <table>
          <tr>
            <td>
              <h4>{this.state.checkoutCapacity} items checked out</h4>
            </td>
            <td>
              <form>
                <select
                  value={this.state.itemToCheckOut}
                  onChange={this.handleSelect}
                  className="input"
                >
                  {options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>

                <input
                  defaultValue={this.state.quantity}
                  onChange={this.handleInput}
                  className="input"
                  type="text"
                  placeholder="Enter quantity"
                />

                <button onClick={this.handleCheckin} className="input">
                  Checkin
                </button>

                <button onClick={this.handleCheckout} className="input">
                  Checkout
                </button>
                <div>
                  <label>
                    Most recent item processed: {this.state.itemToCheckOut}
                  </label>
                </div>
              </form>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}
let globName = "default";
class Projects extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      curProject: "default"
    }
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(name){
    // console.log(name);
    let nameP = this.state.curProject;
    nameP = name; 
    this.setState({
      curProject: nameP
    })
    // console.log(name);
    globName = name;
    console.log(this.state.curProject);
    // console.log(this.state.curProject);
    // console.log(globName);
    
  }
  renderProject(projectName) {
    // console.log(projectName + "render");
    return <SingleProject projectName={projectName} />;
  }
  getProjectList(user){
    let str = getAllProjects(user);
    let x = Array();
    str.then(value => {
      for(const element of value){
        x.push(element);
      }      
    });
    
    return x;
  }
  render() {
    return (
      <div>
        <h1 className="page-title">My Projects</h1>
        <MultipleSelectCheckmarks user = {"saleh"} parentInputChange = {this.onInputChange}></MultipleSelectCheckmarks>
        <div className="single-project">{this.renderProject(this.state.curProject)}</div>
        
      </div>
    );
  }
}

// ===================================================================================================================================================

export default Projects;