import React, { Component } from "react";

class MenuButton extends Component {
  render() {
    const { handleMenu } = this.props;
    return (
      <div className="menuBtn" onClick={handleMenu}>
        <strong style={{ cursor: "pointer" }}>MENU</strong>
      </div>
    );
  }
}

export default MenuButton;
