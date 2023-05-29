class LibraryHelpDesk extends Phaser.Scene {
  constructor() {
    super('LibraryHelpDesk');
    this.click = 0;
    this.route = 0;
  }

  preload() {}

  create() {
    this.w = this.cameras.main.width;
    this.h = this.cameras.main.height;
    this.add.rectangle(this.w*0.5, this.h*0.75, this.w*0.9, this.h*0.35, 0x0000ff)
      .setInteractive()
      .on('pointerdown', () => {
        this.click += 1;
      });

        this.help1 = this.add.text(this.w*0.1, this.h*0.73, "What are you looking to find?").setFontSize(60);
        this.answer1 = this.add.text(this.w*0.1, this.h*0.67, "1) How to stop the summoning of the deity?").setFontSize(60).setAlpha(0);
        this.answer2 = this.add.text(this.w*0.1, this.h*0.8, "2) How to fight the deity?").setFontSize(60).setAlpha(0);
        this.help2 = this.add.text(this.w*0.1, this.h*0.73, "Unfortunately, this information is hidden\nfrom the average citizen of Atlantis…").setFontSize(60).setAlpha(0);
        this.help3 = this.add.text(this.w*0.1, this.h*0.73, "If you are determined enough,\nfind the locked books section.").setFontSize(60).setAlpha(0);
        this.help4 = this.add.text(this.w*0.1, this.h*0.73, "Find the red and blue book.").setFontSize(60).setAlpha(0);
        this.help5 = this.add.text(this.w*0.1, this.h*0.73, "Find the green and gold book.").setFontSize(60).setAlpha(0);
    
  
    }
  update() {
    this.changeText();
  }
    
  changeText() {
    if (this.click == 1) {
      this.help1.destroy();
      this.answer1.setAlpha(1).setInteractive()
        .on('pointerdown', () => {
          this.route = 1;
          this.click = 2;
        });
      this.answer2.setAlpha(1).setInteractive()
      .on('pointerdown', () => {
        this.route = 2;
        this.click = 2;
      });
    }
    if (this.click == 2) {
      this.answer1.destroy();
      this.answer2.destroy();
      this.help2.setAlpha(1);
    }
    else if (this.click == 3) {
      this.help2.destroy();
      this.help3.setAlpha(1);
    }
    else if (this.click == 4) {
      this.help3.destroy();
      if (this.route == 1) {
        this.help4.setAlpha(1);
      } else {
        this.help5.setAlpha(1);
      }
    }
  }
}


class LibraryPagePuzzle extends Phaser.Scene {
  constructor() {
      super('LibraryPagePuzzle');
  }
 
  preload() {
      this.load.image('page1', './assets/library/rock.png');
      this.load.image('page2', './assets/library/rock.png');
      this.load.image('page3', './assets/library/rock.png');
      this.load.image('page4', './assets/library/rock.png');
      this.load.image('page5', './assets/library/rock.png');
      this.load.image('page6', './assets/library/rock.png');

  }

