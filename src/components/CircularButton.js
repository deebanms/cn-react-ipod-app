import React, { Component } from "react";
import MenuButton from "./buttons/MenuButton";
import BackButton from "./buttons/BackButton";
import NextButton from "./buttons/NextButton";
import PlayButton from "./buttons/PlayButton";
import SelectButton from "./buttons/SelectButton";
import styles from "../assets/css/ipod-circular-btn.module.css";

class CircularButton extends Component {
  render() {
    return (
      <div className={styles.ipodMenu}>
        <MenuButton />
        <div className={styles.circularMenu}>
          <BackButton />
          <SelectButton />
          <NextButton />
        </div>
        <PlayButton />
      </div>
    );
  }
}

export default CircularButton;
