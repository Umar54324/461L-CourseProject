import React from 'react';
import ReactDOM from 'react-dom/client';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import './projectv2.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { createStore } from 'state-pool';
import { activeUser } from '../login/login';



let names = [];

async function getAllProjects(username){
    let user = username.toString();   
    const url = "http://127.0.0.1:5000///getAllProjects/" + user;
    const response = await fetch(url);
    const data = await response.json();   
    names = data;   
    return data;
}
async function getCPUCheckedOut(username, projectName){
    let user = username.toString();  
    const url = "http://127.0.0.1:5000///getCPU/" + user + "/" + projectName;
    const response = await fetch(url);
    const data = await response.text();        
    return data;
}
async function getGPUCheckedOut(username, projectName){
    let user = username.toString();  
    const url = "http://127.0.0.1:5000///getGPU/" + user + "/" + projectName;
    const response = await fetch(url);
    const data = await response.text();        
    return data;
}
async function getTotalCPUAvailable(){   
    const url = "http://127.0.0.1:5000///getAvailability/CPU";
    const response = await fetch(url);
    const data = await response.json();        
    return data;
}
async function getTotalGPUAvailable(){
    const url = "http://127.0.0.1:5000///getAvailability/GPU";
    const response = await fetch(url);
    const data = await response.json();        
    return data;
}
async function checkInBE(username, projectName, itemName, quantity){
    const url = "http://127.0.0.1:5000///checkInUser/" + username + "/" + projectName + "/" + itemName + "/" + quantity + "/";
    const response = await fetch(url);
    const data = await response.json();        
    return data;
}   
async function checkOutBE(username, projectName, itemName, quantity){
    const url = "http://127.0.0.1:5000///checkOutUser/" + username + "/" + projectName + "/" + itemName + "/" + quantity + "/";
    const response = await fetch(url);
    const data = await response.json();        
    return data;
}
function MultipleSelectCheckmarks(props) {
  
    const [personName, setPersonName] = React.useState([]);
    
    getAllProjects(props.user);
   
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(     
        typeof value === 'string' ? value.split(',') : value,
      );
      
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

function GenButton(props){   
        return(
            <Button className = "Button" variant = "outlined" onClick = {props.onClick}>{props.value}</Button>
        )    
}

function JoinButton(props){
    return(
        <Button className = "Button" variant = "contained" onClick = {props.onClick}>{props.value}</Button>   //Material UI Component 1
    )
}

class Entry extends React.Component{
    constructor(props){
        super(props);       
        this.state = {
            joinButton: 'Join',
            isJoined: false,
            set1CheckedOut: 0,
            set2CheckedOut: 0,
            set1Val: 0,
            set2Val: 0
        };
        this.initializeVals();
        this.initializeVals = this.initializeVals.bind(this);
    }
    async initializeVals(){
        let initCPUVal = await getCPUCheckedOut(activeUser.getValue(), this.props.value);
        let initGPUVal = await getGPUCheckedOut(activeUser.getValue(), this.props.value);
        console.log(initCPUVal);
        console.log(initGPUVal);
        this.setState = ({
            set1CheckedOut: Number(initCPUVal),
            set2CheckedOut: Number(initGPUVal),
            set1Val: initCPUVal,
            set2Val: initGPUVal
        });
        console.log(this.state.set1CheckedOut);
        console.log(this.state.set2CheckedOut);
    }
    async componentDidUpdate(prevProps, prevState){
        if(prevProps.value != this.props.value){
            await this.initializeVals();
        }
    }
    // handleClick(){
    //     let button = this.state.joinButton;
    //     button = this.state.isJoined ? 'Join' : 'Leave';
    //     if(!this.state.isJoined){
    //         // joinProjectBackend(this.props.value);           
    //     }
    //     else{
    //         // leaveProjectBackend(this.props.value);
    //     }
    //     this.setState({
    //         joinButton: button,
    //         isJoined: !this.state.isJoined
    //     })
    // }
    async handleGenClick(name, set){
        if(name == 'Check In'){
            if(set == 'Set1'){   //CPU
                // await checkInBE(activeUser.getValue() ,this.props.value, "CPU", this.state.set1Val);                           
                 this.setState({
                    set1CheckedOut: this.state.set1CheckedOut - this.state.set1Val,
                 });
            }
            else{                
                 this.setState({
                    set2CheckedOut: this.state.set2CheckedOut - this.state.set2Val,
                 });
            }
        }
        else{
            if(set == 'Set1'){  //GPU
                this.setState({
                    set1CheckedOut: this.state.set1CheckedOut + this.state.set1Val,
                });                
            }
            else{
                this.setState({
                    set2CheckedOut: this.state.set2CheckedOut + this.state.set2Val,
                });  
            }
        }
    }
    renderJoinButton(){
        return <JoinButton value = {this.state.joinButton} onClick={() => this.handleClick()}/>;
    }
    renderGenButton(name, set){
        return <GenButton id = {set} value = {name} onClick = {() => this.handleGenClick(name, set)}/>;
    }
    handleSet1Change(param){
       
        this.setState({
            set1Val: param
        });
    }
    handleSet2Change(param){
        
        this.setState({
            set2Val: param
        });
    }
    render(){
        return(
            <div className = "Project">
                <div className = "PName">
                    <h1>{this.props.value}</h1>
                </div>
                <div className="Set1">
                    
                    <b id = "b">CPU: {this.state.set1CheckedOut} / 100</b>                    
                    <TextField id="outlinedset1" label="Enter Qty" variant="outlined" onChange = {(event) => this.handleSet1Change(event.target.value)}/>
                    {this.renderGenButton('Check In', 'Set1')}
                    {this.renderGenButton('Check Out', 'Set1')}
                    {/* {this.renderJoinButton()}                    */}
                </div>
                <div className="Set2">      
                    
                    <b id = "b">GPU: {this.state.set2CheckedOut}/ 100</b>
                    
                    <TextField id="outlinedset2" label="Enter Qty" variant="outlined" onChange = {(event) => this.handleSet2Change(event.target.value)}/>
                    {this.renderGenButton('Check In', 'Set2')}
                    {this.renderGenButton('Check Out', 'Set2')}                   
                </div>
            </div>
        );
    }

}
class ProjectsV2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            projectName: 'N/A',
        };
        // console.log(store.getState("activeUser"));
        this.onInputChange = this.onInputChange.bind(this);
    }
    onInputChange(name){
        this.setState({
          projectName: name
        })
        
      }
    render() {
        return (
            <div>
            <div>
            <MultipleSelectCheckmarks user = {activeUser.getValue()} parentInputChange = {this.onInputChange}></MultipleSelectCheckmarks>
            </div>
            <div className="Projects">
                <div className="Entrys">
                    <Entry value = {this.state.projectName}/>
                </div>
            </div>
            </div>
        );
    }
}

export default ProjectsV2;