import React from "react";
import "./hardware.css";
import ItemCard from "../../components/Card";

let global;

async function getHardwareItems() {
  const url = "/getAllStockItems/Hardware";
  const response = await fetch(url);
  const data = await response.text();
  console.log(data);
  return JSON.stringify(data);
}

class HardwareList extends React.Component {
  generateHWList() {
    return getHardwareItems();
  }

  render() {
    global = this.generateHWList();
    console.log(global);
    for (let i = 0; i < global.length; i++) {
      return (
        <ItemCard
          name={global[i]["Item"]}
          available={global[i]["Availability"]}
          capacity={global[i]["Capacity"]}
          url={global[i]["URL"]}
        />
      );
    }
  }
}

export default HardwareList;
