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
    // scene: [Library, LibraryHelpDesk, LibraryLockedDoor,LibraryLock,LibraryBooks, LibraryPagePuzzle, Credits]
    // scene: [TownHall]
    // scene: [Fight, Win, Lose]
    // scene: [Armory, SmartWeapon, QuickWeapon]
    //scene: [LibraryPagePuzzle, Library, TownHall, RebelGroup, Map, Armory, LibraryHelpDesk, LibraryLockedDoor, LibraryLock, LibraryBooks, QuickWeapon, SmartWeapon, Fight, Win, Lose]
    scene: [Title, Credits, TownHall, RebelGroup, Map, Armory, Library, LibraryHelpDesk, LibraryLockedDoor, LibraryLock, LibraryBooks, LibraryPagePuzzle, QuickWeapon, SmartWeapon, Fight, Win, Lose]
};

let game = new Phaser.Game(config);

/*game.global = {
    bookCheck: false,
    bookType: 0,
    weaponType: 0
}*/