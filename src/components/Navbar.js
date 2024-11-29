import React, { Component } from "react";
import styles from "../assets/css/navbar.module.css";
import MenuItem from "./MenuItem";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.menuRef = React.createRef(); // Create a ref for the menu container
  }

  componentDidMount() {
    // Scroll to the selected item when the component mounts
    this.scrollToSelectedItem();
  }

  componentDidUpdate(prevProps) {
    // Check if selectedIndex has changed
    if (prevProps.selectedIndex !== this.props.selectedIndex) {
      this.scrollToSelectedItem();
    }
  }

  scrollToSelectedItem() {
    const { selectedIndex } = this.props;
    const menuItem = this.menuRef.current?.children[selectedIndex];

    if (menuItem) {
      menuItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest", // Ensure the item is visible within the container
      });
    }
  }
  render() {
    const { currentMenu, selectedIndex } = this.props;
    const activeMenu = currentMenu[selectedIndex]?.title;
    const title = currentMenu[selectedIndex]?.menu ? activeMenu : "Ipod.js";

    return (
      <div className={styles.navBar}>
        <div className={styles.navHeader}>
          <p> {title}</p>
        </div>
        <ul className={styles.menuContainer} ref={this.menuRef}>
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
