import React, { Component } from "react";
import IpodCase from "./components/IpodCase";
import { songs, artists, albums } from "./assets/data/songs";
import { wallpaper } from "./assets/data/wallpaper";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentSongIndex: 0,
      isPlaying: false,
      audioElement: null, // Lazy initialization for audio
      menu: this.createMenu(), // Generates the initial menu structure
      showMenu: false,
      currentMenu: [],
      navigationStack: [],
      selectedIndex: 0,
      displayContent: "",
      audioDuration: "0:00",
      currentTime: "0:00",
      audioProgress: 0,
      intervalId: null,
      bg: "https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    };
  }

  // Function to generate the menu structure
  createMenu = () => [
    { title: "Cover Flow", type: "Cover Flow" },
    {
      title: "Music",
      menu: [
        {
          title: "All Songs",
          menu: songs,
        },
        {
          title: "Artists",
          menu: artists,
        },
        { title: "Albums", menu: albums },
      ],
    },
    { title: "Games", type: "Games" },
    {
      title: "Settings",
      menu: [
        { title: "Change Theme" },
        { title: "Change Wallpaper", menu: wallpaper },
      ],
    },
  ];

  componentDidMount() {
    console.log(this.state.menu);
    this.setState({
      currentMenu: this.state.menu,
    });
  }

  // handleMenuSelect = () => {
  //   const { showMenu, currentMenu, selectedIndex, audioElement } = this.state;

  //   if (!showMenu) return;

  //   const selectedMenu = currentMenu?.[selectedIndex];
  //   if (!selectedMenu) {
  //     console.error("Invalid menu state or selection.");
  //     return;
  //   }

  //   // Handle non-navigable items
  //   if (!selectedMenu.menu) {
  //     const { type, audio } = selectedMenu;

  //     switch (type) {
  //       case "Cover Flow":
  //       case "Games":
  //         this.setState({ displayContent: type, showMenu: false });
  //         break;

  //       case "Change Wallpaper":
  //         console.log("Change Wallpaper selected. Implement logic here.");
  //         break;

  //       case "Songs":
  //         if (audioElement) {
  //           audioElement.pause();
  //         }

  //         const newAudio = new Audio(audio);
  //         this.setState(
  //           {
  //             audioElement: newAudio,
  //             audioProgress: 0,
  //             displayContent: "Songs",
  //             showMenu: false,
  //           },
  //           this.playAudio // Ensure playAudio is bound to the correct context
  //         );
  //         break;

  //       default:
  //         console.warn(`Unhandled menu type: ${type}`);
  //     }
  //     return;
  //   }

  //   // Navigate to a submenu
  //   this.setState((prevState) => ({
  //     currentMenu: selectedMenu.menu,
  //     navigationStack: [...prevState.navigationStack, prevState.currentMenu],
  //     selectedIndex: 0,
  //   }));
  // };

  handleMenuSelect = () => {
    const { showMenu, currentMenu, selectedIndex } = this.state;

    if (!showMenu) return;

    const selectedMenu = currentMenu?.[selectedIndex];
    if (!selectedMenu) {
      console.error("Invalid menu state or selection.");
      return;
    }

    // Handle non-navigable items
    if (!selectedMenu.menu) {
      this.handleNonNavigableMenu(selectedMenu);
      return;
    }

    // Navigate to a submenu
    this.navigateToSubmenu(selectedMenu);
  };

  // Helper function for non-navigable menu handling
  handleNonNavigableMenu = (menuItem) => {
    const { type, audio } = menuItem;
    const { audioElement } = this.state;

    const menuTypeActions = {
      "Cover Flow": () =>
        this.setState({ displayContent: "Cover Flow", showMenu: false }),
      Games: () => this.setState({ displayContent: "Games", showMenu: false }),
      "Change Wallpaper": () =>
        this.setState({
          displayContent: "Menu",
          showMenu: true,
          bg: menuItem.image,
        }),
      Songs: () => {
        if (audioElement) {
          audioElement.pause();
        }

        const newAudio = new Audio(audio);
        this.setState(
          {
            audioElement: newAudio,
            audioProgress: 0,
            displayContent: "Songs",
            showMenu: false,
          },
          this.playAudio // Play audio after state update
        );
      },
    };

    const action = menuTypeActions[type];
    if (action) {
      action();
    } else {
      console.warn(`Unhandled menu type: ${type}`);
    }
  };

  // Helper function for submenu navigation
  navigateToSubmenu = (menuItem) => {
    this.setState((prevState) => ({
      currentMenu: menuItem.menu,
      navigationStack: [...prevState.navigationStack, prevState.currentMenu],
      selectedIndex: 0,
    }));
  };

  playAudio = () => {
    const { audioElement } = this.state;
    if (audioElement) {
      audioElement.play();
      const intervalId = setInterval(this.updateProgress, 1000);
      this.setState({
        isPlaying: true,
        intervalId,
      });
    }
  };

  // Utility function to get display content based on menu title
  getDisplayContent = (title) => {
    console.log(title);
    const contentMap = {
      "Cover Flow": "Cover Flow",
      Games: "Games",
      "Change Theme": "Change Theme",
      "Change Wallpaper": "Change Wallpaper",
    };

    if (!title || typeof title !== "string") {
      console.error("Invalid menu title.");
      return null;
    }

    console.log(`Selected: ${title}`);
    return contentMap[title] || null;
  };

  // Function to handle going back to the previous menu
  handleGoBack = () => {
    const { navigationStack, showMenu, selectedIndex } = this.state;
    if (!showMenu) {
      this.setState({ showMenu: true });
      return;
    }

    if (navigationStack.length > 0) {
      // Pop the last menu from the stack and set it as the current menu
      const previousMenu = navigationStack.pop();
      const menuLength = previousMenu.length;
      const newIndex = menuLength > selectedIndex ? selectedIndex : 0;
      console.log("Going back to the previous menu", previousMenu);
      this.setState({
        currentMenu: previousMenu,
        navigationStack,
        selectedIndex: newIndex,
      });
    }
  };

  handleMenu = () => {
    const { navigationStack } = this.state;
    if (navigationStack.length > 0) {
      this.handleGoBack();
    } else {
      this.setState((prevState) => ({
        showMenu: !prevState.showMenu,
        displayContent: "Menu",
      }));
    }
  };

  // Function to handle circular menu rotation based on the angle of rotation selectedIndex is updated and the selected Index should be positive

  handleRotation = (rotationAngle) => {
    const { currentMenu } = this.state;

    // Ensure currentMenu is not empty to avoid division-by-zero errors
    const totalItems = currentMenu.length;
    if (totalItems === 0) return;

    // Normalize rotation angle to the range [0, 360)
    const normalizedAngle = ((rotationAngle % 360) + 360) % 360;

    // Calculate the selected index based on the normalized angle
    const itemAngle = 360 / totalItems; // Angle per menu item
    let selectedIndex = Math.floor(
      (normalizedAngle + itemAngle / 2) / itemAngle
    );

    // Wrap around to ensure index is within valid range
    selectedIndex = selectedIndex % totalItems;

    // Update the state with the calculated index
    this.setState({ selectedIndex });
  };

  togglePlayPause = () => {
    const { audioElement } = this.state;

    if (!audioElement) return; // Ensure audioElement is initialized

    this.setState((prevState) => {
      if (prevState.isPlaying) {
        audioElement.pause();
        clearInterval(prevState.intervalId); // Clear interval when paused
      } else {
        audioElement.play();
        const intervalId = setInterval(this.updateProgress, 1000); // Start interval when playing
        return { intervalId, isPlaying: true }; // Update intervalId and isPlaying
      }
      return { isPlaying: false }; // Update isPlaying to false when paused
    });
  };

  updateProgress = () => {
    const { audioElement } = this.state;
    if (!audioElement) return;

    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration;

    // Format time in MM:SS
    const formattedCurrentTime = this.formatTime(currentTime);
    const formattedDuration = this.formatTime(duration);

    this.setState({
      currentTime: formattedCurrentTime,
      audioDuration: formattedDuration,
      audioProgress: (currentTime / duration) * 100, // Update progress bar
    });
  };

  formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  playNext = () => {
    const { selectedIndex, audioElement, currentMenu } = this.state;
    if (audioElement) audioElement.pause();
    const newIndex = (selectedIndex + 1) % currentMenu.length;
    const newAudio = new Audio(currentMenu[newIndex].audio);
    newAudio.play();

    this.setState({
      selectedIndex: newIndex,
      audioElement: newAudio,
      isPlaying: true,
    });
  };

  playPrevious = () => {
    const { selectedIndex, audioElement, currentMenu } = this.state;
    if (audioElement) audioElement.pause();
    const newIndex =
      (selectedIndex - 1 + currentMenu.length) % currentMenu.length;
    const newAudio = new Audio(currentMenu[newIndex].audio);
    newAudio.play();

    this.setState({
      selectedIndex: newIndex,
      audioElement: newAudio,
      isPlaying: true,
    });
  };

  forward = () => {
    const { audioElement } = this.state;
    console.log(audioElement);

    if (
      audioElement &&
      isFinite(audioElement.currentTime) &&
      isFinite(audioElement.duration)
    ) {
      // Safely update the current time
      audioElement.currentTime = Math.min(
        audioElement.currentTime + 10,
        audioElement.duration
      );

      // Update the current time state with a formatted string
      this.setState({
        currentTime: this.formatTime(audioElement.currentTime),
      });
    } else {
      console.error("Invalid audio element or time/duration values");
    }
  };

  backward = () => {
    const { audioElement } = this.state;

    if (
      audioElement &&
      isFinite(audioElement.currentTime) &&
      isFinite(audioElement.duration)
    ) {
      // Safely update the current time
      audioElement.currentTime = Math.max(audioElement.currentTime - 10, 0);

      // Update the current time state with a formatted string
      this.setState({
        currentTime: this.formatTime(audioElement.currentTime),
      });
    } else {
      console.error("Invalid audio element or time/duration values");
    }
  };

  componentWillUnmount() {
    const { audioElement, intervalId } = this.state;
    if (audioElement) {
      audioElement.pause();
    }
    if (intervalId) {
      clearInterval(intervalId); // Clear the interval when the component is unmounted
    }
    this.setState({
      audioElement: null,
      currentTime: this.formatTime(0),
      audioDuration: this.formatTime(0),
    });
  }

  render() {
    const {
      menu,
      showMenu,
      currentMenu,
      selectedIndex,
      isPlaying,
      currentSongIndex,
      displayContent,
      audioDuration,
      currentTime,
      audioProgress,
      audioElement,
      bg,
    } = this.state;
    return (
      <IpodCase
        menu={menu}
        showMenu={showMenu}
        currentMenu={currentMenu}
        selectedIndex={selectedIndex}
        displayContent={displayContent}
        handleMenu={this.handleMenu}
        handleRotation={this.handleRotation}
        handleMenuSelect={this.handleMenuSelect}
        isPlaying={isPlaying}
        currentSongIndex={currentSongIndex}
        audioDuration={audioDuration}
        currentTime={currentTime}
        audioProgress={audioProgress}
        audioElement={audioElement}
        playNext={this.playNext}
        playPrevious={this.playPrevious}
        togglePlayPause={this.togglePlayPause}
        forward={this.forward}
        backward={this.backward}
        handleWallpaper={bg}
      />
    );
  }
}

export default App;
