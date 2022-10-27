class Bottle {
  constructor(scene, x, y, sprite) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }
}

class Bottle extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    scene.add.existing(this);
  }
}

class Button extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    scene.add.existing(this);
    this.setOrigin(0, 0);

    this.setInteractive();
  }

  onClick(cb) {
    this.on("pointerdown", () => {
      this.setScale(0.9);
      cb();
    }).on("pointerup", () => this.setScale(1));

    return this;
  }
}
