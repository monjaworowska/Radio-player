import { radioStations } from "./radioStations.js";
(function () {
  class Player {
    constructor(container) {
      this.audio = container.querySelector("audio");
      this.radioStations = container.querySelector(".radio-stations"); //skala
      this.prev = container.querySelector(".prev");
      this.playPause = container.querySelector(".play-pause");
      this.next = container.querySelector(".next");
      this.radioStationName = container.querySelector(".radio-station-name");
      this.mutedUnmuted = container.querySelector(".muted-unmuted");
      this.volumecontrol = container.querySelector(".volume-control");

      this.playPause.addEventListener("click", this.playStation.bind(this));
      this.prev.addEventListener("click", this.prevStation.bind(this));
      this.next.addEventListener("click", this.nextStation.bind(this));
      this.radioStations.addEventListener("input", () => {
        this.changeStation();
        this.playStation();
      });
      this.mutedUnmuted.addEventListener("click", this.muteUnmute.bind(this));
      this.volumecontrol.addEventListener("click", this.volume.bind(this));
    }

    play = function () {
      this.audio.play();
      this.playPause.classList.remove("play");
      this.playPause.classList.add("paused");
    };
    pause = function () {
      this.audio.pause();
      this.playPause.classList.remove("paused");
      this.playPause.classList.add("play");
    };
    changeStation = function () {
      this.audio.src = radioStations[this.radioStations.value].src;
      this.radioStationName.textContent =
        radioStations[this.radioStations.value].name;
    };
    playStation = function () {
      if (this.audio.paused) {
        this.play();
      } else {
        this.pause();
      }
    };
    prevStation = function () {
      let current = this.radioStations.value;
      this.radioStations.value = --current;
      this.changeStation();
      this.playStation();
    };
    nextStation = function () {
      let current = this.radioStations.value;
      this.radioStations.value = ++current;
      this.changeStation();
      this.playStation();
    };
    mute = function () {
      this.audio.volume = 0;
      this.volumecontrol.value = 0;
      this.mutedUnmuted.classList.remove("unmuted");
      this.mutedUnmuted.classList.add("muted");
    };
    unmute = function () {
      this.audio.volume = 0.5;
      this.volumecontrol.value = 0.5;
      this.mutedUnmuted.classList.remove("muted");
      this.mutedUnmuted.classList.add("unmuted");
    };
    muteUnmute = function () {
      this.audio.volume === 0 ? this.unmute() : this.mute();
    };
    volume = function () {
      if (this.volumecontrol.value == 0) {
        this.mute();
      } else {
        this.audio.volume = this.volumecontrol.value;
        this.mutedUnmuted.classList.remove("muted");
        this.mutedUnmuted.classList.add("unmuted");
      }
    };
  }

  new Player(document.querySelector(".radio-player"));
  new Player(document.querySelector(".radio-player2"));
})();
