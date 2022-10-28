class Answer {
  constructor(scene, x, y, sprite) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    this.randomSpeed = Math.floor(Phaser.Math.Between(10000, 15000));
    this.swimmingDirection = this.setDirect();

    this.answer = this.getRandomAnswer();
    this.background = this.scene.add.sprite(0, 0, this.sprite);

    this.displayText = this.scene.add
      .text(
        this.background.x + this.background.displayWidth / 2 - 29,
        this.background.y - 80,
        this.answer,
        {
          fontFamily: "LuckiestGuy",
          fontSize: "90px",
          color: "#FFFFFF",
          stroke: "##000000",
          strokeThickness: 10,
          shadow: { blur: 0, stroke: false, fill: false },
        }
      )
      .setOrigin(0.5, 0.5);

    this.container = this.scene.add.container(this.x, this.y, [
      this.background,
      this.displayText,
    ]);
    this.container.setSize(200, 111);
    this.container.setDepth(100);
    this.container.setInteractive();

    this.background.play(this.sprite, true);
    this.container.setScale(0);

    this.respawnAnim();
  }

  getRandomAnswer() {
    return Math.floor(Phaser.Math.Between(0, 9));
  }

  onClick(cb) {
    this.container.on("pointerdown", () => {
      cb();
    });
  }

  move() {
    let x = null;
    if (this.swimmingDirection === "right") {
      this.background.flipX = true;
      this.displayText.x += 20;
      x = 1800;
    } else {
      this.displayText.x -= 20;
      x = 100;
      this.background.flipX = false;
    }

    this.direction = this.scene.tweens.add({
      targets: this.container,
      x: x,
      duration: this.randomSpeed,
      onComplete: () => {
        this.background.flipX = true;
        this.displayText.x += 20;
        this.moveBack(this.swimmingDirection);
      },
    });
  }

  moveBack(swimmingDirection) {
    let x = null;
    if (swimmingDirection === "right") {
      this.displayText.x -= 20;
      x = 100;
      this.background.flipX = false;
    } else {
      this.background.flipX = true;
      this.displayText.x += 20;
      x = 1800;
    }

    this.changedDirection = this.scene.tweens.add({
      targets: this.container,
      x: x,
      duration: this.randomSpeed,
      onComplete: () => {
        this.direction.stop();
        this.background.flipX = false;
        this.displayText.x -= 20;
        this.move();
      },
    });
  }

  respawnAnim() {
    this.scene.tweens.add({
      targets: this.container,
      scale: 1,
      duration: 1000,
    });
  }

  runAway() {
    let x = null;
    this.background.flipX === true ? (x = 2100) : (x = -150);

    this.run = this.scene.tweens.add({
      targets: this.container,
      x: x,
      duration: 500,
      onComplete: () => {},
    });
  }

  dead() {
    this.run.stop();

    this.scene.tweens.add({
      targets: this.container,
      angle: -160,
      scale: 0,
      duration: 400,
    });

    this.scene.tweens.add({
      targets: this.container,
      y: 1500,
      scale: 0,
      duration: 2000,
    });
  }

  setDirect() {
    let randomNumber = Math.floor(Phaser.Math.Between(0, 1));

    let direction = null;
    switch (randomNumber) {
      case 0:
        direction = "right";
        break;
      case 1:
        direction = "left";
        break;
    }
    return direction;
  }
}
