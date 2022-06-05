import Phaser from "phaser";
import logoImg from "./assets/backgrounds/BattleOption6.jpg"
import house from "./assets/backgrounds/SafeHouse.png"

class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame")
    }
    preload() {
        this.load.image("logo", logoImg);
        this.load.image("playerHouse",house);
    }
    create() {
        const logo = this.add.image(400, 250, "logo");
    }
}
export default playGame;



