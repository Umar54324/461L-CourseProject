import React from "react";
import ReactDOM from "react-dom/client";
import "./my-projects.css";

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

// ===================================================================================================================================================

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: props.itemName,
      quantity: props.quantity,
    };
  }

  render() {
    console.log("Rendering item");
    return (
      <div>
        <table>
          <tr>
            <td>{this.state.itemName}</td>
            <td>x{this.state.quantity}</td>
            <td>
              <input
                className="input"
                type="text"
                placeholder="Enter quantity"
              />
            </td>
            <td>
              <button className="input">Checkin</button>
            </td>
          </tr>
        </table>
      </div>
    );
  }
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

class Projects extends React.Component {
  renderProject(projectName) {
    return <SingleProject projectName={projectName} />;
  }

  render() {
    return (
      <div>
        <h1 className="page-title">My Projects</h1>
        <div className="single-project">{this.renderProject("MyProject1")}</div>
        <div className="single-project">{this.renderProject("MyProject2")}</div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="project-panel">
          <Projects />
        </div>
      </div>
    );
  }
}

// ===================================================================================================================================================

export default Projects;
