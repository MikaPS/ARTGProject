class Armory extends Phaser.Scene {
    constructor() {
        super('Armory');
      }
  
      preload() {
        this.load.image('bg', './assets/armory/Armory.png');  
      }

      create() {
        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;
        this.bg = this.add.image(this.w*0.3, this.h*0.5, "bg").setDepth(1);
        this.add.text(this.w*0.6, this.h*0.1, "The famous armory,\nholding the strongest weapons.\n\nYou can get the one that is\ncurrently in the flame oven.\n\nOr the big sword at the top\nof the wall.\n\nBe careful, the swords\nwould only let worth ones\nhold them.").setFontSize(40);
        this.add.rectangle(this.w*0.28, this.h*0.6, this.w*0.1, this.h*0.1, 0xff0000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
            this.scene.start("QuickWeapon");
        });

        this.add.rectangle(this.w*0.21, this.h*0.15, this.w*0.3, this.h*0.1, 0xff0000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
            this.scene.start("SmartWeapon");
        });

        let restart = this.add.rectangle(this.w*0.91,this.h*0.92,this.w*0.15, this.h*0.1, 0xf57542).setAlpha(0.65)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
            this.bg.setAlpha(0);
            this.scene.start("Map");
        });
        let restartText = this.add.text(this.w*0.89, this.h*0.9, "Map", { fill: '#ffffff' }).setFontSize(40);
      
    
    }
}

class SmartWeapon extends Phaser.Scene {
    constructor() {
      super('SmartWeapon');
      this.score = 0;
      this.click = -1;
    }

    preload() {
        this.load.image('bg', './assets/armory/Armory.png');  
    }

    create() {
        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;
        this.add.image(this.w*0.6, this.h, "bg").setScale(2.2).setAlpha(0.8);

        this.add.rectangle(this.w*0.49, this.h*0.8, this.w*0.9, this.h*0.3, 0xf57542).setAlpha(0.75)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
            this.click += 1;
        });

        this.instructions = this.add.text(this.w*0.05, this.h*0.65, "The Smart Weapons will test you using quick math.\nAnswering correctly on most questions will grant you\nthe weapon.\n\nClick the rectangle to move through the questions, and\nwhen multiple answers are presented, click on the text of\nthe correct one.").setFontSize(50);

        this.question1 = this.add.text(this.w*0.1, this.h*0.78, "224 - 32?").setFontSize(60).setAlpha(0);
        this.answer1a = this.add.text(this.w*0.1, this.h*0.7, "1) 192").setFontSize(60).setAlpha(0);
        this.answer1b = this.add.text(this.w*0.1, this.h*0.85, "2) 182").setFontSize(60).setAlpha(0);

        this.question2 = this.add.text(this.w*0.1, this.h*0.78, "59 * 3?").setFontSize(60).setAlpha(0);
        this.answer2a = this.add.text(this.w*0.1, this.h*0.7, "1) 183").setFontSize(60).setAlpha(0);
        this.answer2b = this.add.text(this.w*0.1, this.h*0.85, "2) 177").setFontSize(60).setAlpha(0);

        this.question3 = this.add.text(this.w*0.1, this.h*0.78, "-12 * (-4) - 35?").setFontSize(60).setAlpha(0);
        this.answer3a = this.add.text(this.w*0.1, this.h*0.7, "1) 13").setFontSize(60).setAlpha(0);
        this.answer3b = this.add.text(this.w*0.1, this.h*0.85, "2) 16").setFontSize(60).setAlpha(0);

        this.win = this.add.text(this.w*0.1, this.h*0.75, "You are smart enough to get the sword!").setFontSize(60).setAlpha(0);
        this.lose = this.add.text(this.w*0.1, this.h*0.75, "The sword doesn't want somone who\ncan't do basic math...").setFontSize(60).setAlpha(0);

    }

    update() {
        if (this.click == 0) {
            this.instructions.destroy();
            this.question1.setAlpha(1);
        }
        if (this.click == 1) {
            this.question1.destroy();
            this.answer1a.setAlpha(1).setInteractive({useHandCursor: true})
                .on('pointerdown', () => {
                this.score = 1;
                this.click = 2;
                });
            this.answer1b.setAlpha(1).setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.click = 2;
            });
        }
        if (this.click == 2) {
            this.answer1a.destroy();
            this.answer1b.destroy();
            this.question2.setAlpha(1);
        }
        if (this.click == 3) {
            this.question2.destroy();
            this.answer2a.setAlpha(1).setInteractive({useHandCursor: true})
                .on('pointerdown', () => {
                this.click = 4;
                });
            this.answer2b.setAlpha(1).setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.click = 4;
                this.score = 2;
            });        
        }
        if (this.click == 4) {
            this.answer2a.destroy();
            this.answer2b.destroy();
            this.question3.setAlpha(1);
        }
        if (this.click == 5) {
            this.question3.destroy();
            this.answer3a.setAlpha(1).setInteractive({useHandCursor: true})
                .on('pointerdown', () => {
                this.click = 6;
                });
            this.answer3b.setAlpha(1).setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.click = 6;
                this.score = 3;
            });        
        }
        if (this.click == 6) {
            this.answer3a.destroy();
            this.answer3b.destroy();
            if (this.score >= 2) {
                weapon = 1;
                this.win.setAlpha(1);
            } else {
                this.lose.setAlpha(1);
            }
            this.click = 7;
        } 
        if (this.click == 7) {
            this.scene.start("Armory");
        }
    }

}

