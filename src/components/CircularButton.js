import React, { Component } from "react";
import MenuButton from "./buttons/MenuButton";
import BackButton from "./buttons/BackButton";
import NextButton from "./buttons/NextButton";
import PlayButton from "./buttons/PlayButton";
import SelectButton from "./buttons/SelectButton";
import styles from "../assets/css/ipod-circular-btn.module.css";
import PauseButton from "./buttons/PauseButton";

class CircularButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRotating: false,
      rotationAngle: 0,
    };
  }

  handlePointerDown = (e) => {
    // Ensure that rotation starts only if the target is the main container div
    if (e.target !== e.currentTarget) return;

    e.preventDefault(); // Prevent default behavior like text selection
    e.stopPropagation();
    this.setState({ isRotating: true });
    this.lastAngle = this.getAngleFromPointer(e); // Store the initial angle
  };

  handlePointerMove = (e) => {
    if (!this.state.isRotating) return;

    const currentAngle = this.getAngleFromPointer(e);
    const deltaAngle = currentAngle - this.lastAngle;

    // Apply a threshold to prevent small jitters
    if (Math.abs(deltaAngle) > 2) {
      // Threshold in degrees
      const newRotationAngle = this.state.rotationAngle + deltaAngle;
      this.setState({ rotationAngle: newRotationAngle });
      this.props.handleRotation(newRotationAngle);
      this.lastAngle = currentAngle;
    }
  };

  handlePointerUp = () => {
    this.setState({ isRotating: false });
  };

  getAngleFromPointer = (e) => {
    const rect = e.target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    return Math.atan2(dy, dx) * (180 / Math.PI); // Calculate angle in degrees
  };

  renderPlayPauseButton = () => {
    const { isPlaying, togglePlayPause } = this.props;
    return isPlaying ? (
      <PauseButton togglePlayPause={togglePlayPause} />
    ) : (
      <PlayButton togglePlayPause={togglePlayPause} />
    );
  };

  render() {
    const {
      handleMenu,
      handleMenuSelect,
      playNext,
      playPrevious,
      forward,
      backward,
    } = this.props;
    return (
      <div
        className={styles.ipodMenu}
        onPointerDown={this.handlePointerDown}
        onPointerMove={this.handlePointerMove}
        onPointerUp={this.handlePointerUp}
        style={{ touchAction: "none" }}
      >
        <MenuButton handleMenu={handleMenu} />
        <div className={styles.circularMenu}>
          <BackButton playPrevious={playPrevious} backward={backward} />
          <SelectButton handleMenuSelect={handleMenuSelect} />
          <NextButton playNext={playNext} forward={forward} />
        </div>
        {this.renderPlayPauseButton()}
      </div>
    );
  }
}

export default CircularButton;
