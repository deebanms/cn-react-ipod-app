import React, { Component } from "react";
import styles from "../assets/css/ipod-case.module.css";
import IpodDisplay from "./IpodDisplay";
import CircularButton from "./CircularButton";
export class IpodCase extends Component {
  render() {
    return (
      <div className={styles.ipodCase}>
        <IpodDisplay />
        <CircularButton />
      </div>
    );
  }
}

export default IpodCase;
