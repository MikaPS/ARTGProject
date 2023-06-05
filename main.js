// main game object
let weapon = 1; //1 or 2 depending on what type
let bookType = 0; //1 or 2 depending on what route
let bookCheck = false; 

let config = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    }, 
    type: Phaser.WEBGL,
    font: {
        custom: {
            families: ['8Bit', 'Spartan'],
            urls: ['./assets/DiaryOfAn8BitMage-IYDD.ttf', './assets/LeagueSpartan.otf']
        }
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    // scene: [LibraryLock,Library, LibraryHelpDesk, LibraryLockedDoor,LibraryBooks, LibraryPagePuzzle, Credits]
    // scene: [TownHall, RebelGroup, Fight, FightCult, Win, Lose]
    scene: [FightCult, Lose, Win]
    // scene: [Armory, SmartWeapon, QuickWeapon]
    // scene: [LibraryPagePuzzle, Library, TownHall, RebelGroup, Map, Armory, LibraryHelpDesk, LibraryLockedDoor, LibraryLock, LibraryBooks, QuickWeapon, SmartWeapon, Fight, Win, Lose]
    // scene: [Title, Credits, TownHall, RebelGroup, Map, Armory, Library, LibraryHelpDesk, LibraryLockedDoor, LibraryLock, LibraryBooks, LibraryPagePuzzle, QuickWeapon, SmartWeapon, FightCult, Fight, Win, Lose]
};

let game = new Phaser.Game(config);