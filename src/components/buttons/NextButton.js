import React, { Component } from "react";
class NextButton extends Component {
  render() {
    const { forward, playNext } = this.props;
    return (
      <div className="controlBtn">
        <img
          onClick={playNext}
          onDoubleClick={forward}
          src="https://cdn-icons-png.flaticon.com/128/1/1824.png"
          alt="next icon"
          style={{ width: "17px" }}
        />
      </div>
    );
  }
}

export default NextButton;
