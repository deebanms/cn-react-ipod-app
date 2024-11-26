import React, { Component } from "react";
import styles from "../../assets/css/ipod-common-display.module.css";

class Display extends Component {
  renderDisplayContent = () => {
    const { displayContent } = this.props;
    switch (displayContent) {
      case "Cover Flow":
        return <h4>Cover Flow</h4>;

      case "Games":
        return (
          <>
            <img
              src="https://www.freeiconspng.com/uploads/dice-png-transparent-transparent-red-dice-14mm-7.png"
              alt="games"
            />
            <h4>Games</h4>
          </>
        );
      default:
        return ""; // Default if no match
    }
  };

  render() {
    return (
      <div className={styles.displayContainer}>
        {this.renderDisplayContent()}
      </div>
    );
  }
}

export default Display;
