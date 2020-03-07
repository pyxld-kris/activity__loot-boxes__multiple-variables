import Phaser from "phaser";

// Load specific game stuff here
import Chest from "/.DO_NOT_TOUCH/classes/Chest.js";

/* Lift classes to global scope */
(function() {
  // We have to lift classes we need access to into the
  //   global scope (stupid module scoping issue)
  // This is done so students can code in a clean script file (without
  //    having to use imports/exports, etc.)
  window.Animal = Chest;
})();

export default class PlayScene extends Phaser.Scene {
  preload() {
    this.load.script(
      "webfont",
      "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
    );

    this.load.image("background", "/.DO_NOT_TOUCH/assets/background.png");

    // Load the pet's spritesheet
    this.load.spritesheet(
      "chest",
      "/.DO_NOT_TOUCH/assets/treasure-chest-spritesheet.png",
      {
        frameWidth: 26,
        frameHeight: 20,
        margin: 0,
        spacing: 0
      }
    );
  }

  create() {
    let halfGameWidth = this.game.config.width / 2;
    let halfGameHeight = this.game.config.height / 2;

    // Create sky
    this.background = this.add.sprite(
      halfGameWidth,
      halfGameHeight,
      "background"
    );

    const camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    camera.setBounds(0, 0, this.game.config.width, this.game.config.height);
  }

  update(time, delta) {}

  /* <Begin> helper functions added by Kris */
  //
  //

  addPhysicalRectangle(x, y, width, height, color, alphaIThinkMaybe) {
    // TODO: alphaIThinkMaybe name change
    let rect = this.add.rectangle(x, y, width, height, color, alphaIThinkMaybe);
    rect = this.physics.add.existing(rect, true);

    return rect;
  }

  /* </End> Helper functions added by kris */
}
