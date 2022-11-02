import React from "react";
import "./card.css";

class Card extends React.Component {
  render() {
    return (
      <div class="card">
        <div class="item-name">
          <h1 class="item-name">{this.props.name}</h1>
        </div>
        <div class="image">
          <img src={this.props.url} alt="hi" />
        </div>
        <div class="avail-cap">
          <p>
            {this.props.available}/{this.props.capacity}
          </p>
        </div>
        <div class="add-block">
          <p id="add-label">Add to project:</p>
          <select>
            <option value="placeholder">Placeholder</option>
            <option value="place2">option 2</option>
          </select>
        </div>
        <div class="qty-checkout">
          <input></input>
          <button id="checkout-btn">CheckOut</button>
        </div>
      </div>
    );
  }
}

export default Card;
