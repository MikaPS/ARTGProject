class Title extends Phaser.Scene {
    constructor() {
        super('Title');
    }

    preload() {
        this.load.image('bg', './assets/titlePage.png'); 
        this.load.image('bgText', './assets/titleText.png'); 
    }

    create() {
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;

        this.bg = this.add.image(this.w*0.5,this.h*0.5, "bg").setScale(1.35);
        this.bgText = this.add.image(this.w*0.5,this.h*0.15, "bgText").setAlpha(0).setOrigin(0.5);
        this.tweens.add({
          targets: this.bgText,
          alpha: 1,
          delay: 100,
          duration: 2000,
      });

        this.startTextButton = this.add.rectangle(this.w*0.5,this.h*0.4,this.w*0.15, this.h*0.1, 0xf9a084)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          this.cameras.main.fade(400, 0,0,0);
          this.time.delayedCall(400, () => this.scene.start('TownHall'));
        });
        this.startText = this.add.text(this.w*0.5, this.h*0.4, "Start", {
          fill: '#ffffff',
          fontFamily: 'Spartan'
        }).setFontSize(50).setOrigin(0.5);
        this.tweens.add({
          targets: this.startText,
          alpha: { from: 0, to: 1 },
          duration: 2000, 
          ease: 'Linear',
          repeat: 0, 
          yoyo: false 
      });
        this.tweens.add({
          targets: this.startTextButton,
          alpha: { from: 0, to: 1 },
          duration: 2000, 
          ease: 'Linear',
          repeat: 0, 
          yoyo: false 
    });

        this.creditTextButton = this.add.rectangle(this.w*0.5,this.h*0.6,this.w*0.15, this.h*0.1, 0xf9a084)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          this.cameras.main.fade(400, 0,0,0);
          this.time.delayedCall(400, () => this.scene.start('Credits'));
        });
        this.creditText = this.add.text(this.w*0.5, this.h*0.6, "Credits", {
          fill: '#ffffff',
          fontFamily: 'Spartan'
        }).setFontSize(50).setOrigin(0.5);
        this.tweens.add({
          targets: this.creditText,
          alpha: { from: 0, to: 1 },
          duration: 2000, 
          ease: 'Linear',
          repeat: 0, 
          yoyo: false 
      });
        this.tweens.add({
          targets: this.creditTextButton,
          alpha: { from: 0, to: 1 },
          duration: 2000, 
          ease: 'Linear',
          repeat: 0, 
          yoyo: false 
    });

  }
}

class Credits extends Phaser.Scene {
  constructor() {
      super("Credits");
  }
  preload() {
    this.load.image('bg', './assets/titlePage.png'); 
    this.load.image('bgText', './assets/titleText.png'); 
}

  create() {
    this.w = this.cameras.main.width;
    this.h = this.cameras.main.height;

    this.bg = this.add.image(this.w*0.5,this.h*0.5, "bg").setScale(1.35);

    this.add.text(400, 100, "Main Coder: Mika Peer Shalem\nSupport Coder: Regis Pak\nMain Artist: Yize Ma\nSupprt Artist: Jinhao Pan", {
      fontFamily: 'Spartan'
    }).setFontSize(90);

    this.startTextButton = this.add.rectangle(this.w*0.5,this.h*0.8,this.w*0.15, this.h*0.1, 0xf9a084)
    .setInteractive({useHandCursor: true})
    .on('pointerdown', () => {
      this.cameras.main.fade(400, 0,0,0);
      this.time.delayedCall(400, () => this.scene.start('TownHall'));
    });
    this.startText = this.add.text(this.w*0.5, this.h*0.8, "Start", {
      fill: '#ffffff',
      fontFamily: 'Spartan'
    }).setFontSize(50).setOrigin(0.5);
    
    
  }
  
}