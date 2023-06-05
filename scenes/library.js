// check which path


class Library extends Phaser.Scene {
  constructor() {
    super('Library');
    this.typingComplete = false;
    this.text;
    this.textToType = "The library of Atlantis, one of\nthe most treasured places in\nthe universe.\n\nIt has the know-all blue orb,\nthat can help you find what you\nare looking for.";
    this.currentIndex;
  }

  preload() {
    this.load.image('background', './assets/library/LibraryGlimmer.JPG');
  }
  
  
   
  create() {
    this.cameras.main.setBackgroundColor('#001133');
    this.cameras.main.fadeIn(400, 0, 0, 0);
    this.w = this.cameras.main.width;
    this.h = this.cameras.main.height;
    this.bg = this.add.image(this.w*0.3,this.h*0.5, 'background').setScale(1.05).setDepth(1);
    this.text = this.add.text(this.w*0.6, this.h*0.1, "", {
      fontFamily: 'Spartan'
    }).setFontSize(50);
    this.currentIndex = 0;
    this.time.lastCharacterTime = 0;


    this.add.rectangle(this.w*0.355, this.h*0.68, this.w*0.05, this.h*0.1, 0xff0000)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          this.bg.destroy();
          this.scene.start("LibraryHelpDesk");
        });

      this.add.rectangle(this.w*0.3, this.h*0.4, this.w*0.06, this.h*0.5, 0xff0000)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          if(bookType > 0)
          {
            this.bg.destroy();
            this.scene.start("LibraryLockedDoor");
          }
          if (bookType == 0)
          {
            this.text.setText("");
            this.currentIndex = 0;
            this.typingComplete = true;
            this.textToType = "Don't enter something you\ndon't know, check the\nall knowing orb first";
            this.typingComplete = false;
          }
        });

        let restart = this.add.rectangle(this.w*0.91,this.h*0.92,this.w*0.15, this.h*0.1, 0xf57542).setAlpha(0.65)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          this.bg.destroy();
          this.scene.start("Map");
        });
        let restartText = this.add.text(this.w*0.89, this.h*0.9, "Map", { fill: '#ffffff' }).setFontSize(40);
      
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
  }
}


class LibraryHelpDesk extends Phaser.Scene {
  constructor() {
    super('LibraryHelpDesk');
    this.click = 0;
  }

  preload() {
    this.load.image('background', './assets/library/lib.png');
  }

  create() {
    this.cameras.main.setBackgroundColor('#001133');
    this.cameras.main.fadeIn(400, 0, 0, 0);

    this.w = this.cameras.main.width;
    this.h = this.cameras.main.height;
    this.bg = this.add.image(this.w*0.5,this.h*0.1, 'background').setScale(2).setDepth(-1);

    this.add.rectangle(this.w*0.5, this.h*0.75, this.w*0.9, this.h*0.35, 0x0000ff).setAlpha(0.65)
      .setInteractive({useHandCursor: true})
      .on('pointerdown', () => {
        this.click += 1;
      });
      

    this.help1 = this.add.text(this.w*0.1, this.h*0.725, "What are you looking to find?", {
      fontFamily: 'Spartan'
    }).setFontSize(60);
    this.answer1 = this.add.text(this.w*0.1, this.h*0.67, "1) How to stop the summoning of the deity?", {
      fontFamily: 'Spartan'
    }).setFontSize(60).setAlpha(0);
    this.answer2 = this.add.text(this.w*0.1, this.h*0.8, "2) How to fight the deity?", {
      fontFamily: 'Spartan'
    }).setFontSize(60).setAlpha(0);
    this.help2 = this.add.text(this.w*0.1, this.h*0.7, "Unfortunately, this information is hidden\nfrom the average citizen of Atlantis…", {
      fontFamily: 'Spartan'
    }).setFontSize(60).setAlpha(0);
    this.help3 = this.add.text(this.w*0.1, this.h*0.7, "If you are determined enough,\nfind the locked books section.", {
      fontFamily: 'Spartan'
    }).setFontSize(60).setAlpha(0);
    this.help4 = this.add.text(this.w*0.1, this.h*0.73, "Read the turquoise book.", {
      fontFamily: 'Spartan'
    }).setFontSize(60).setAlpha(0);
    this.help5 = this.add.text(this.w*0.1, this.h*0.73, "Read the turquoise book.", {
      fontFamily: 'Spartan'
    }).setFontSize(60).setAlpha(0);
  }

  update() {
    this.changeText();
  }
    