class QuickWeapon extends Phaser.Scene {
    constructor() {
      super('QuickWeapon');
      this.score = 0;
      this.click = 0;
    }

    preload() {
        this.load.image('bg', './assets/armory/Armory.png');  
        this.load.image('quickweapon', './assets/armory/quickweapon.png');  

    }
    create() {
        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;
        this.add.image(this.w*0.5, this.h*0.5, "bg").setScale(1.7).setAlpha(0.5);

        this.target = this.add.image(this.w*0.5, this.h*0.5, "quickweapon")
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
            // this.click += 1;
            this.score += 1;
            // console.log(this.score);
            // this.changeTarget(this.target);
        });

        this.time.addEvent({
            delay: 900, // 1 second
            repeat: 23,
            callback: () => this.changeTarget(this.target),
            callbackScope: this,
        });

        this.time.addEvent({
            delay: 15000, // 1 second
            callback: () => this.end(),
        });
        this.rect = this.add.rectangle(this.w*0.49, this.h*0.85, this.w*0.9, this.h*0.2, 0xf57542).setAlpha(0.65);
        this.instructions = this.add.text(this.w*0.1, this.h*0.8, "The weapon will move around the screen.\nClick it whenever it appears.\nIf you are able to get it 8 times, you will win!").setFontSize(40);
        this.win = this.add.text(this.w*0.1, this.h*0.83, "You are fast enough to get the sword!").setFontSize(60).setAlpha(0);
        this.lose = this.add.text(this.w*0.1, this.h*0.83, "You aren't fast enough to get the sword!").setFontSize(60).setAlpha(0);

    }

    update() {

    }

    end() {
        this.instructions.destroy();
        this.rect.setAlpha(0.65);
        if (this.score >= 8) {
            weapon = 2;
            this.win.setAlpha(1);
            this.target.setAlpha(0);
        } else {
            this.lose.setAlpha(1);
            this.target.setAlpha(0);
        }
        this.time.addEvent({
            delay: 3000, // 1 second
            callback: () => this.scene.start("Armory"),
        });
    }

    changeTarget(target) {
        const x = Math.floor(Math.random() * this.sys.game.config.width);
        const y = Math.floor(Math.random() * this.sys.game.config.height*0.7);
        target.x = x;
        target.y = y;
    }
}