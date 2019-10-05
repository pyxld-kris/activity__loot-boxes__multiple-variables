import DevLaunchers from "./classes/dev-launchers";

// Load specific game stuff here that will be used in
// this file, or in 'modify.mjs'
import Chest from "/.DO_NOT_TOUCH/classes/Chest.js";
import Text from "/.DO_NOT_TOUCH/classes/dev-launchers/activities/info/Text";

export function setupActivity(scene) {
  var halfGameWidth = scene.game.config.width / 2;
  var halfGameHeight = scene.game.config.height / 2;

  // Monitor this activity's success conditions
  new DevLaunchers.Activities.ProgressMonitor(scene, function() {});

  scene.activityText = new Text(
    scene,
    Math.floor(scene.game.config.width / 2),
    Math.floor(scene.game.config.height - 30),
    "Set the variables\nto load your\nchests"
  );
  loadModifyCode(scene, () => {
    scene.chestA = this.chest = new Chest(
      scene,
      43,
      halfGameHeight - 5,
      "a",
      scene.a,
      -32
    );
    scene.chestB = this.chest = new Chest(
      scene,
      83,
      halfGameHeight - 5,
      "b",
      scene.b,
      -17
    );
    scene.chestC = this.chest = new Chest(
      scene,
      123,
      halfGameHeight - 5,
      "c",
      scene.c,
      -32
    );

    scene.chestA.on("pointerdown", function() {
      checkAllChestsOpened(scene);
    });
    scene.chestB.on("pointerdown", function() {
      checkAllChestsOpened(scene);
    });
    scene.chestC.on("pointerdown", function() {
      checkAllChestsOpened(scene);
    });

    if (checkAllChestContentsSet(scene)) {
      scene.activityText.setText("Click to open\nyour chests!");
    }
  });
}

function checkAllChestsOpened(scene) {
  if (scene.chestA.isOpened && scene.chestB.isOpened && scene.chestC.isOpened) {
    if (checkAllChestContentsSet(scene)) {
      new DevLaunchers.Activities.Success.Noise(scene);
    }
  }
}
function checkAllChestContentsSet(scene) {
  if (
    scene.chestA.contents != "NOTHING" &&
    scene.chestB.contents != "NOTHING" &&
    scene.chestC.contents != "NOTHING"
  ) {
    return true;
  }
  return false;
}

/***************************/
/* HELPER FUNCTIONS FOLLOW */
/***************************/

/*
 * evalWithinContext()
 * Allows a string of javascript code to be executed within the given scope/context
 * Used after fetching student code in order to run it within the current Phaser scene
 *     (Keeps student coding interface clean)
 */
var evalWithinContext = function(context, code) {
  (function(code) {
    eval(code);
  }.apply(context, [code]));
};

/*
 * loadModifyCode()
 * Loads the 'modify.mjs' file students will be making changes in, and executes it in the
 * current module's scope. We're using this method instead of import to maintain scene scope
 * and keep import/export out of the modify.js script. This makes it more simple for the
 * students to work with.
 */
// Let's load the modify.js script and run it in this scope!
// using this method instead of import to maintain scene scope and keep import/export
//    out of the modify.js script. More simple for students to work with
function loadModifyCode(scene, callback) {
  loadScriptWithinContext("../modify.mjs", scene, callback);
}
function loadScriptWithinContext(path, context, callback) {
  /* eslint-disable */
  let codeText = fetch(path)
    .then(function(response) {
      return response.text();
    })
    .then(function(textString) {
      let modifiedActivityCode = injectIntoModifiedActivityCode(textString);
      evalWithinContext(context, modifiedActivityCode);
      callback();
    });
  /* eslint-enable */
}

function injectIntoModifiedActivityCode(modifiedActivityCode) {
  return modifiedActivityCode;
}
