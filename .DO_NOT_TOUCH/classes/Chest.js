import Phaser from "phaser";

export default class Chest extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, label, contents, yContentsOffset) {
    super(scene, x, y, "chest", 0);
    this.scene = scene;

    this.label = label;
    this.contents = contents;
    this.yContentsOffset = yContentsOffset;

    this.isOpened = false;

    scene.add
      .existing(this)
      .setInteractive()
      .setOrigin(0.5) // fixes interactive offset issue
      .on("pointerdown", (pointer, localX, localY, event) => {
        // When this chest is clicked, let's do something!
        this.anims.play("chest-open", true);
        scene.add
          .text(this.x, this.y + this.yContentsOffset, this.contents, {
            fontSize: "16px",
            fontFamily: '"Press Start 2P"',
            fill: "#ffffff"
          })
          .setScrollFactor(0)
          .setResolution(3) // Makes text more crisp
          .setScale(0.5) // Makes text more crisp
          .setDepth(100)
          .setOrigin(0.5);

        this.isOpened = true;
      });
    /*
    scene.physics.add
      .existing(this)
      .setDrag(500, 0)
      .setMaxVelocity(200, 400)
      .setCollideWorldBounds(true)
      */

    // Create the animations we need from the pet spritesheet
    const anims = scene.anims;
    anims.create({
      key: "chest-closed",
      frames: anims.generateFrameNumbers("chest", { start: 0, end: 0 }),
      frameRate: 1,
      repeat: 0
    });
    anims.create({
      key: "chest-open",
      frames: anims.generateFrameNumbers("chest", { start: 1, end: 1 }),
      frameRate: 1,
      repeat: 0
    });

    this.anims.play("chest-closed", true);

    this.labelText = scene.add
      .text(x, y + 4, label, {
        fontSize: "16px",
        fontFamily: '"Press Start 2P"',
        fill: "#000000"
      })
      .setScrollFactor(0)
      .setResolution(3) // Makes text more crisp
      .setScale(0.5) // Makes text more crisp
      .setDepth(100)
      .setOrigin(0.5);

    // Slight bounce animation, start tween
    setTimeout(() => {
      setInterval(() => {
        scene.tweens.add({
          targets: this,
          y: y - 3,
          duration: 200,
          ease: "Power2",
          yoyo: true,
          repeat: false,
          delay: 1
        });
      }, 1000 + parseInt(Math.random() * 1000));
    }, parseInt(Math.random() * 2000));

    // Make sure the scene calls this object's update function every frame
    this.updateListener = scene.events.on("update", (time, delta) => {
      this.update(time, delta);
    });
  }

  update(time, delta) {}

  destroy() {
    // Remove this object's update listener from the scene
    this.scene.events.removeListener("update", this.updateListener);

    // Call this object's parent class destroy method
    super.destroy();
  }
}
