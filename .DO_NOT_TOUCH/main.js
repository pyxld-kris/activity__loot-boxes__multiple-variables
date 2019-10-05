import Phaser from "phaser";
import { config } from "./settings/config.js";

const game = new Phaser.Game(config);

/*
 * Import and set up the specific dev launchers activity code
 * to be injected into this game (Helps keep our games and lessons
 * separate)
 */
function setupActivity() {
  var activity = require("./activity-setup.js");
  activity.setupActivity(game.scene.scenes[0]);
}

// When the game is ready, begin setting up the activity
game.events.on("ready", function() {
  /* Only fire scene update event once, so we know the scene is ready
   * (couldn't attach to 'ready' or 'create' scene events for some reason,
   * so used this hack */
  var playScene = game.scene.scenes[0];
  window.sceneUpdateEventListener = playScene.events.on(
    "create",
    setupActivity
  );
});
