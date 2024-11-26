import React, { Component } from "react";
import styles from "../assets/css/ipod-case.module.css";
import IpodDisplay from "./IpodDisplay";
import CircularButton from "./CircularButton";
export class IpodCase extends Component {
  render() {
    const {
      menu,
      showMenu,
      currentMenu,
      selectedIndex,
      displayContent,
      handleMenu,
      handleRotation,
      handleMenuSelect,
      isPlaying,
      currentSongIndex,
      audioDuration,
      currentTime,
      audioProgress,
      togglePlayPause,
      playNext,
      playPrevious,
      forward,
      backward,
      handleWallpaper,
    } = this.props;
    return (
      <div className={styles.ipodCase}>
        <IpodDisplay
          menu={menu}
          showMenu={showMenu}
          displayContent={displayContent}
          currentMenu={currentMenu}
          selectedIndex={selectedIndex}
          isPlaying={isPlaying}
          currentSongIndex={currentSongIndex}
          audioDuration={audioDuration}
          currentTime={currentTime}
          audioProgress={audioProgress}
          handleWallpaper={handleWallpaper}
        />
        <CircularButton
          handleMenu={handleMenu}
          handleRotation={handleRotation}
          handleMenuSelect={handleMenuSelect}
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
          playNext={playNext}
          playPrevious={playPrevious}
          forward={forward}
          backward={backward}
        />
      </div>
    );
  }
}

export default IpodCase;
