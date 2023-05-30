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
    // scene: [Library, LibraryHelpDesk, LibraryLockedDoor,LibraryLock, LibraryPagePuzzle]
    // scene: [LibraryPagePuzzle]
    // scene: [Fight, Win, Lose]
    // scene: [Armory, SmartWeapon, QuickWeapon]
    scene: [Map, Armory, Library, LibraryHelpDesk, LibraryLockedDoor, LibraryLock, LibraryPagePuzzle, QuickWeapon, SmartWeapon]
};

let game = new Phaser.Game(config);