class TweenAnimations extends Phaser.Scene {
    constructor() {
        super("tweens");
    }

    // fade in
    fade_in(targets, delay, duration) {
        this.tweens.add({
            targets: targets,
            alpha: 1,
            delay: delay,
            duration: duration,
        });
    }

    // fade out
    fade_out(targets, delay, duration) {
        this.tweens.add({
            targets: targets,
            alpha: 0,
            delay: delay,
            duration: duration,
        });
    }
    // tween for movement
    move(targets, delay, duration, xCoord, yCoord) {
        this.tweens.add({
            targets: targets,
            x: xCoord,
            y: yCoord,
            delay: delay,
            duration: duration,
        });
    }
}