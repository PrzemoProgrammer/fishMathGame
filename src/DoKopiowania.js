
    // ! IMAGE / SPRITE /////////
    this.background = this.add
    .image(0, 0, "background")
    .setOrigin(0, 0)
    .setDisplaySize(this.gw, this.gh);
    
    
    
    // ! RANDOM NUMBER ///////////
    this.randomNumber =  Math.floor(Phaser.Math.Between(0, 9))
    
    
    
    // ! ANIMS /////////////////
    this.anims.create({
      key: "cannon",
      frames: "cannon",
      frameRate: 10,
      repeat: 0,
    });
    
    // ? ///////////
    this.penguin.play("penguin-death")
    .once("animationcomplete", () => {
    
    });
    
    // ? ///////////
    .on('animationupdate', (anim, frame) => {   
        this.character.off('animationupdate')
      })


    // ? ///////////
    states.playReverse('frozenState', true)





// ? krótszy zapis ładowania animacji chodzenia w innych skinach//////////
//to w preload /////////
    for (let i = 1; i <= 4; i++) {
      for (let j = 1; j <= 6; j++) {
        this.load.image(
          `Character ${i}${j}`,
          `Walking Character ${i}/0${j}.png`
        );
      }
    }

    //to w create ////////
    for (let i = 1; i <= 4; i++) {
      const frames = [];
      for (let j = 1; j <= 6; j++) {
        frames.push({ key: `Character ${i}${j}`, frame: null });
      }

      const anim = this.anims.create({
        key: `Character ${i} walk`,
        frames,
        frameRate: 20,
      });
    }


    
    
    
    // ! TEXT /////////////////
    this.penguinsLeftText = this.add
      .text(
        this.gw / 2 - 20,
        75,
        "Penguins left: " + this.penguinsToKillCount,
        {
          fontFamily: "LuckiestGuy",
          fontSize: "30px",
          color: "#FF0000",
          stroke: "#000000",
          strokeThickness: 5,
          shadow: { blur: 0, stroke: false, fill: false },
        }
      )
      .setOrigin(0.5);
    
    
    
    // ! SOUND ///////////////

    // ? TO wjebać do preload///////////
    this.load.audio("correctAnswer", "audio/correctAnswer.mp3");


 // ? TO już tam tego///////////
      this.bazookaShootAudio = this.sound.add('bazookaShoot')
      this.bazookaShootAudio.volume = 0.3
    
      // ? ///////////
      this.bazookaShootAudio.play() 
    
      }
    
    
    // ! TIME ///////////////
      setTimeout(() => {
        // this.hudScene.healthBar.getDamage()
     }, 2000);


      //////////////////////////
     this.time.delayedCall(200, () => {

     }
    
     //////////////////////////
     setInterval(func,1000)


    /////////////////////////
    var timer = scene.time.addEvent({
      delay: 500,  
      callback: callback,
      //args: [],
      callbackScope: thisArg,
      loop: true
    });

    // to to ssamo co wyzej tylko jakos lepiej zapisane
    this.time.addEvent({
      delay: 13000,
      callback: () => this.addBanner(),
      loop: true,
    });




    // ! TWEENS ///////////////
    
    this.tweens.add({
      targets: this.banner,
      y: this.gh + this.banner.displayHeight,
      duration: 2500,
      onComplete: () => {
        this.banner.destroy();
      },
    });






    // ! COLLISION ///////////////
        //? ///// DO ARACDE////////////
    
  //////////////////////////////
    this.physics.add.overlap(
      this.mainCar,
      obstacle,
      () => {
        if (this.isGameLost) return;

      }),

  /////////////////////////
    this.physics.add.collider(this.player, junk);




    

// ! BUTTON ///////////////

onClick(cb) {
  this.on("pointerdown", () => {
    this.setScale(0.9);
    cb();
  }).on("pointerup", () => this.setScale(1));

  return this;
}





    
     // ! SCENE ///////////////
    //odwołanie do sceny jak trzeba się do niej odwołać po jakimś czasie (po zrobieni creatów)
     this.hudScene = this.scene.get('HudScene');
    
    // odwołanei do sceny w trzeba się do niej odwołać podczas robienia creatów
     this.hudScene.events.on("create", )
    
    
      this.scene.start("HudScene")



     // ! EMITTER (np padający śnieg) ///////////////

     addSnow() {
      this.particles = this.add.particles("snowFlake");
      this.particles.createEmitter({
        y: 0,
        x: { min: 100, max: this.gw + 300 },
        lifespan: 4000,
        speedY: { min: 100, max: 300 },
        speedX: { min: -100, max: -200 },
        scale: { start: 1.2, end: 0.2 },
        // quantity: 1,
        frequency: 50,
        blendMode: "ADD",
      });
    }



    // ! Imput Text ///////////////

//? wrzucić w preload
 this.load.plugin(
      "rexinputtextplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js",
      true
    );
    this.load.plugin(
      "rexninepatchplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexninepatchplugin.min.js",
      true
    );


//? to juz normlanie w create
    addInputText() {
      const inputbox = this.add.rexNinePatch({
        x: this.operation.container.x + this.operation.displayText.width / 2 + 90,
        y: 80,
        width: 160,
        height: 120,
        key: "inputBox",
        columns: [15, undefined, 15],
        rows: [10, undefined, 10],
      });
  
      console.log(this.operation.displayText.width);
      const inputText = this.add
        .rexInputText({
          x:
            this.operation.container.x +
            this.operation.displayText.width / 2 +
            170,
          y: 90,
          width: 300,
          height: 140,
          type: "textarea",
          placeholder: "",
          fontSize: "100px",
          fontFamily: "LuckiestGuy",
          color: "#ffffff",
          align: "left",
          maxLength: 2,
        })
        .resize(300, 140)
        .on("textchange", ({ text }) => {});
    }






    // ! MOUSE ///////////////

//? MYSZKA ZNIKA Z KERANU
this.input.manager.canvas.style.cursor = "none";


//? MYSZKA ZNIKA Z KERANU I NIE MOZNA NIC KLIKAĆ

  this.input.on(
      "pointerdown",
      function (pointer) {
        console.log(this.input.mouse);
        this.input.mouse.requestPointerLock();
      },
      this
    );


//? PORUSZANIE MYSZKĄ PO EKRANIE Z CURSOREM JAKO IMAGE
this.input.on(
  "pointermove",
  function (pointer) {
    this.celownik.x = pointer.x;
    this.celownik.y = pointer.y;

    // Zapętlanie na ekranie
    this.celownik.x = Phaser.Math.Wrap(this.celownik.x, 0, this.gw);
    this.celownik.y = Phaser.Math.Wrap(this.celownik.y, 0, this.gh);
  },
  this
);





  



    // ! Dodanie phasera z linku ///////////////

    <!DOCTYPE html>
<html>
  <head>
    <script src="//cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js"></script>
  </head>
  <style>
  </style>
  <body>
    <div id="game"></div>
    <script src="./src/scenes/PlayScene.js"></script>
  </body>
</html>






// ! DODANIE CZCIONKI ///////////////

//? Po pierwesze wklej ten plik txt

<!DOCTYPE html>
<html>
  <head>
  </head>
  <style>
    @font-face {
      font-family: "LuckiestGuy";
      src: url("/src/LuckiestGuy.ttf") format("truetype");
    }
    * {
      font-family: "LuckiestGuy";
    }
  </style>
  <body>
    <div id="game"></div>
    <script src="./src/scenes/PlayScene.js"></script>
    <script src="./src/index.js"></script>
  </body>
</html>






// ! FRONTEND ///////////////

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tenis Gra JavaScript</title>
    <style>
        body {
            margin: 0;
            padding: 0; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            height: 100vh; 
            background-color: darkgray; 
        }

   canvas {border: 3px solid #fff
   }
    </style>
</head>
<>
    <div></div>
    <canvas></canvas>
    <script></script>




    // ! PRZESUWANIE OBIEKTU MYSZKĄ ///////////////
    //? To akurat jest metoda jakiejs klasy
    moveable(){
        this.windowContainer.setSize(200, 200);
        this.windowContainer.setInteractive()
        this.scene.input.setDraggable(this.windowContainer);
        this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    }





// ! SKRÓTY ///////////////
this.entity.character.flipX ? this.entity.x : this.entity.x + 10
