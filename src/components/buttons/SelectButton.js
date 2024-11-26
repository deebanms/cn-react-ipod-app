import React, { Component } from "react";
import styles from "../../assets/css/ipod-circular-btn.module.css";

export class SelectButton extends Component {
  render() {
    const { handleMenuSelect } = this.props;
    return <div className={styles.menuSelect} onClick={handleMenuSelect}></div>;
  }
}

export default SelectButton;
