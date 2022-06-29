import React, {useEffect} from 'react';
import Phaser from "phaser";
import housebg from "../assets/backgrounds/Room.png"
import mage from "../assets/characters/Mage.png"
import warrior from "../assets/characters/Warrior.png"
import safeHouseBottom from "../assets/backgrounds/RoomFloor.png"
import floorPlatform from "../assets/backgrounds/RoomPlatform.png"
import catPath from "../assets/extras/catDoor.png"
import CatDoors from "./finalBossDoors"
import KingJoe from "../assets/characters/KingJoe.png"
import MessageBubble from "../assets/extras/MessageBubble.png"
import BackToMain from "../assets/backgrounds/exitToMain.png"
import arrow1 from '../assets/extras/arrow3.png'



var player;
var platforms;
var cursors;
var doors;
var graphics;
var backDoor;

var Joe;
var image;

// var saveTitle;
var saveYes;
var mainDoor;

var arrowLeft;
var arrowLeftFlag;
var arrowRight;
var arrowRightFlag;

class House extends Phaser.Scene {
    constructor () {
        super('House')
    }
    init(data) {
        this.charClass = data.charClass;
        this.character_name = data.character_name;
        this.level = data.level;
    }
    preload () {
        this.load.image('catPath', catPath)
        this.load.image('housebg',housebg);
        this.load.image('safeHouseBottom',safeHouseBottom);
        this.load.image('floorPlatform',floorPlatform);
        this.load.spritesheet('mage', mage, 
        {frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('warrior', warrior,
        { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('KingJoe', KingJoe, {frameWidth: 48, frameHeight: 48});
        this.load.image("arrow", arrow1)

        this.load.image('MessageBubble',MessageBubble)

        this.load.image('BackToMain', BackToMain)

    }
    create () {
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 300, 'safeHouseBottom').setScale(2).refreshBody();
        platforms.create(400, 560, 'floorPlatform').setScale(1.5).refreshBody();

        const layer =this.add.layer();
        console.log(layer);
        // adding the background image as a layer above the floor

        layer.add(this.make.image({x:400, y:400, key:'housebg'},false));

        // layer.add(this.add.text(25, 50, 'Player House', { fontFamily: 'Press Start 2P', fontSize: 300, color: 'goldenrod' }))

        arrowLeft = this.add.image(100, 500, "arrow").setScale(.1).setDepth(6);
        arrowLeft.setInteractive();
        arrowLeft.on('pointerdown', () => {arrowLeftFlag = true; console.log(arrowLeftFlag)});
        arrowLeft.on('pointerup', () => {arrowLeftFlag = false; console.log(arrowLeftFlag)});
        arrowLeft.flipX=true;
        
        arrowRight = this.add.image(225, 500, "arrow").setScale(.1);
        arrowRight.setInteractive();
        arrowRight.on('pointerdown', () => {arrowRightFlag = true; console.log(arrowRightFlag)});
        arrowRight.on('pointerup', () => {arrowRightFlag = false; console.log(arrowRightFlag)});


        Joe =this.add.sprite(600,300,'KingJoe').setScale(2);
        Joe.setInteractive();

        // player = this.physics.add.sprite(350, 100, 'mage').setScale(2);
        // player.setBounce(0.2).setCollideWorldBounds(true);

        player = this.physics.add.sprite(350, 100, `${this.charClass}`).setScale(2);
        player.setBounce(0.2).setCollideWorldBounds(true);


        doors = this.physics.add.staticGroup();
        // creating one door to use for the final boss
        // for (let i=0; i<1; i++) {
        mainDoor = doors.create(90, 180, 'BackToMain').refreshBody().setInteractive().setScale(0.5);
        mainDoor.on('pointerdown', function (pointer) {
            console.log("this")
            console.log(this)
            switch (this.x) {
                case 90: {
                    MainPath();
                    break;
                }
                default:
                    break;
            }
        })
        backDoor =  doors.create(450, 500, 'catPath').refreshBody().setScale(.3).setInteractive();
            backDoor.on('pointerdown', function (pointer) {
                console.log("this");
                console.log(this);
                console.log("pointer");
                console.log(pointer);
                switch (this.x) {
                    case 450: {
                        CatPath()
                        break;
                    }
                    default: 
                        break;
                }
            })
            // saveTitle = this.add.text(580, 480, 'WANT TO SAVE?', { fontFamily: '"Press Start 2P"' });
            // saveYes = this.add.text(700, 505, 'YES', { fontFamily: '"Press Start 2P"' }).setPadding(5).setInteractive();
        // }
        // let groundX = this.sys.game.config.width / 3;
        // // getting a ground to render on the bottom
        // let ground = this.physics.add.image(groundX, groundY, "ground");
        // let groundY = this.sys.game.config.height * .95;
        // ground.setBounce(0);
        // ground.displayWidth = this.sys.game.config.width * 1.0;
        // ground.setCollideWorldBounds(true);
        // ground.setImmovable();
        

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(`${this.charClass}`, { start: 4, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: `${this.charClass}`, frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(`${this.charClass}`, { start: 6, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(player, platforms);

        player.setDataEnabled();

        let MainPath = () => {
            this.scene.start('Mains', { character_name: this.character_name, charClass: this.charClass, level: 1 })
        }

        let CatPath = () => {
            this.scene.start('CatDoors', { character_name: this.character_name, charClass: this.charClass, level: 1 })

    }

        let joeQuotes =[
            "Prett-y prett-y cool",
            "mmm MM mm",
            "ABC. Always Be Coding.",
            "You can do everything 100% right and still fail.",
            "Have you seen my cat?",
            "This is *other* Joe",
            "Let's go with....Salmon",
            "Joegrammers",
            "101 Manatee Jokes",
            "Please don't try to find out where I live. Please.",
            "What specifically is the issue? Include screenshots and code snippets. What steps have you taken to solve said problem?",
            "We're coming to the end of an era.",
            "Snaps for them",
            "Oop I wasn't recording"
        
        ]
        var joeSays = this.add.text(635,280,"",{fontSize:'10px',fontFamily:'"Press Start 2P"', color:'black',wordWrap: { width: 100 }, backgroundColor:'lightgrey'}).setPadding(3)
        image =this.add.image(635,280,'MessageBubble').setScale(0.5).setDepth(-1)

        Joe.on('pointerdown',function (){
            console.log("pushed");
            let randNum = Math.floor(Math.random() * 14) + 1;
            
            
            joeSays.setText(joeQuotes[randNum])
            console.log(joeSays)

        });
        

        // graphics = this.add.graphics();
        }

    
    update () {

        // graphics.lineStyle(2, 0xffffff, 2);
        // graphics.strokeRectShape(saveYes.getBounds());

        if (cursors.left.isDown || arrowLeftFlag === true) 
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown || arrowRightFlag === true)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }
    }
    
}
export default House

