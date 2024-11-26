import aloneSong from "../audio/alone.webm";
import fadedSong from "../audio/faded.webm";
import blindingSong from "../audio/blinding_lights.webm";
import seeYouSong from "../audio/see_you_again.webm";
import shapeOfYouSong from "../audio/shape_of_you.webm";

import aloneImg from "../images/songs/alone.webp";
import fadedImg from "../images/songs/faded.webp";
import blindingImg from "../images/songs/blinding_lights.webp";
import seeYouImg from "../images/songs/see_you_again.webp";
import shapeOfYouImg from "../images/songs/shape_of_you.webp";

export const songs = [
  {
    id: 1,
    title: "Alone",
    audio: aloneSong,
    image: aloneImg,
    artist: "Alan Walker",
    album: "Alone",
    type: "Songs",
  },
  {
    id: 2,
    title: "Faded",
    audio: fadedSong,
    image: fadedImg,
    artist: "Alan Walker",
    album: "Different World",
    type: "Songs",
  },
  {
    id: 3,
    title: "Blinding Lights",
    audio: blindingSong,
    image: blindingImg,
    artist: "The Weeknd",
    album: "After Hours",
    type: "Songs",
  },
  {
    id: 4,
    title: "See You Again",
    audio: seeYouSong,
    image: seeYouImg,
    artist: "Wiz Khalifa",
    album: "Furious 7",
    type: "Songs",
  },
  {
    id: 5,
    title: "Shape of You",
    audio: shapeOfYouSong,
    image: shapeOfYouImg,
    artist: "Ed Sheeran",
    album: "Divide",
    type: "Songs",
  },
];

//  function to group Songs by a specified key and rename 'songs' key to 'menu'
const groupByKeyAsMenu = (songs, key) => {
  const map = new Map();

  songs.forEach((song) => {
    const keyValue = song[key];
    if (!map.has(keyValue)) {
      map.set(keyValue, {
        title: keyValue, // Rename the grouping key to 'title'
        menu: [],
        type: key,
      });
    }
    map.get(keyValue).menu.push({
      id: song.id,
      title: song.title,
      audio: song.audio,
      image: song.image,
      [key === "artist" ? "album" : "artist"]:
        key === "artist" ? song.album : song.artist,
    });
  });

  return Array.from(map.values());
};

export const artists = groupByKeyAsMenu(songs, "artist");
export const albums = groupByKeyAsMenu(songs, "album");
