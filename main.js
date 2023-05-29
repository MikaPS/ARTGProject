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
    scene: [LibraryInside, LibraryHelpDesk, LibraryLock, LibraryPagePuzzle]
    // scene: [Fight, Win, Lose]
};

let game = new Phaser.Game(config);