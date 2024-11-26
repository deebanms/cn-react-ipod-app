import React, { Component } from "react";

class BackButton extends Component {
  render() {
    const { backward, playPrevious } = this.props;
    return (
      <div className="controlBtn">
        <img
          onClick={playPrevious}
          onDoubleClick={backward}
          src="https://cdn-icons-png.flaticon.com/128/4818/4818809.png"
          alt="reverse icon"
        />
      </div>
    );
  }
}

export default BackButton;
