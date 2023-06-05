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
      this.yellowCheck = false;
      this.try = 1;

    }

    preload() {
        this.load.image('rock', './assets/library/rock.png');
        this.load.image('cult', './assets/cultistFight.png');
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
        this.add.image(this.w*0.5,this.h*0.5, 'cult').setScale(1.3).setDepth(-1).setAlpha(0.6);

        // enemy
        this.awakeText = this.add.text(this.w*0.87, this.h*0.1, "Summon:\n100%").setFontSize(40);
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
        this.instructions = this.add.text(this.w*0.2, this.h*0.22, "You have to stop the summoning of the deity.\n\nWatch out em by pressing the button when the\nrock touches it.\n\nPress the right combinations to get the summon below 0% and win.\n\nfor rocks and destroy thColors: blue, light blue, gold, yellow.\n\n(When you are ready, press the blue button to start)", {
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

        this.yellow = this.physics.add.image(this.w*0.9,this.h*0.9,"yellow").setScale(0.4).setAlpha(0)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.playerActions(4);
            });
        this.xPos = [this.w*0.3, this.w*0.5, this.w*0.7];
        if (weapon == 2) { 
            this.yellow.setAlpha(1); 
            this.yellow.x = this.w*0.8;
            this.gold.x = this.w*0.6;
            this.lightblue.x = this.w*0.4;
            this.blue.x = this.w*0.2;
            this.xPos = [this.w*0.2, this.w*0.4, this.w*0.6, this.w*0.8];
        }
        
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

        this.physics.add.collider(this.yellow, this.rock, () => {
            this.yellowCheck = true;
        });
    }

    update() {
        this.awakeText.setText("Summon:\n" + this.awake);
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
            if (this.try <= 3) {
                this.try += 1;
                this.turn = 0; // 0-player, 1-deity
                this.t = -1;
                this.awake = 100;
                this.count = 0;
                this.blueCheck = false;
                this.lightBlueheck = false;
                this.goldCheck = false;
                this.yellowCheck = false;
                this.scene.restart();
            } else {
                this.scene.start("Lose");
            }
        }
    }

    configureRock(rock) {
        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;
        rock.y = 0.05;
        if (weapon == 1) {
            this.xPos = [this.w*0.3, this.w*0.5, this.w*0.7];
        } else {
            this.xPos = [this.w*0.2, this.w*0.4, this.w*0.6, this.w*0.8];
        }
        rock.x = Phaser.Math.RND.pick(this.xPos);
    }

    playerActions(touch) {
        this.dmg = 0;
        if (weapon == 1) { this.dmg = 5; }
        if (this.turn == 1) {
            this.turn1instructions.setAlpha(0);
            if (this.rock.x == this.xPos[0] && touch == 1 && this.blueCheck == true) {
                this.configureRock(this.rock);
                this.blueCheck = false;
                this.awake -= 10 + this.dmg;
            }
            if (this.rock.x == this.xPos[1] && touch == 2 && this.lightBlueCheck == true) {
                this.configureRock(this.rock);
                this.lightBlueCheck = false;
                this.awake -= 10 + this.dmg;

            }
            if (this.rock.x == this.xPos[2] && touch == 3 && this.goldCheck == true ) {
                this.configureRock(this.rock);
                this.goldCheck = false;
                this.awake -= 10 + this.dmg;

            }
            if (this.rock.x == this.xPos[3] && touch == 4 && this.yellowCheck == true ) {
                this.configureRock(this.rock);
                this.yellowCheck = false;
                this.awake -= 10 + this.dmg;
            }
        } 
        else {
            this.turn = 1;
            this.instructions.setAlpha(0);
            this.turn1instructions.setAlpha(1);
        }
    }
}