
class TownHall extends Phaser.Scene {
    constructor() {
      super('TownHall');
    }
  
    preload() {
      this.load.image('ground', './assets/townhall/townhall.png');
    }
    create() {
        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;
        this.add.image(this.w*0.3,this.h*0.5, 'ground').setScale(1.05).setDepth(1);
        this.add.text(this.w*0.6, this.h*0.1, "The ruler of Atlantiss\ntarted this meeting to\ndeclare everyone has\nvisitation rights to\nAtlantis.\n\nClick around to see\nreactions of citizens.").setFontSize(50);
        
        this.add.rectangle(this.w*0.3,this.h*0.53,this.w*0.15, this.h*0.2, 0xf57542)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          this.scene.start("RebelGroup");
        });


        let restart = this.add.rectangle(this.w*0.91,this.h*0.92,this.w*0.15, this.h*0.1, 0xf57542).setAlpha(0.65)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          this.scene.start("Map");
        });
        let restartText = this.add.text(this.w*0.89, this.h*0.9, "Map", { fill: '#ffffff' }).setFontSize(40);
      
    }
    update() {}
}

class RebelGroup extends Phaser.Scene {
    constructor() {
      super('RebelGroup');
      this.click = 1;
    }
  
    preload() {
      this.load.image('ground', './assets/townhall/townhall.png');
    }
    create() {
        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;
        this.add.image(this.w*0.5,this.h*0.7, 'ground').setScale(2).setDepth(-1);
        this.add.rectangle(this.w*0.5, this.h*0.8, this.w*0.9, this.h*0.3, 0x0000ff).setAlpha(0.65)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          this.click += 1;
        });
        this.text1 = this.add.text(this.w*0.1, this.h*0.75, "A group of rebels stopped the meeting:\n'Atlantis is a scared place', they say.").setFontSize(50).setAlpha(0);
        this.text2 = this.add.text(this.w*0.1, this.h*0.75, "'We can't let outsiders see the beauty of the city.\nI will summon a deity to sink the city so no one\nwould be able to enter it!'").setFontSize(50).setAlpha(0);
        this.text3 = this.add.text(this.w*0.1, this.h*0.75, "A deity?\nThere has to be something to stop it!\nMaybe visiting the libray and armory will help").setFontSize(50).setAlpha(0);

    }
    update() {
        if (this.click == 1) {
            this.text1.setAlpha(1);
        } else if (this.click == 2) {
            this.text1.destroy();
            this.text2.setAlpha(1);
        } else if (this.click == 3) {
            this.text2.destroy();
            this.text3.setAlpha(1);
        } else if (this.click == 4) {
            this.scene.start("TownHall"); 
        }

    }
}

