import React, { Component } from "react";

class PauseButton extends Component {
  render() {
    return (
      <div className="controlBtn">
        <img
          src="https://cdn-icons-png.flaticon.com/128/3669/3669483.png"
          alt="pause button"
          style={{ width: "17px" }}
        />
      </div>
    );
  }
}

export default PauseButton;
