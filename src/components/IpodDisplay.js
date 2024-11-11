import React, { Component } from "react";
import styles from "../assets/css/ipod-display.module.css";

class IpodDisplay extends Component {
  render() {
    return (
      <div
        className={styles.ipodDisplay}
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
        }}
      ></div>
    );
  }
}

export default IpodDisplay;
