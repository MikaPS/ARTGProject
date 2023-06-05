class Fight extends Phaser.Scene {
    constructor() {
      super('Fight');
      this.turn = 0; // 0-player, 1-deity
      this.t = -1;
      this.awake = 100;
      this.count = 0;
      this.try = 1;
    }

    preload() {
        this.load.image('rock', './assets/library/rock.png');
        this.load.image('bossFight', './assets/Bossfight.png');
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
        this.add.image(this.w*0.5,this.h*0.5, 'bossFight').setScale(1.05).setDepth(-1).setAlpha(0.4);

        // enemy
        this.awakeText = this.add.text(this.w*0.87, this.h*0.1, "Awakeness:\n100%").setFontSize(40);
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
        this.attack4 = this.add.text(this.w*0.2, this.h*0.12, "Click gold, yellow, gold, and yellow!", {
            fontFamily: 'Spartan'
          }).setFontSize(40).setAlpha(0);

        // explain what to do
        this.instructions = this.add.text(this.w*0.22, this.h*0.22, "You have to stop the deity.\n\nWatch out for rocks and destroy them\nby pressing the button underneath the rock.\n\nAfter destroying the rock, go on the attack.\nPress the right combinations to get the awakeness below 0 and win\n\nIt is a memory game, so remember the combo that will be given.\n\nColors: blue, light blue, gold, yellow.\n\n(When you are ready, press the blue button to start)", {
            fontFamily: 'Spartan'
          }).setFontSize(40);
        this.turn1instructions = this.add.text(this.w*0.2, this.h*0.12, "Click the button below the rock to stop it!", {
            fontFamily: 'Spartan'
          }).setFontSize(40).setAlpha(0);

        let blue = this.add.image(this.w*0.2,this.h*0.9,"blue").setScale(0.4)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.playerActions(1);
            });
        let lightblue = this.add.image(this.w*0.4,this.h*0.9, "lightBlue").setScale(0.4)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.playerActions(2);
            });
        let gold = this.add.image(this.w*0.6,this.h*0.9, "gold").setScale(0.4)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.playerActions(3);
            });
        let lightgold = this.add.image(this.w*0.8,this.h*0.9, "yellow").setScale(0.4)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.playerActions(4);
            });

        
        this.xPos = [this.w*0.2, this.w*0.4, this.w*0.6, this.w*0.8];
        this.rock = this.add.image(Phaser.Math.RND.pick(this.xPos),this.h*0.05, 'rock').setAlpha(0);

    }

    update() {
        this.awakeText.setText("Awakeness:\n" + this.awake);
        if (this.turn == 1) {
            if (this.rock.y >= this.h) {
                this.configureRock(this.rock);
                this.turn = 0; 
            }
            this.rock.setAlpha(1);
            this.rock.y += 4;
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
                this.turn = 0;
                this.t = -1;
                this.awake = 100;
                this.count = 0;
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
        this.xPos = [this.w*0.2, this.w*0.4, this.w*0.6, this.w*0.8];
        rock.x = Phaser.Math.RND.pick(this.xPos);
    }

    // touch == which rectangle it clicked
    playerActions(touch) {
        if (weapon == 1) {
            this.dmg = 5;
        }
        else if (weapon == 2) {
            this.dmg = 25;
        }
        // Enemey turn
        if (this.turn == 1) {
            this.turn1instructions.setAlpha(0);
            if (this.rock.x == this.w*0.2 && touch == 1) {
                this.configureRock(this.rock);
                this.rock.setAlpha(0);
                this.turn = 0;
            }
            if (this.rock.x == this.w*0.4 && touch == 2) {
                this.configureRock(this.rock);
                this.rock.setAlpha(0);
                this.turn = 0;
            }
            if (this.rock.x == this.w*0.6 && touch == 3) {
                this.configureRock(this.rock);
                this.rock.setAlpha(0);
                this.turn = 0;
            }
            if (this.rock.x == this.w*0.8 && touch == 4) {
                this.configureRock(this.rock);
                this.rock.setAlpha(0);
                this.turn = 0;
            }
            if (this.t == 0) { this.attack1.setAlpha(1); }
            if (this.t == 1) { this.attack2.setAlpha(1); }
            if (this.t == 2) { this.attack3.setAlpha(1); }
            if (this.t == 3) { this.attack4.setAlpha(1); }

        // Player turn
        } else {
            // First try, instructions say click blue
            if (this.t == -1) {  
                if (touch == 1) {
                    this.awake -= 5 + this.dmg;
                    this.turn = 1;
                    this.t = 0;
                    this.instructions.setAlpha(0);
                    this.turn1instructions.setAlpha(1);
                }
            }
            // Turn 1: click light blue once
            if (this.t == 0) {  
                if (touch == 2) {
                    this.attack1.setAlpha(0);
                    this.awake -= 10 + this.dmg;
                    this.turn = 1;
                    this.t = 1;
                    this.turn1instructions.setAlpha(0);
                }
            }
            // Turn 2: click gold and light blue
            else if (this.t == 1) {
                if (touch == 3) {
                    this.attack2.setAlpha(0);
                    this.count = 1;
                }
                if (touch == 2) {
                    this.count = 2;
                }
                if (this.count == 2) {
                    this.awake -= 15 + this.dmg;
                    this.turn = 1;
                    this.t = 2;
                    this.count = 0;
                    this.turn1instructions.setAlpha(1);

                }
            }
            // Turn 3: click blue, gold, light gold
            else if (this.t == 2) {
                if (touch == 1) {
                    this.attack3.setAlpha(0);
                    this.count = 1;
                }
                if (touch == 3) {
                    this.count = 2;
                }
                if (touch == 4) {
                    this.count = 3;
                }
                if (this.count == 3) {
                    this.awake -= 25 + this.dmg;
                    this.turn = 1;
                    this.t = 3;
                    this.count = 0;
                    this.turn1instructions.setAlpha(1);

                }
            }
            // Turn 4: gold, yellow, gold, yellow
            else if (this.t == 3) {
                if (touch == 3 && this.count == 0) {
                    this.attack4.setAlpha(0);
                    this.count = 1;
                }
                if (touch == 4 && this.count == 1) {
                    this.count = 2;
                }
                if (touch == 3 && this.count == 2) {
                    this.count = 3;
                }
                if (touch == 4 && this.count == 3) {
                    this.count = 4;
                }
                if (this.count == 4) {
                    this.awake -= 30 + this.dmg;
                    this.turn = 1;
                    this.t = 4;
                    this.count = 0;
                    this.turn1instructions.setAlpha(1);

                }
            }
        }
    }
}


