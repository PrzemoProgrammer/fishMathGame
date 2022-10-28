class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  preload() {
    this.load.setPath("./src/assets");
    this.load.image("background", "background.png");
    this.load.image("operationBackground", "operationBackground.png");
    this.load.image("viewfinder", "viewfinder.png");
    this.load.image("full-screen", "full-screen.png");

    this.load.spritesheet("skin1", "skin1.png", {
      frameWidth: 1716 / 10,
      frameHeight: 140,
    });

    this.load.spritesheet("skin2", "skin2.png", {
      frameWidth: 2310 / 10,
      frameHeight: 135,
    });

    this.load.spritesheet("skin3", "skin3.png", {
      frameWidth: 1872 / 9,
      frameHeight: 111,
    });

    this.load.spritesheet("skin4", "skin4.png", {
      frameWidth: 2033 / 10,
      frameHeight: 162,
    });

    this.load.audio("shoot", "audio/shoot.mp3");
    this.load.audio("missClick", "audio/missClick.mp3");
  }

  create() {
    this.gw = this.game.config.width;
    this.gh = this.game.config.height;

    this.answers = [];
    this.score = 0;

    this.anims.create({
      key: "skin-1",
      frames: "skin1",
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: "skin-2",
      frames: "skin2",
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: "skin-3",
      frames: "skin3",
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: "skin-4",
      frames: "skin4",
      frameRate: 15,
      repeat: -1,
    });

    this.addBackground();
    this.addFullScreenButton();
    this.addOperation();
    this.addAnswers();
    this.addScoreText();
    this.addViewfinder();

    this.shootAudio = this.sound.add("shoot");
    this.shootAudio.volume = 0.2;

    this.missClickAudio = this.sound.add("missClick");
  }

  update() {
    if (!this.scale.isFullscreen && !this.fullscreen.active) {
      this.fullscreen.setActive(true);
      this.fullscreen.setVisible(true);
    } else if (this.scale.isFullscreen && this.fullscreen.active) {
      this.fullscreen.setActive(false);
      this.fullscreen.setVisible(false);
    }
  }

  addBackground() {
    this.background = this.add
      .image(0, 0, "background")
      .setOrigin(0, 0)
      .setDisplaySize(this.gw, this.gh);
  }

  addFullScreenButton() {
    this.fullscreen = this.add
      .image(this.gw - 5, 5, "full-screen")
      .setOrigin(1, 0)
      .setScale(2)
      .setDepth(99999);
    this.fullscreen.setInteractive();

    this.fullscreen.on("pointerup", () => {
      this.scale.startFullscreen();
    });
  }

  addOperation() {
    this.operation = new Operation(
      this,
      this.gw / 2,
      this.gh - 1000,
      "operationBackground"
    );
  }

  addViewfinder() {
    this.viewfinder = this.add.image(300, 300, "viewfinder").setDepth(1000);
    this.startViewfinder();
  }

  startViewfinder() {
    this.input.manager.canvas.style.cursor = "none";

    this.input.on(
      "pointermove",
      function (pointer) {
        this.viewfinder.x = pointer.x;
        this.viewfinder.y = pointer.y;
      },
      this
    );
  }

  viewfinderAnim() {
    this.tweens.add({
      targets: this.viewfinder,
      scale: 1.5,
      duration: 100,
      yoyo: true,
    });
  }

  addAnswer(y, sprite) {
    let randomX = Math.floor(Phaser.Math.Between(300, this.gw - 150));

    const answer = new Answer(this, randomX, y, sprite);
    this.answers.push(answer);
    this.setClickAble(answer);
    answer.move();
  }

  addAnswers() {
    for (let i = 0; i <= 3; i++) {
      let sprite = null;

      switch (i) {
        case 0:
          sprite = "skin-1";
          break;
        case 1:
          sprite = "skin-2";
          break;
        case 2:
          sprite = "skin-3";
          break;
        case 3:
          sprite = "skin-4";
          break;
      }
      this.addAnswer(170 * i + 490, sprite);
    }
    this.setCorrectAnswer();
  }

  setClickAble(answer) {
    answer.onClick(() => {
      this.shootAudio.play();
      this.viewfinderAnim();
      this.answers.forEach((answer) => answer.runAway());
      if (
        this.getCutNumber(this.operation.result) ===
        this.getCutNumber(answer.displayText.text)
      ) {
        this.updateScore();
        answer.dead();
        console.log("correct");
      } else {
        this.missClickAudio.play();
        this.resetScore();
        console.log("wrong");
      }
      this.operation.animateMoveBack(() => {
        this.operation.container.destroy();
        this.removeAnswers();
      });

      this.newOperation = setTimeout(() => {
        this.addOperation();
        this.addAnswers();
      }, 2000);
    });
  }

  setCorrectAnswer() {
    let randomIndex = Phaser.Math.Between(0, this.answers.length - 1);
    let operationResult = this.getCutNumber(this.operation.result);
    this.answers[randomIndex].displayText.setText(operationResult);
  }

  getCutNumber(number) {
    return Number(Number(number).toFixed(5));
  }

  removeAnswers() {
    this.answers.forEach((answer) => answer.container.destroy());
    this.answers.length = 0;
  }

  addScoreText() {
    const textConfig = {
      fontFamily: "LuckiestGuy",
      fontSize: "80px",
      color: "#FFFF00",
      stroke: "#000000",
      strokeThickness: 5,
      shadow: { blur: 0, stroke: false, fill: false },
    };

    this.scoreText = this.add
      .text(10, 10, "score " + this.score, textConfig)
      .setOrigin(0, 0);
  }

  updateScore() {
    this.score++;
    this.scoreText.setText("score " + this.score);
  }

  resetScore() {
    this.score = 0;
    this.scoreText.setText("score " + this.score);
  }
}
