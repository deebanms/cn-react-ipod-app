import React, { Component } from "react";
import styles from "../assets/css/ipod-display.module.css";
import Navbar from "./Navbar";
import SongPlayer from "./pages/SongPlayer";
import Display from "./pages/Display";
class IpodDisplay extends Component {
  renderDisplayContent = () => {
    const {
      displayContent,
      currentMenu,
      selectedIndex,
      audioDuration,
      currentTime,
      audioProgress,
    } = this.props;

    switch (displayContent) {
      case "Cover Flow":
      case "Settings":
      case "Games":
        return <Display displayContent={displayContent} />;

      case "Songs":
        return (
          <SongPlayer
            currentMenu={currentMenu}
            selectedIndex={selectedIndex}
            audioDuration={audioDuration}
            currentTime={currentTime}
            audioProgress={audioProgress}
          />
        );

      default:
        return ""; // Or any other default component you want to render
    }
  };

  render() {
    const { showMenu, currentMenu, selectedIndex, handleWallpaper } =
      this.props;
    return (
      <div
        className={styles.ipodDisplay}
        style={{
          backgroundImage: `url("${handleWallpaper}")`,
        }}
      >
        {showMenu ? (
          <Navbar currentMenu={currentMenu} selectedIndex={selectedIndex} />
        ) : (
          this.renderDisplayContent()
        )}
      </div>
    );
  }
}

export default IpodDisplay;
