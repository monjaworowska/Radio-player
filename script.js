import { radioStations } from "./radioStations.js";
(function () {
  class Player {
    constructor(container) {
      this._audio = container.querySelector("audio");
      this._radioStations = container.querySelector(".radio-stations"); //skala
      this._prev = container.querySelector(".prev");
      this._playPause = container.querySelector(".play-pause");
      this._next = container.querySelector(".next");
      this._radioStationName = container.querySelector(".radio-station-name");
      this._mutedUnmuted = container.querySelector(".muted-unmuted");
      this._volumecontrol = container.querySelector(".volume-control");
      this.assignEventListeners();
    }
  }
  Player.prototype.assignEventListeners = function () {
    this._playPause.addEventListener("click", this._playStation.bind(this));
    this._prev.addEventListener("click", this._prevStation.bind(this));
    this._next.addEventListener("click", this._nextStation.bind(this));
    this._radioStations.addEventListener("input", () => {
      this._changeStation();
      this._playStation();
    });
    this._mutedUnmuted.addEventListener("click", this._muteUnmute.bind(this));
    this._volumecontrol.addEventListener("click", this._volume.bind(this));
  };

  Player.prototype._play = function () {
    this._audio.play();
    this._playPause.classList.remove("play");
    this._playPause.classList.add("paused");
  };
  Player.prototype._pause = function () {
    this._audio.pause();
    this._playPause.classList.remove("paused");
    this._playPause.classList.add("play");
  };
  Player.prototype._changeStation = function () {
    this._audio.src = radioStations[this._radioStations.value].src;
    this._radioStationName.textContent =
      radioStations[this._radioStations.value].name;
  };
  Player.prototype._playStation = function () {
    if (this._audio.paused) {
      this._play();
    } else {
      this._pause();
    }
  };
  Player.prototype._prevStation = function () {
    let current = this._radioStations.value;
    this._radioStations.value = --current;
    this._changeStation();
    this._playStation();
  };
  Player.prototype._nextStation = function () {
    let current = this._radioStations.value;
    this._radioStations.value = ++current;
    this._changeStation();
    this._playStation();
  };
  Player.prototype._mute = function () {
    this._audio.volume = 0;
    this._volumecontrol.value = 0;
    this._mutedUnmuted.classList.remove("unmuted");
    this._mutedUnmuted.classList.add("muted");
  };
  Player.prototype._unmute = function () {
    this._audio.volume = 0.5;
    this._volumecontrol.value = 0.5;
    this._mutedUnmuted.classList.remove("muted");
    this._mutedUnmuted.classList.add("unmuted");
  };
  Player.prototype._muteUnmute = function () {
    this._audio.volume === 0 ? this._unmute() : this._mute();
  };
  Player.prototype._volume = function () {
    if (this._volumecontrol.value == 0) {
      this._mute();
    } else {
      this._audio.volume = this._volumecontrol.value;
      this._mutedUnmuted.classList.remove("muted");
      this._mutedUnmuted.classList.add("unmuted");
    }
  };

  new Player(document.querySelector(".radio-player"));
})();
