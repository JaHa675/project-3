import Phaser from "phaser";
import logoImg from "../../src/assets/backgrounds/wp8861921-anime-night-forest-wallpapers.jpg"

class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame")
    }
    preload() {
        this.load.image("logo", logoImg);
    }
    create() {
        const logo = this.add.image(400, 250, "logo");
    }
}
export default playGame;