  changeText() {
    if (this.click == 1) {
      this.help1.destroy();
      this.answer1.setAlpha(1).setInteractive({useHandCursor: true}) //1 is stop summon
        .on('pointerdown', () => {
          bookType = 1;
          this.click = 2;
        });
      this.answer2.setAlpha(1).setInteractive({useHandCursor: true}) //2 is fight 
      .on('pointerdown', () => {
        bookType = 2;
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
      if (bookType == 1) {
        this.help4.setAlpha(1);
      } else {
        this.help5.setAlpha(1);
      }
    } else if (this.click ==5) {
      this.bg.destroy();
      this.scene.start("Library");
    }
  }
}


class LibraryPagePuzzle extends Phaser.Scene {
  constructor() {
      super('LibraryPagePuzzle');
  }
 
  preload() {
    if (bookType == 1) { // stop the summoning, book 2
        this.load.image('page1', './assets/library/book2/page1.jpeg');
        this.load.image('page2', './assets/library/book2/page2.jpeg');
        this.load.image('page3', './assets/library/book2/page3.jpeg');
        this.load.image('page4', './assets/library/book2/page4.jpeg');
        this.load.image('page5', './assets/library/book2/page5.jpeg');
        this.load.image('page6', './assets/library/book2/page6.jpeg');
        this.load.image('correct', './assets/library/book2/full_page.jpg');
    } else { // fight, book 1
        this.load.image('page1', './assets/library/book1/page1.jpeg');
        this.load.image('page2', './assets/library/book1/page2.jpeg');
        this.load.image('page3', './assets/library/book1/page3.jpeg');
        this.load.image('page4', './assets/library/book1/page4.jpeg');
        this.load.image('page5', './assets/library/book1/page5.jpeg');
        this.load.image('page6', './assets/library/book1/page6.jpeg');
        this.load.image('correct', './assets/library/book1/full_page.jpg');
    }
      this.load.image('bookshelves', './assets/library/bookshelf_and_books.png');
  }

  create() {
      this.cameras.main.setBackgroundColor('#001133');
      this.cameras.main.fadeIn(400, 0, 0, 0);
      
      this.w = this.cameras.main.width;
      this.h = this.cameras.main.height;

      this.shelves = this.add.image(this.w*0.5, this.h*0.7, "bookshelves").setScale(1.85).setAlpha(0.6);
      this.add.rectangle(this.w*0.49, this.h*0.89, this.w*0.9, this.h*0.2, 0xf57542).setAlpha(0.65);
      this.help1 = this.add.text(this.w*0.06, this.h*0.82, "Oh no! The page is torn and not readable. Match the pieces of the pages on the bottom\nside of the screen in their correct locations on the upper side. Clicking on a page will\nhighlight where it can be placed.", {
        fontFamily: 'Spartan'
      }).setFontSize(48);

      this.correct = this.add.image(this.w*0.675, this.h*0.4, "correct").setDepth(2).setScale(0.35).setAlpha(0);

      this.p1C = false; //Piece 1 Check
      this.p2C = false;
      this.p3C = false;
      this.p4C = false;
      this.p5C = false;
      this.p6C = false;
      this.pC = false; //all pieces checked

      let currentPage = 0;
      let currentPiece = 0;
      let piece1 = this.add.rectangle(this.w*0.13,this.h*0.18,this.w*0.2, this.h*0.3, 0x000000)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          currentPiece = 1;
          this.checkPage(currentPiece, currentPage)
          this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0xff0000);
          if(currentPage == page1)
          {
            this.p1C = true;
          }
          else if (currentPage != page1)
          {
            this.p1C = false;
          }
        });
      let piece2 = this.add.rectangle(this.w*0.13,this.h*0.5,this.w*0.2, this.h*0.3, 0x000000)
        .setInteractive({useHandCursor: true})
          .on('pointerdown', () => {
            currentPiece = 2;
            this.checkPage(currentPiece, currentPage)
            this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0xff0000);
            if(currentPage == page2)
          {
            this.p2C = true;
          }
          else if (currentPage != page2)
          {
            this.p2C = false;
          }
          });
      let piece3 = this.add.rectangle(this.w*0.35,this.h*0.18,this.w*0.2, this.h*0.3, 0x000000)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          currentPiece = 3;
          this.checkPage(currentPiece, currentPage)
          this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0xff0000);
          if(currentPage == page3)
          {
            this.p3C = true;
          }
          else if (currentPage != page3)
          {
            this.p3C = false;
          }
        });
      let piece4 = this.add.rectangle(this.w*0.35,this.h*0.5,this.w*0.2, this.h*0.3, 0x000000)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          currentPiece = 4;
          this.checkPage(currentPiece, currentPage)
          this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0xff0000);
          if(currentPage == page4)
          {
            this.p4C = true;
          }
          else if (currentPage != page4)
          {
            this.p5C = false;
          }
        });
      let piece5 = this.add.rectangle(this.w*0.57,this.h*0.18,this.w*0.2, this.h*0.3, 0x000000)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          currentPiece = 5;
          this.checkPage(currentPiece, currentPage)
          this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0xff0000);
          if(currentPage == page5)
          {
            this.p5C = true;
          }
          else if (currentPage != page5)
          {
            this.p5C = false;
          }
        });
      let piece6 = this.add.rectangle(this.w*0.57,this.h*0.5,this.w*0.2, this.h*0.3, 0x000000)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          currentPiece = 6;
          this.checkPage(currentPiece, currentPage)
          this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0xff0000);
          if(currentPage == page6)
          {
            this.p6C = true;
          }
          else if (currentPage != page6)
          {
            this.p6C = false;
          }
        });

      let page1 = this.add.image(this.w*0.75,this.h*0.14, 'page1').setScale(0.25)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
            this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0x45fffc);
            currentPage = page1;
        });

      let page2 = this.add.image(this.w*0.75,this.h*0.38, 'page2').setScale(0.25)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0x45fffc);
          currentPage = page2;
        });

      let page3 = this.add.image(this.w*0.75,this.h*0.62, 'page3').setScale(0.25)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0x45fffc);
          currentPage = page3;
        });

      let page4 = this.add.image(this.w*0.90,this.h*0.13, 'page4').setScale(0.25)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0x45fffc);
          currentPage = page4;
        });

      let page5 = this.add.image(this.w*0.9,this.h*0.39, 'page5').setScale(0.25)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0x45fffc);
          currentPage = page5;
        });

      let page6 = this.add.image(this.w*0.9,this.h*0.65, 'page6').setScale(0.25)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          this.highlightPuzzle(piece1, piece2, piece3, piece4, piece5, piece6, 0x45fffc);
          currentPage = page6;
        });

        this.click = 1;
      let next = this.add.rectangle(this.w*0.1,this.h*0.72,this.w*0.1, this.h*0.1, 0xf57542).setAlpha(0.65)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          if (this.click==2) {
            this.shelves.destroy();
            this.scene.start("Library");
          }
          if (this.pC) {
            this.correct.setAlpha(1);
            this.click = 2;
            bookCheck = true;
          }
        });

      let nextText = this.add.text(this.w*0.07, this.h*0.7, "Next", { fill: '#ffffff', setFont: 'Spartan' }).setFontSize(50);
      
      let restart = this.add.rectangle(this.w*0.25,this.h*0.72,this.w*0.1, this.h*0.1, 0xf57542).setAlpha(0.65)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          this.shelves.destroy();
          this.scene.restart();
        });
    let restartText = this.add.text(this.w*0.2, this.h*0.7, "Restart?", { fill: '#ffffff', setFont: 'Spartan' }).setFontSize(40);
  } 
  update() {    
      if(this.p1C){
        if(this.p2C){
          if(this.p3C){
            if(this.p4C){
              if(this.p5C){
                if(this.p6C){
                  this.pC = true;
      }}}}}}
      else{
        this.pC = false;
      }
  }

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
      page.x = this.w*0.57;
      page.y = this.h*0.18;
    }
    else if (piece == 6) {
      page.x = this.w*0.57;
      page.y = this.h*0.5;
    }
  }
}

