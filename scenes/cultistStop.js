class FightCult extends Phaser.Scene {
    constructor() {
      super('FightCult');
      this.turn = 0; // 0-player, 1-deity
      this.t = -1;
      this.awake = 100;
      this.count = 0;
      this.blueCheck = false;
      this.lightBlueheck = false;
      this.goldCheck = false;
    }

    preload() {
        this.load.image('rock', './assets/library/rock.png');
        this.load.image('ground', './assets/townhall/townhall.png');
        this.load.image('yellow', './assets/yellow.png');
        this.load.image('gold', './assets/gold.png');
        this.load.image('lightBlue', './assets/lightBlue.png');
        this.load.image('blue', './assets/blue.png');


    }

    create() {
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.cameras.main.setBackgroundColor('#001133');
        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;
        this.add.image(this.w*0.5,this.h*0.5, 'ground').setScale(1.3).setDepth(-1).setAlpha(0.5);

        // enemy
        this.awakeText = this.add.text(this.w*0.87, this.h*0.1, "Health:\n100%").setFontSize(40);
        // you
        this.attack1 = this.add.text(this.w*0.2, this.h*0.12, "Click the light blue square once!", {
            fontFamily: 'Spartan'
          }).setFontSize(40).setAlpha(0);
        this.attack2 = this.add.text(this.w*0.2, this.h*0.12, "Click gold and then light blue", {
            fontFamily: 'Spartan'
          }).setFontSize(40).setAlpha(0);
        this.attack3 = this.add.text(this.w*0.2, this.h*0.12, "Click blue, gold, and then yellow!", {
            fontFamily: 'Spartan'
          }).setFontSize(40).setAlpha(0);
        // explain what to do
        this.instructions = this.add.text(this.w*0.2, this.h*0.22, "You have to stop the deity.\n\nWatch out for rocks and destroy them\nby pressing the button underneath the rock.\n\nAfter destroying the rock, go on the attack.\nPress the right combinations to get it's health below 0 and win\n\n(When you are ready, press the blue button to start)", {
            fontFamily: 'Spartan'
          }).setFontSize(40);
        this.turn1instructions = this.add.text(this.w*0.2, this.h*0.12, "Click the button below the rock to stop it!", {
            fontFamily: 'Spartan'
          }).setFontSize(40).setAlpha(0);

        this.blue = this.physics.add.image(this.w*0.3,this.h*0.9,"blue").setScale(0.4)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.playerActions(1);
            });
        this.lightblue = this.physics.add.image(this.w*0.5,this.h*0.9,"lightBlue").setScale(0.4)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.playerActions(2);
            });
        this.gold = this.physics.add.image(this.w*0.7,this.h*0.9,"gold").setScale(0.4)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.playerActions(3);
            });

        
        this.xPos = [this.w*0.3, this.w*0.5, this.w*0.7];
        this.rock = this.physics.add.image(Phaser.Math.RND.pick(this.xPos),this.h*0.05, 'rock').setAlpha(0);
       
        this.collideBlue = this.physics.add.collider(this.blue, this.rock, () => {
            this.blueCheck = true;
        });
        this.collideLight = this.physics.add.collider(this.lightblue, this.rock, () => {
            this.lightBlueCheck = true;
        });
        this.physics.add.collider(this.gold, this.rock, () => {
            this.goldCheck = true;
        });
    }

    update() {
        this.awakeText.setText("Health:\n" + this.awake);
        if (this.turn == 1) {
            if (this.rock.y >= this.h) {
                this.configureRock(this.rock);
                this.turn = 0; 
            }
            this.rock.setAlpha(1);
            this.rock.y += 7;
        }
        if (this.turn == 0) {
            if (this.t > -1) {
            this.instructions.setAlpha(0);
            }
            this.rock.setAlpha(0);
        }
        if (this.awake <= 0) {
            this.scene.start("Win");
        }
        if (this.rock.alpha == 1 && this.rock.y >= this.h) {
            this.scene.start("Lose");
        }
    }

    configureRock(rock) {
        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;
        rock.y = 0.05;
        this.xPos = [this.w*0.3, this.w*0.5, this.w*0.7];
        rock.x = Phaser.Math.RND.pick(this.xPos);
    }

    playerActions(touch) {
        if (this.turn == 1) {
            this.turn1instructions.setAlpha(0);
            if (this.rock.x == this.w*0.3 && touch == 1 && this.blueCheck == true) {
                this.configureRock(this.rock);
                this.blueCheck = false;
                this.awake -= 10;
            }
            if (this.rock.x == this.w*0.5 && touch == 2 && this.lightBlueCheck == true) {
                this.configureRock(this.rock);
                this.lightBlueCheck = false;
                this.awake -= 10;

            }
            if (this.rock.x == this.w*0.7 && touch == 3 && this.goldCheck == true ) {
                this.configureRock(this.rock);
                this.goldCheck = false;
                this.awake -= 10;

            }
        } 
        else {
            this.turn = 1;
            this.instructions.setAlpha(0);
            this.turn1instructions.setAlpha(1);
        }
    }
}