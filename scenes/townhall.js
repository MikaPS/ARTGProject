let wentToRebel = false;
class TownHall extends Phaser.Scene {
    constructor() {
      super('TownHall');
      this.typingComplete = false;
      this.text;
      this.textToType = "Welcome to Atlantis!\nAs we open up our lands,\nanyone and everyone is allowed\nto come visit Atlantis.\n\nClick around to see\nreactions of citizens.";
      this.currentIndex;
      this.checkCount = false;
    
    }
  
    preload() {
      this.load.image('ground', './assets/townhall/TownhallGlimmer.jpg');
    }
    create() {
        let itemCheck = false;
        if(weapon > 0 && bookCheck)
        {
          itemCheck = true;
        }
        this.cameras.main.setBackgroundColor('#001133');
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;
        this.add.image(this.w*0.3,this.h*0.5, 'ground').setScale(1.05).setDepth(1);
        this.text = this.add.text(this.w*0.625, this.h*0.1, "", {
          fontFamily: 'Spartan'
        }).setFontSize(50);
        this.currentIndex = 0;
        this.time.lastCharacterTime = 0;
        this.typingComplete = false;

        this.add.rectangle(this.w*0.3,this.h*0.53,this.w*0.15, this.h*0.2, 0xf57542) //Middle
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          if(this.CheckCount && !itemCheck)
          {
            this.text.setText("");
            this.currentIndex = 0;
            this.typingComplete = true;
            this.textToType = "You don\'t have time to\nstay here, find something\nthat can stop them!";
            this.typingComplete = false;
          }

          if (!this.CheckCount && !itemCheck)
          {
            wentToRebel = true;
            this.cameras.main.fade(400, 0,0,0);
            this.typingComplete = true;
            this.textToType = "Hurry and try to find\nsomething that can prevent\nthis disaster upon Atlantis!";
            this.time.delayedCall(400, () => this.scene.start('RebelGroup'));
            this.CheckCount = true;
          }

          
          if (itemCheck)
          {
            this.text.setText("");
            this.currentIndex = 0;
            this.typingComplete = true;
            if(bookType == 2)
            {
              this.textToType = "The rebels are gone, but\n left a trail downwards.\nYou should check out the right\nstatue";
            }
            if(bookType == 1)
            {
              this.textToType = "The rebels are gone, but\n left a trail downwards.\nYou should check out the left\nstatue";
            }
            this.typingComplete = false;
          }

        }); 

         this.add.rectangle(this.w*0.505,this.h*0.75,this.w*0.15, this.h*0.45, 0xf57542) //Right Side
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          if (bookCheck == 0)
          {
            this.text.setText("");
            this.currentIndex = 0;
            this.typingComplete = true;
            this.textToType = "There are guards blocking\nthis pathway, come back later";
            this.typingComplete = false;
          }
          if(bookCheck == 2)
          {
            this.cameras.main.fade(400, 0,0,0);
            this.time.delayedCall(400, () => this.scene.start('Fight'));
          }
        });

         this.add.rectangle(this.w*0.096,this.h*0.75,this.w*0.15, this.h*0.45, 0xf57542) //Left Side
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          if (bookCheck == 0)
          {
            this.text.setText("");
            this.currentIndex = 0;
            this.typingComplete = true;
            this.textToType = "There are guards blocking\nthis pathway, come back later";
            this.typingComplete = false;
          }
          if(bookCheck == 1)
          {
            this.cameras.main.fade(400, 0,0,0);
            this.time.delayedCall(400, () => this.scene.start('StopSummon'));
          }
        }); 


        this.restart = this.add.rectangle(this.w*0.91,this.h*0.92,this.w*0.15, this.h*0.1, 0xf57542).setAlpha(0) // 0.65
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          if (wentToRebel == true) {
          this.cameras.main.fade(400, 0,0,0);
          this.time.delayedCall(400, () => this.scene.start('Map'));
          } 
        });
        this.restartText = this.add.text(this.w*0.89, this.h*0.9, "Map", {
          fill: '#ffffff',
          fontFamily: 'Spartan'
        }).setFontSize(40).setAlpha(0);
      
    }
    update(time) { //Text Scroll Speed
      if (!this.typingComplete) {
        // Check if there are characters left to type
        if (this.currentIndex < this.textToType.length) {
          // Add the next character to the text object
          if (time > this.time.lastCharacterTime + 30) {
            this.text.setText(this.text.text + this.textToType[this.currentIndex]);
            this.currentIndex++;
            this.time.lastCharacterTime = time; // Update the last character time
          }
        } else {
          // Typing complete
          this.typingComplete = true;
        }
      }

      if (wentToRebel == true) { 
          this.restart.setAlpha(0.65);
          this.restartText.setAlpha(1);
      }
    }
}


class StopSummon extends Phaser.Scene {
  constructor() {
    super('StopSummon');
  }

  preload() {}
  create() {}
  update() {}

}

class RebelGroup extends Phaser.Scene {
    constructor() {
      super('RebelGroup');
      this.click = 1;
      this.clickCheck = false;
    }
  
    preload() {
      this.load.image('ground', './assets/townhall/townhall.png');
    }
    create() {
      this.cameras.main.setBackgroundColor('#001133');
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;
        this.add.image(this.w*0.5,this.h*0.7, 'ground').setScale(2).setDepth(-1);
        this.add.rectangle(this.w*0.5, this.h*0.8, this.w*0.9, this.h*0.3, 0x0000ff).setAlpha(0.65)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          this.click += 1;
        });
        this.text1 = this.add.text(this.w*0.075, this.h*0.725, 'A group of rebels barge in as everyone freezes\n\n"OPENING UP ATLANTIS IS BLASPHEMY!"', {
          fontFamily: 'Spartan'
        }).setFontSize(50).setAlpha(0);
        this.text2 = this.add.text(this.w*0.075, this.h*0.725, '"We won\'t let anyone just enter in to our sacred lands. Our GOD won\'t accept\nthis, as we bring down his deity to sink the city so no one can enter!"', {
          fontFamily: 'Spartan'
        }).setFontSize(50).setAlpha(0);
        this.text3 = this.add.text(this.w*0.075, this.h*0.725, '"A deity?"\n"There has to be something to stop it!"\n"There has to be something we can find somewhere"', {
          fontFamily: 'Spartan'
        }).setFontSize(50).setAlpha(0);


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


