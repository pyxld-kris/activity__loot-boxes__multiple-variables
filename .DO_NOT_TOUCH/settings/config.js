import Phaser from "phaser";
import PlayScene from "../scenes/PlayScene.js";

export var config = {
  type: Phaser.AUTO,
  width: Math.floor(500 / 3),
  height: Math.floor(300 / 3),
  parent: "game-container",
  pixelArt: true,
  autoRound: false,
  backgroundColor: "#3333AA",
  scene: PlayScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 }
    }
  }
};
