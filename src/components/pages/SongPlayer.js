import { Component } from "react";
import styles from "../../assets/css/ipod-player.module.css";

class SongPlayer extends Component {
  render() {
    const {
      currentMenu,
      selectedIndex,
      audioProgress,
      audioDuration,
      currentTime,
    } = this.props;
    const songData = currentMenu[selectedIndex];
    return (
      <div className={styles.musicPlayer}>
        <div className={styles.albumArtContainer}>
          <img src={songData?.image} alt="Album Art" className="album-art" />
          <div className="song-info">
            <h4>{songData?.title}</h4>
            <p>{songData?.artist}</p>
          </div>
        </div>
        <div className={styles.audioContainer}>
          <input
            type="range"
            className="audioProgress"
            value={audioProgress}
            max="100"
            readOnly
          />
          <div className={styles.timeContainer}>
            <span>{currentTime}</span>
            <span>{audioDuration}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default SongPlayer;
