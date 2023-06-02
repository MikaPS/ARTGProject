class Map extends Phaser.Scene {
    constructor() {
      super('Map');
    }

    preload() {
        this.load.image('map', './assets/gamemap.jpg');
    }

    create() {
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;
    
        this.add.image(650,550, "map").setScale(1.2).setDepth(1);
        this.cameras.main.setBackgroundColor('#001133');
        this.add.text(1300, 100, "Click on each of the\nplaces to move around\nthe world.", {
            fontFamily: 'Spartan'
          }).setFontSize(40);

        this.add.rectangle(600, 180, 300,350, 0xff0000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.scene.start("Library");
            });

        this.add.rectangle(300, 450, 290,250, 0x00ff00)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.scene.start("Armory");
            });

        this.add.rectangle(940, 460, 320,320, 0x00ff00)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.scene.start("TownHall");
            });

    }
}