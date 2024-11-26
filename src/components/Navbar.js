import React, { Component } from "react";
import styles from "../assets/css/navbar.module.css";
import MenuItem from "./MenuItem";

class Navbar extends Component {
  render() {
    const { currentMenu, selectedIndex } = this.props;
    const activeMenu = currentMenu[selectedIndex]?.title;
    const title = currentMenu[selectedIndex]?.menu ? activeMenu : "Ipod.js";

    return (
      <div className={styles.navBar}>
        <div className={styles.navHeader}>
          <p> {title}</p>
        </div>
        <ul className={styles.menuContainer}>
          {currentMenu.map((menuItem, index) => (
            <MenuItem
              key={index}
              menuItem={menuItem}
              selectedIndex={
                activeMenu === menuItem.title ? menuItem.title : null
              }
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Navbar;
