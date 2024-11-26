import React, { Component } from "react";

class PlayButton extends Component {
  render() {
    const { togglePlayPause } = this.props;
    return (
      <div className="controlBtn">
        <img
          onClick={togglePlayPause}
          src="https://cdn-icons-png.flaticon.com/128/727/727245.png"
          alt="play button"
          style={{ width: "15px" }}
        />
      </div>
    );
  }
}

export default PlayButton;
