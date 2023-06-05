class FightCult extends Phaser.Scene {
    constructor() {
      super('FightCult');
      this.turn = 0; // 0-player, 1-deity
      this.t = -1;
      this.awake = 100;
      this.count = 0;
    }

    preload() {
        this.load.image('rock', './assets/library/rock.png');
        this.load.image('ground', './assets/townhall/townhall.png');


    }

    create() {
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.cameras.main.setBackgroundColor('#001133');
        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;
        this.add.image(this.w*0.5,this.h*0.5, 'ground').setScale(1.3).setDepth(-1).setAlpha(0.5);

        // enemy
        // let deity = this.add.rectangle(this.w*0.93,this.h*0.12,this.w*0.1, this.w*0.1, 0xff0000);
        //this.add.text(this.w*0.87, this.h*0.05, "Deity ").setFontSize(40);
        this.awakeText = this.add.text(this.w*0.87, this.h*0.1, "Health:\n100%").setFontSize(40);
        // you
        // let player = this.add.rectangle(this.w*0.07,this.h*0.12,this.w*0.1, this.w*0.1, 0xff0000);
        // this.add.text(this.w*0.02, this.h*0.22, "You ").setFontSize(40);
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
        this.instructions = this.add.text(this.w*0.2, this.h*0.22, "You have to stop the diety.\n\nWatch out for rocks and destroy them\nby pressing the button underneath the rock.\n\nAfter destroying the rock, go on the attack.\nPress the right combinations to get it's health below 0 and win\n\n(When you are ready, press the blue button to start)", {
            fontFamily: 'Spartan'
          }).setFontSize(40);
        this.turn1instructions = this.add.text(this.w*0.2, this.h*0.12, "Click the button below the rock to stop it!", {
            fontFamily: 'Spartan'
          }).setFontSize(40).setAlpha(0);

        let blue = this.add.rectangle(this.w*0.2,this.h*0.9,this.w*0.15, this.w*0.1, 0x1f53a6)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.playerActions(1);
            });
        let lightblue = this.add.rectangle(this.w*0.4,this.h*0.9,this.w*0.15, this.w*0.1, 0x75a8fa)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.playerActions(2);
            });
        let gold = this.add.rectangle(this.w*0.6,this.h*0.9,this.w*0.15, this.w*0.1, 0xD4AF37)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.playerActions(3);
            });
        let lightgold = this.add.rectangle(this.w*0.8,this.h*0.9,this.w*0.15, this.w*0.1, 0xFFDF00)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.playerActions(4);
            });

        
        this.xPos = [this.w*0.2, this.w*0.4, this.w*0.6, this.w*0.8];
        this.rock = this.add.image(Phaser.Math.RND.pick(this.xPos),this.h*0.05, 'rock').setAlpha(0);
    }

    update() {
        this.awakeText.setText("Health:\n" + this.awake);
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
            this.scene.start("Lose");
        }
    }

    configureRock(rock) {
        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;
        rock.y = 0.05;
        this.xPos = [this.w*0.2, this.w*0.4, this.w*0.6, this.w*0.8];
        rock.x = Phaser.Math.RND.pick(this.xPos);
    }

    playerActions(touch) {
        if (weapon == 1) {
            this.dmg = 10;
            console.log("YES 1");
        }
        else if (weapon == 2) {
            this.dmg = 5;
            console.log("YES 2");
        }
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


        } else {

            if (this.t == -1) {  
                if (touch == 1) {
                    this.awake -= 5 + this.dmg;
                    this.turn = 1;
                    this.t = 1;
                    this.instructions.setAlpha(0);
                    this.turn1instructions.setAlpha(1);

                }
            }
            if (this.t == 0) {  
                if (touch == 2) {
                    this.awake -= 15 + this.dmg;
                    this.turn = 1;
                    this.t = 1;
                    this.attack1.setAlpha(0);
                    this.turn1instructions.setAlpha(1);

                }
            }
            else if (this.t == 1) {
                
                if (touch == 3) {
                    this.count = 1;
                }
                if (touch == 2) {
                    this.count = 2;
                }
                if (this.count == 2) {
                    this.awake -= 45 + this.dmg;
                    this.turn = 1;
                    this.t = 2;
                    this.count = 0;
                    this.attack2.setAlpha(0);
                    this.turn1instructions.setAlpha(1);

                }
            }
            else if (this.t == 2) {
                if (touch == 1) {
                    this.count = 1;
                }
                if (touch == 3) {
                    this.count = 2;
                }
                if (touch == 4) {
                    this.count = 3;
                }
                if (this.count == 3) {
                    this.awake -= 50 + this.dmg;
                    this.turn = 1;
                    this.t = 3;
                    this.count = 0;
                    this.attack3.setAlpha(0);
                    this.turn1instructions.setAlpha(1);

                }
            }
        }
    }
}