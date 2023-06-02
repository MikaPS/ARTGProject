class Title extends TweenAnimations {
    constructor() {
        super('Title');
    }

    preload() {
        this.load.image('bg', './assets/titlePage.png'); 
        this.load.image('bgText', './assets/titleText.png'); 
    }

    create() {
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.bg = this.add.image(960,540, "bg").setScale(1.35);
        this.bgText = this.add.image(900,150, "bgText").setAlpha(0);
        this.fade_in(this.bgText, 100,2000);
    }

    upload() {}
    
    // tween animation for fading in

}