class LibraryLockedDoor extends Phaser.Scene {
  constructor() {
    super('LibraryLockedDoor');
    this.typingComplete = false;
    this.text;
    this.textToType = "You found the hidden chamber of\nthe library. Only true scholars\nwere able to reach it.\n\nClick the door to move inside.";
    this.currentIndex;
  }
  preload() {
    this.load.image('door', './assets/library/lockeddoor.png');
  }
  create() {
    this.cameras.main.fadeIn(400, 0, 0, 0);

    this.cameras.main.setBackgroundColor('#001133');
    this.w = this.cameras.main.width;
    this.h = this.cameras.main.height;
    this.text = this.add.text(this.w*0.6, this.h*0.1, "", {
      fontFamily: 'Spartan'
    }).setFontSize(50);
    this.currentIndex = 0;
    this.time.lastCharacterTime = 0;
    this.door = this.add.image(this.w*0.3,this.h*0.5, "door")
      .setInteractive({useHandCursor: true})
      .on('pointerdown', () => {
        this.door.destroy();
          this.scene.start("LibraryLock")
        });
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
    this.load.image('lock', './assets/library/lock.png');
    this.load.image('bookshelves', './assets/library/bookshelf_and_books.png');
  }

  create() {
    this.cameras.main.fadeIn(400, 0, 0, 0);

    this.cameras.main.setBackgroundColor('#001133');
      this.w = this.cameras.main.width;
      this.h = this.cameras.main.height;
      let lock = this.add.image(this.w*0.12,this.h*0.22, "lock").setScale(1.2);
      this.shelves = this.add.image(this.w*0.5,this.h*0.2, "bookshelves").setAlpha(0.35).setScale(2).setDepth(-1);

      this.add.rectangle(this.w*0.49, this.h*0.85, this.w*0.9, this.h*0.2, 0xf57542).setAlpha(0.65);
      this.help1 = this.add.text(this.w*0.075, this.h*0.77, "You will need to create a key that fits the lock...\nIn four words, how would you describe the lock?\nClick on the words shown above and then 'unlock'", {
        fontFamily: 'Spartan'
      }).setFontSize(48);


      this.add.text(this.w*0.35, this.h*0.05, "Your Selection: ", {
        fontFamily: 'Spartan'
      }).setFontSize(60);
      let adj1 = this.add.text(this.w*0.1,this.h*0.5, "Rusty", {
        fontFamily: 'Spartan'
      }).setFontSize(40); this.adjAttribute(adj1);
      let adj2 = this.add.text(this.w*0.2,this.h*0.5, "New", {
        fontFamily: 'Spartan'
      }).setFontSize(40); this.adjAttribute(adj2);
      let adj3 = this.add.text(this.w*0.3,this.h*0.5, "Gold", {
        fontFamily: 'Spartan'
      }).setFontSize(40); this.adjAttribute(adj3);
      let adj4 = this.add.text(this.w*0.4,this.h*0.5, "Orange", {
        fontFamily: 'Spartan'
      }).setFontSize(40); this.adjAttribute(adj4);
      let adj5 = this.add.text(this.w*0.1,this.h*0.6, "Small", {
        fontFamily: 'Spartan'
      }).setFontSize(40); this.adjAttribute(adj5);
      let adj6 = this.add.text(this.w*0.2,this.h*0.6, "Big", {
        fontFamily: 'Spartan'
      }).setFontSize(40); this.adjAttribute(adj6);
      let adj7 = this.add.text(this.w*0.3,this.h*0.6, "Warm", {
        fontFamily: 'Spartan'
      }).setFontSize(40); this.adjAttribute(adj7);
      let adj8 = this.add.text(this.w*0.4,this.h*0.6, "Cool", {
        fontFamily: 'Spartan'
      }).setFontSize(40); this.adjAttribute(adj8);

      let next = this.add.rectangle(this.w*0.9,this.h*0.5,this.w*0.1, this.h*0.1, 0xf57542).setAlpha(0.65)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          if (this.checkAnswers()) {
            this.current = 1;
            this.shelves.destroy();
            this.scene.start("LibraryBooks");
          }
          else {
            this.current = 1;
            this.scene.restart();
          }
        });

      let nextText = this.add.text(this.w*0.855, this.h*0.48, "Unlock", { fill: '#ffffff', setFont: 'Spartan' }).setFontSize(50);

      let restart = this.add.rectangle(this.w*0.9,this.h*0.06,this.w*0.1, this.h*0.1, 0xf57542).setAlpha(0.65)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          this.current = 1;
          this.scene.restart();
        });
      let restartText = this.add.text(this.w*0.85, this.h*0.04, "Restart?", { fill: '#ffffff', setFont: 'Spartan' }).setFontSize(40);
      
      this.correctAnswers[0] = adj1.text;
      this.correctAnswers[1] = adj4.text;
      this.correctAnswers[2] = adj5.text;
      this.correctAnswers[3] = adj7.text;


  } 
  update() {    }

  adjAttribute(adj) {
    adj.setInteractive({useHandCursor: true})
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
class LibraryBooks extends Phaser.Scene {
  constructor() {
      super('LibraryBooks');
  }
  
  preload() {
    this.load.image('bookshelves', './assets/library/bookshelf_and_books.png');
  }

  create() {
    this.cameras.main.setBackgroundColor('#001133');
    this.cameras.main.fadeIn(400, 0, 0, 0);

    this.w = this.cameras.main.width;
    this.h = this.cameras.main.height;
    this.shelves = this.add.image(this.w*0.5, this.h*0.7, "bookshelves", {
      fontFamily: 'Spartan'
    }).setScale(1.85);

    this.add.rectangle(this.w*0.49, this.h*0.85, this.w*0.9, this.h*0.2, 0x159685).setAlpha(0.75);
    this.help1 = this.add.text(this.w*0.075, this.h*0.8, "Remeber the book the librarian told you to find.\nThe turquoise one.", {
      fontFamily: 'Spartan'
    }).setFontSize(48);

    this.add.rectangle(this.w*0.89, this.h*0.47, this.w*0.06, this.h*0.3, 0xffffff).setInteractive({useHandCursor: true}).setDepth(-1)
      .on('pointerdown', () => {
        this.shelves.destroy();
      this.scene.start("LibraryPagePuzzle");
    });
  }

  update() {}
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