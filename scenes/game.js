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
          this.highlightPuzzle(piece1, piece2, 0xff0000);
        });
      let piece2 = this.add.rectangle(this.w*0.2,this.h*0.52,this.w*0.2, this.h*0.3, 0xff0000)
        .setInteractive()
          .on('pointerdown', () => {
            currentPiece = 2;
            this.checkPage(currentPiece, currentPage)
            console.log("placing page");
            this.highlightPuzzle(piece1, piece2, 0xff0000);
          });
      // let piece3 = this.add.rectangle(this.w*0.42,this.h*0.2,this.w*0.2, this.h*0.3, 0xff0000);
      // let piece4 = this.add.rectangle(this.w*0.42,this.h*0.52,this.w*0.2, this.h*0.3, 0xff0000);
      // let piece5 = this.add.rectangle(this.w*0.64,this.h*0.2,this.w*0.2, this.h*0.3, 0xff0000);
      // let piece6 = this.add.rectangle(this.w*0.64,this.h*0.52,this.w*0.2, this.h*0.3, 0xff0000);

      let page1 = this.add.rectangle(this.w*0.1,this.h*0.85,this.w*0.15, this.h*0.25, 0xffff00)
        .setInteractive()
        .on('pointerdown', () => {
            this.highlightPuzzle(piece1, piece2, 0x45fffc);
            currentPage = page1;
            console.log("select the right tile");
        });

      let page2 = this.add.rectangle(this.w*0.4,this.h*0.85,this.w*0.15, this.h*0.25, 0xffff00)
        .setInteractive()
        .on('pointerdown', () => {
            this.highlightPuzzle(piece1, piece2, 0x45fffc);
            currentPage = page2;
            console.log("select the right tile");
        });

      let next = this.add.rectangle(this.w*0.9,this.h*0.5,this.w*0.1, this.h*0.1, 0xffffff)
        .setInteractive()
        .on('pointerdown', () => {
          this.scene.start("LibraryLock");
        });

      let nextText = this.add.text(this.w*0.87, this.h*0.48, "Next", { fill: '#0ff000' }).setFontSize(50);
    
  } 
  update() {    }

  highlightPuzzle(piece1, piece2, color) {
    piece1.setStrokeStyle(5, color);
    piece2.setStrokeStyle(5, color);

  }

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

class LibraryLock extends Phaser.Scene {
  constructor() {
      super('LibraryLock');
      this.current = 1;
      this.correctAnswers = [0,0,0,0];
      this.playerAnswers = [0,0,0,0];
  }
 
  preload() {
  }

  create() {
    this.cameras.main.setBackgroundColor('#001133');
      this.w = this.cameras.main.width;
      this.h = this.cameras.main.height;
      let lock = this.add.rectangle(this.w*0.2,this.h*0.2,this.w*0.2, this.h*0.3, 0xff0000);

      this.add.text(this.w*0.35, this.h*0.05, "Your Selection: ").setFontSize(60);
      let adj1 = this.add.text(this.w*0.1,this.h*0.5, "Rusty").setFontSize(40); this.adjAttribute(adj1);
      let adj2 = this.add.text(this.w*0.2,this.h*0.5, "New").setFontSize(40); this.adjAttribute(adj2);
      let adj3 = this.add.text(this.w*0.3,this.h*0.5, "Gold").setFontSize(40); this.adjAttribute(adj3);
      let adj4 = this.add.text(this.w*0.4,this.h*0.5, "Green").setFontSize(40); this.adjAttribute(adj4);
      let adj5 = this.add.text(this.w*0.1,this.h*0.6, "Small").setFontSize(40); this.adjAttribute(adj5);
      let adj6 = this.add.text(this.w*0.2,this.h*0.6, "Big").setFontSize(40); this.adjAttribute(adj6);

      let next = this.add.rectangle(this.w*0.9,this.h*0.5,this.w*0.1, this.h*0.1, 0xffffff)
        .setInteractive()
        .on('pointerdown', () => {
          if (this.checkAnswers()) {
            this.scene.start("LibraryPagePuzzle");
          }
          else {
            this.scene.restart();
          }
        });

      let nextText = this.add.text(this.w*0.87, this.h*0.48, "Next", { fill: '#0ff000' }).setFontSize(50);

      // let restart = this.add.rectangle(this.w*0.9,this.h*0.06,this.w*0.1, this.h*0.1, 0xffffff)
      //   .setInteractive()
      //   .on('pointerdown', () => {
      //     this.scene.restart();
      //   });
      // let restartText = this.add.text(this.w*0.85, this.h*0.04, "Restart?", { fill: '#0ff000' }).setFontSize(40);
      
      this.correctAnswers[0] = adj1;
      this.correctAnswers[1] = adj2;
      this.correctAnswers[2] = adj3;
      this.correctAnswers[3] = adj4;


  } 
  update() {    }

  adjAttribute(adj) {
    adj.setInteractive()
      .on('pointerdown', () => {
        this.nextFreeSpace(adj);
      });
  }

  nextFreeSpace(adj) {
    this.w = this.cameras.main.width;
    this.h = this.cameras.main.height;
    if (this.current == 1) {
      this.playerAnswers[0] = adj;
      this.current += 1;
      adj.x = this.w*0.4;
      adj.y = this.h*0.15;
    } else if (this.current == 2) {
      this.playerAnswers[1] = adj;
      this.current += 1;
      adj.x = this.w*0.55;
      adj.y = this.h*0.15;
    } else if (this.current == 3) {
      this.playerAnswers[2] = adj;
      this.current += 1;
      adj.x = this.w*0.7;
      adj.y = this.h*0.15;
    } else if (this.current == 4) {
      this.playerAnswers[3] = adj;
      this.current += 1;
      adj.x = this.w*0.85;
      adj.y = this.h*0.15;
    }
  }
  
  checkAnswers() {
    if (this.correctAnswers.length !== this.playerAnswers.length) {
      return false;
    }
  
    var sortedArray1 = this.correctAnswers.sort();
    var sortedArray2 = this.playerAnswers.sort();
  
    for (var i = 0; i < sortedArray1.length; i++) {
      if (sortedArray1[i] !== sortedArray2[i]) {
        return false;
      }
    }
  
    return true;
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