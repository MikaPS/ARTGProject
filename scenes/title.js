class Title extends TweenAnimations {
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

        this.bg = this.add.image(960,540, "bg").setScale(1.35);
        this.bgText = this.add.image(900,150, "bgText").setAlpha(0);
        this.fade_in(this.bgText, 100,2000);

        this.startTextButton = this.add.rectangle(this.w*0.5,this.h*0.4,this.w*0.15, this.h*0.1, 0xf57542)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          this.cameras.main.fade(400, 0,0,0);
          this.time.delayedCall(400, () => this.scene.start('TownHall'));
        });
        this.startText = this.add.text(this.w*0.5, this.h*0.4, "Start", {
          fill: '#ffffff',
          fontFamily: 'Spartan'
        }).setFontSize(50).setOrigin(0.5);

        this.fade_in(this.startText, 200,2000);
        this.fade_in(this.startTextButton, 100,2000);
    }

    upload() {}
    
    // tween animation for fading in

}