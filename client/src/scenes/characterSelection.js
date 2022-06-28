
import Phaser, { Scene } from "phaser";
import dgBattle from "../assets/backgrounds/BattleOption5.png"
import warrior from "../assets/characters/Warrior.png"
import Mage from "../assets/characters/Mage.png"
import MainScene from "./main"
import eventsCenter from '../scripts/EventEmitter'
import api from "../utils/API";

var mage;
var platforms;
var cursors;
var graphics;
var mageSelect;
var warriorSelect;
var text6;
let charClass;
//  THIS IS A TEMP ASSIGNED HARD CODED VARIABLE FOR THE CHARACTERS NAME WE SHOULD ADD A WAY FOR THEM TO SET THEIR NAME
let character_name ='tingle'

class CharacterSelection extends Scene {
    constructor() {
        super('charSelect')
    }
    preload() {

        this.load.image('dgBattle', dgBattle)
        this.load.spritesheet('mage', Mage, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('warrior', warrior, { frameWidth: 48, frameHeight: 48 });

    }
    create() {

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 300, 'dgBattle').refreshBody();
        // creating animations for mage to walk in place
        this.anims.create({
            key: 'mageWalk',
            frames: this.anims.generateFrameNumbers('mage', { frames: [0, 1, 2,] }),
            frameRate: 7,
            repeat: -1,
        });
        mage = this.add.sprite(250, 300, 'mage').setScale(3).setInteractive();
        mage.play('mageWalk');
        // creating animations for warrior to walk in place
        this.anims.create({
            key: 'warriorWalk',
            frames: this.anims.generateFrameNumbers('warrior', { frames: [0, 1, 2,] }),
            frameRate: 7,
            repeat: -1,
        });
        warrior = this.add.sprite(550, 300, 'warrior').setScale(3);
        warrior.play('warriorWalk');

        mageSelect = this.add.text(230, 190, 'MAGE', { fontFamily: '"Press Start 2P"' }).setPadding(5).setInteractive();
        warriorSelect = this.add.text(500, 190, 'WARRIOR', { fontFamily: '"Press Start 2P"' }).setPadding(5).setInteractive();
        text6 = this.add.text(120, 80, 'CHARACTER SELECTION:', { fontFamily: '"Press Start 2P', fontSize: '32px' });


        mageSelect.on('pointerdown', function () {
            charClass = 'mage'
            api.createCharacter({ character_name: character_name, class: charClass })
            goToMain();
            console.log(' mage button pushed');
        })
        
        warriorSelect.on('pointerdown', function () {
            charClass = 'warrior'
            api.createCharacter({ character_name: character_name, class: charClass })
            goToMain();
            console.log('warrior button pushed');
        })


        graphics = this.add.graphics();

        cursors = this.input.keyboard.createCursorKeys();
        const goToMain = () => {
            this.scene.start('Mains', { character_name: character_name, charClass: charClass, level: 1 })
        }
        // this.input.keyboard.on('keydown-U', () => {
        //     this.scene.add('main', MainScene, true, {x:800, y:600})
        // }, this);

    }
    update() {
        graphics.lineStyle(2, 0xffffff, 2);
        graphics.strokeRectShape(mageSelect.getBounds());
        graphics.strokeRectShape(warriorSelect.getBounds());
    }
}
export default CharacterSelection;