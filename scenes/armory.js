class SmartWeapon extends Phaser.Scene {
    constructor() {
      super('SmartWeapon');
      this.score = 0;
      this.click = 0;
    }

    prelaod() {}
    create() {
        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;
        this.add.rectangle(this.w*0.5, this.h*0.75, this.w*0.9, this.h*0.35, 0x0000ff)
        .setInteractive()
        .on('pointerdown', () => {
            this.click += 1;
        });

        this.question1 = this.add.text(this.w*0.1, this.h*0.73, "224 - 32?").setFontSize(60);
        this.answer1a = this.add.text(this.w*0.1, this.h*0.67, "1) 192").setFontSize(60).setAlpha(0);
        this.answer1b = this.add.text(this.w*0.1, this.h*0.8, "2) 182").setFontSize(60).setAlpha(0);

        this.question2 = this.add.text(this.w*0.1, this.h*0.73, "59 * 3?").setFontSize(60).setAlpha(0);
        this.answer2a = this.add.text(this.w*0.1, this.h*0.67, "1) 183").setFontSize(60).setAlpha(0);
        this.answer2b = this.add.text(this.w*0.1, this.h*0.8, "2) 177").setFontSize(60).setAlpha(0);

        this.question3 = this.add.text(this.w*0.1, this.h*0.73, "-12 * (-4) - 35?").setFontSize(60).setAlpha(0);
        this.answer3a = this.add.text(this.w*0.1, this.h*0.67, "1) 13").setFontSize(60).setAlpha(0);
        this.answer3b = this.add.text(this.w*0.1, this.h*0.8, "2) 16").setFontSize(60).setAlpha(0);

        this.win = this.add.text(this.w*0.1, this.h*0.73, "You are smart enough to get the sword!").setFontSize(60).setAlpha(0);
        this.lose = this.add.text(this.w*0.1, this.h*0.73, "The sword doesn't want somone who\ncan't do basic math...").setFontSize(60).setAlpha(0);

    }

    update() {
        if (this.click == 1) {
            this.question1.destroy();
            this.answer1a.setAlpha(1).setInteractive()
                .on('pointerdown', () => {
                this.score = 1;
                this.click = 2;
                });
            this.answer1b.setAlpha(1).setInteractive()
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
            this.answer2a.setAlpha(1).setInteractive()
                .on('pointerdown', () => {
                this.click = 4;
                });
            this.answer2b.setAlpha(1).setInteractive()
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
            this.answer3a.setAlpha(1).setInteractive()
                .on('pointerdown', () => {
                this.click = 6;
                });
            this.answer3b.setAlpha(1).setInteractive()
            .on('pointerdown', () => {
                this.click = 6;
                this.score = 3;
            });        
        }
        if (this.click == 6) {
            this.answer3a.destroy();
            this.answer3b.destroy();
            if (this.score >= 2) {
                this.win.setAlpha(1);
            } else {
                this.lose.setAlpha(1);
            }

        }
    }

}