class Win extends Phaser.Scene {
    constructor() {
      super('Win');
    }
    preload() {
        this.load.image('winBG', './assets/townhall/townhall.png');
    }
    create() {
        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;

        this.add.text(this.w*0.7, this.h*0.1, "You Won!", {
            fontFamily: 'Spartan'
          }).setFontSize(70);

          this.add.text(this.w*0.6, this.h*0.2, "You stopped the deity on time!", {
            fontFamily: 'Spartan'
          }).setFontSize(50);


          this.add.image(this.w*0.3,this.h*0.5, 'winBG')
          .setScale(1.05).setDepth(-1).setAlpha(1);

          let restart = this.add.rectangle(this.w*0.75,this.h*0.92,this.w*0.15, this.h*0.1, 0xf57542).setAlpha(0.65)
          .setInteractive({useHandCursor: true})
          .on('pointerdown', () => {
             weapon = 1; //1 or 2 depending on what type
             bookType = 0; //1 or 2 depending on what route
             bookCheck = false; 
             wentToRebel = false;
            this.scene.start("Title");
          });
          let restartText = this.add.text(this.w*0.71, this.h*0.9, "RESTART", { fill: '#ffffff' ,fontFamily: 'Spartan'}).setFontSize(40);
  

    }
}

class Lose extends Phaser.Scene {
    constructor() {
      super('Lose');
    }
    preload() {
        this.load.image('badend', './assets/badend.png');

    }
    create() {
        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;

        this.add.text(this.w*0.7, this.h*0.1, "You Lost!", {
            fontFamily: 'Spartan'
          }).setFontSize(70);
        this.add.text(this.w*0.6, this.h*0.2, "You couldn't stop the\ndeity on time.\nThe city is destoryed,\nslowly sinking under the\nwater...", {
            fontFamily: 'Spartan'
          }).setFontSize(50);

        this.add.image(this.w*0.3,this.h*0.5, 'badend').setScale(1.05).setDepth(-1).setAlpha(1);
          let restart = this.add.rectangle(this.w*0.75,this.h*0.92,this.w*0.15, this.h*0.1, 0xf57542).setAlpha(0.65)
          .setInteractive({useHandCursor: true})
          .on('pointerdown', () => {
             weapon = 1; //1 or 2 depending on what type
             bookType = 0; //1 or 2 depending on what route
             bookCheck = false; 
            wentToRebel = false;
            this.scene.start("Title");
          });
          let restartText = this.add.text(this.w*0.71, this.h*0.9, "RESTART", { fill: '#ffffff' ,fontFamily: 'Spartan'}).setFontSize(40);
  
    }
}