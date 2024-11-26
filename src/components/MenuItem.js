import React, { Component } from "react";
import styles from "../assets/css/navbar.module.css";
import arrow from "../assets/images/arrow.png";

class MenuItem extends Component {
  render() {
    const { menuItem, selectedIndex } = this.props;
    // console.log(selectedIndex);

    return (
      <li
        className={`${styles.menuItem} ${selectedIndex ? styles.active : ""}
        `}
      >
        <div className={styles.menuTitle}>{menuItem.title}</div>
        <div>
          <img src={arrow} alt="expand sub menu" />
        </div>
      </li>
    );
  }
}

export default MenuItem;
