class LibraryPagePuzzle extends Phaser.Scene {
  constructor() {
      super('LibraryPagePuzzle');
  }
 

  preload() {
      // this.load.image('boat', './assets/boat/woodboat.png');
      // this.load.image('background', './assets/bg.jpeg'); 
  }

  create() {
      this.w = this.cameras.main.width;
      this.h = this.cameras.main.height;
      let currentPage = 0;
      let currentPiece = 0;
      let piece1 = this.add.rectangle(this.w*0.2,this.h*0.2,this.w*0.2, this.h*0.3, 0xff0000)
        .setInteractive()
        .on('pointerdown', () => {
          currentPiece = 1;
          this.checkPage(currentPiece, currentPage)
          console.log("placing page");
        });
      let piece2 = this.add.rectangle(this.w*0.2,this.h*0.52,this.w*0.2, this.h*0.3, 0xff0000)
        .setInteractive()
          .on('pointerdown', () => {
            currentPiece = 2;
            this.checkPage(currentPiece, currentPage)
            console.log("placing page");
          });
      let piece3 = this.add.rectangle(this.w*0.42,this.h*0.2,this.w*0.2, this.h*0.3, 0xff0000);
      let piece4 = this.add.rectangle(this.w*0.42,this.h*0.52,this.w*0.2, this.h*0.3, 0xff0000);
      let piece5 = this.add.rectangle(this.w*0.64,this.h*0.2,this.w*0.2, this.h*0.3, 0xff0000);
      let piece6 = this.add.rectangle(this.w*0.64,this.h*0.52,this.w*0.2, this.h*0.3, 0xff0000);

      let page1 = this.add.rectangle(this.w*0.1,this.h*0.85,this.w*0.15, this.h*0.25, 0xffff00)
        .setInteractive()
        .on('pointerdown', () => {
            currentPage = page1;
            console.log("select the right tile");
        });
    
  } 
  update() {    }

  checkPage(piece, page) {
    if (piece == 1) {
      page.x = this.w*0.2;
      page.y = this.h*0.2;
    }
    else if (piece == 2) {
      page.x = this.w*0.2;
      page.y = this.h*0.52;
    }
  }
}

/*
class Timer extends Phaser.Scene {
    constructor() {
        super('timer');
        this.shakeDuration = 500; // Duration of the shake in milliseconds
        this.shakeIntensity = 0.05; // Intensity of the shake (0.0 - 1.0)
        this.shakeTimer = 0;
    }
   

    preload() {
        // this.load.image('boat', './assets/boat/woodboat.png');
        // this.load.image('background', './assets/bg.jpeg'); 
    }

    create() {
        this.cameras.main.setPosition(0, 0);

        this.add.rectangle(100,100,100,100,0xff00ff);
        // 10 seconds timer
        var timerText = this.add.text(400, 300, '10', { font: '48px Arial', fill: '#ffffff' });
        timerText.setOrigin(0.5);
      
        var timer = this.time.addEvent({
          delay: 1000, // 1 second
          repeat: 2, // Repeat 9 more times (10 in total)
          callback: updateTimer,
          callbackScope: this,
        });
      
        function updateTimer() {
          var remainingTime = timer.repeatCount;
          timerText.setText(remainingTime);
          if (remainingTime <= 0) {
            timerComplete();
          }
        }
      
        function timerComplete() {
            this.cameras.main.shake(200, 1);
            console.log("here");
            timerText.setText('Timer complete!');
          // Do something when the timer completes
        }
      
    } 
    update() {    }
}
*/