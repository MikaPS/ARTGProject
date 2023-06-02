let weapon = 1;

// main game object
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
    // scene: [Library, LibraryHelpDesk, LibraryLockedDoor,LibraryLock,LibraryBooks, LibraryPagePuzzle]
    // scene: [TownHall]
    // scene: [Fight, Win, Lose]
    // scene: [Armory, SmartWeapon, QuickWeapon]
    //scene: [TownHall, RebelGroup, Map, Armory, Library, LibraryHelpDesk, LibraryLockedDoor, LibraryLock, LibraryBooks, LibraryPagePuzzle, QuickWeapon, SmartWeapon, Fight, Win, Lose]
    scene: [Title, TownHall, RebelGroup, Map, Armory, Library, LibraryHelpDesk, LibraryLockedDoor, LibraryLock, LibraryBooks, LibraryPagePuzzle, QuickWeapon, SmartWeapon, Fight, Win, Lose]
};

let game = new Phaser.Game(config);