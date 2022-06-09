import {Scene} from "phaser"



class Textbox extends Scene {
    constructor() {
        super({
            key: "examples"
        });
    }
    
    content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;
    
    preload() {
        this.load.scenePlugin({
            key: "rexuiplugin",
            url:
            "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
            sceneKey: "rexUI"
        });
        
        this.load.image(
            "nextPage",
            "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png"
            );
        }
        
    create() {
        createTextBox(this, 100, 200, {
            wrapWidth: 400
        }).start(content, 50);
    }
    
    update() { }
}

export default Textbox