  create() {
      this.w = this.cameras.main.width;
      this.h = this.cameras.main.height;
      let currentPage = 0;
      let currentPiece = 0;
      let piece1 = this.add.rectangle(this.w*0.13,this.h*0.18,this.w*0.2, this.h*0.3, 0x000000)
        .setInteractive()
        .on('pointerdown', () => {
          currentPiece = 1;
          this.checkPage(currentPiece, currentPage)
          // console.log("placing page");
          this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0xff0000);
        });
      let piece2 = this.add.rectangle(this.w*0.13,this.h*0.5,this.w*0.2, this.h*0.3, 0x000000)
        .setInteractive()
          .on('pointerdown', () => {
            currentPiece = 2;
            this.checkPage(currentPiece, currentPage)
            // console.log("placing page");
            this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0xff0000);
          });
      let piece3 = this.add.rectangle(this.w*0.35,this.h*0.18,this.w*0.2, this.h*0.3, 0x000000)
        .setInteractive()
        .on('pointerdown', () => {
          currentPiece = 3;
          this.checkPage(currentPiece, currentPage)
          // console.log("placing page");
          this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0xff0000);
        });
      let piece4 = this.add.rectangle(this.w*0.35,this.h*0.5,this.w*0.2, this.h*0.3, 0x000000)
        .setInteractive()
        .on('pointerdown', () => {
          currentPiece = 4;
          this.checkPage(currentPiece, currentPage)
          // console.log("placing page");
          this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0xff0000);
        });
      let piece5 = this.add.rectangle(this.w*0.13,this.h*0.82,this.w*0.2, this.h*0.3, 0x000000)
        .setInteractive()
        .on('pointerdown', () => {
          currentPiece = 5;
          this.checkPage(currentPiece, currentPage)
          // console.log("placing page");
          this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0xff0000);
        });
      let piece6 = this.add.rectangle(this.w*0.35,this.h*0.82,this.w*0.2, this.h*0.3, 0x000000)
        .setInteractive()
        .on('pointerdown', () => {
          currentPiece = 6;
          this.checkPage(currentPiece, currentPage)
          // console.log("placing page");
          this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0xff0000);
        });

      let page1 = this.add.image(this.w*0.57,this.h*0.18, 'page1')
        .setInteractive()
        .on('pointerdown', () => {
            this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0x45fffc);
            currentPage = page1;
            console.log("select the right tile");
        });

      let page2 = this.add.image(this.w*0.57,this.h*0.5, 'page2')
        .setInteractive()
        .on('pointerdown', () => {
          this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0x45fffc);
          currentPage = page2;
            console.log("select the right tile");
        });

      let page3 = this.add.image(this.w*0.75,this.h*0.18, 'page3')
        .setInteractive()
        .on('pointerdown', () => {
          this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0x45fffc);
          currentPage = page3;
            console.log("select the right tile");
        });

      let page4 = this.add.image(this.w*0.75,this.h*0.5, 'page4')
        .setInteractive()
        .on('pointerdown', () => {
          this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0x45fffc);
          currentPage = page4;
            console.log("select the right tile");
        });

      let page5 = this.add.image(this.w*0.57,this.h*0.82, 'page5')
        .setInteractive()
        .on('pointerdown', () => {
          this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0x45fffc);
          currentPage = page5;
            console.log("select the right tile");
        });

      let page6 = this.add.image(this.w*0.75,this.h*0.82, 'page6')
        .setInteractive()
        .on('pointerdown', () => {
          this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0x45fffc);
          currentPage = page6;
            console.log("select the right tile");
        });

      let next = this.add.rectangle(this.w*0.9,this.h*0.5,this.w*0.1, this.h*0.1, 0xffffff)
        .setInteractive()
        .on('pointerdown', () => {
          this.scene.start("LibraryLock");
        });

      let nextText = this.add.text(this.w*0.87, this.h*0.48, "Next", { fill: '#0ff000' }).setFontSize(50);
      
      let restart = this.add.rectangle(this.w*0.9,this.h*0.06,this.w*0.1, this.h*0.1, 0xffffff)
        .setInteractive()
        .on('pointerdown', () => {
          this.scene.restart();
        });
    let restartText = this.add.text(this.w*0.85, this.h*0.04, "Restart?", { fill: '#0ff000' }).setFontSize(40);
  } 
  update() {    }

  highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, color) {
    piece1.setStrokeStyle(5, color);
    piece2.setStrokeStyle(5, color);
    piece3.setStrokeStyle(5, color);
    piece4.setStrokeStyle(5, color);
    piece5.setStrokeStyle(5, color);
    piece6.setStrokeStyle(5, color);
  }

  checkPage(piece, page) {
    if (piece == 1) {
      page.x = this.w*0.13;
      page.y = this.h*0.18;
    }
    else if (piece == 2) {
      page.x = this.w*0.13;
      page.y = this.h*0.5;
    }
    else if (piece == 3) {
      page.x = this.w*0.35;
      page.y = this.h*0.18;
    }
    else if (piece == 4) {
      page.x = this.w*0.35;
      page.y = this.h*0.5;
    }
    else if (piece == 5) {
      page.x = this.w*0.13;
      page.y = this.h*0.82;
    }
    else if (piece == 6) {
      page.x = this.w*0.35;
      page.y = this.h*0.82;
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
            this.current = 1;
            this.scene.start("LibraryPagePuzzle");
          }
          else {
            this.current = 1;
            this.scene.restart();
          }
        });

      let nextText = this.add.text(this.w*0.87, this.h*0.48, "Next", { fill: '#0ff000' }).setFontSize(50);

      let restart = this.add.rectangle(this.w*0.9,this.h*0.06,this.w*0.1, this.h*0.1, 0xffffff)
        .setInteractive()
        .on('pointerdown', () => {
          this.current = 1;
          this.scene.restart();
        });
      let restartText = this.add.text(this.w*0.85, this.h*0.04, "Restart?", { fill: '#0ff000' }).setFontSize(40);
      
      this.correctAnswers[0] = adj1.text;
      this.correctAnswers[1] = adj2.text;
      this.correctAnswers[2] = adj3.text;
      this.correctAnswers[3] = adj4.text;


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
      this.playerAnswers[0] = adj.text;
      this.current += 1;
      adj.x = this.w*0.4;
      adj.y = this.h*0.15;
    } else if (this.current == 2) {
      this.playerAnswers[1] = adj.text;
      this.current += 1;
      adj.x = this.w*0.55;
      adj.y = this.h*0.15;
    } else if (this.current == 3) {
      this.playerAnswers[2] = adj.text;
      this.current += 1;
      adj.x = this.w*0.7;
      adj.y = this.h*0.15;
    } else if (this.current == 4) {
      this.playerAnswers[3] = adj.text;
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