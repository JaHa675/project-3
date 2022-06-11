
import Phaser from "phaser";
import mainBackground from "../assets/backgrounds/MainBackground.png"
import mainFloor from "../assets/backgrounds/MainFloor.png"
import mainPlatform from "../assets/backgrounds/MainFloor.png"
import mage from "../assets/characters/Mage.png"
import warrior from "../assets/characters/Warrior.png"
// import ground from "../assets/backgrounds/BattleOption4ground.png"
import door from "../assets/backgrounds/My project (7).png"
import DahliaScene from "./dahliaBoss"
import JamesScene from "./jamesBoss"
import LucasScene from "./lucasBoss"
import CatScene from "./catbBoss"
import CatDoors from "./finalBossDoors"
import House from "./playerHouse"
import eventsCenter from '../scripts/EventEmitter'
import Dialogue from '../assets/extras/charDialogue1.png'
// import React, {useEffect,useState} from 'react';

var player;
var platforms;
var cursors;
var doors;
var door1;
var dialogueImage;

var firstPlayDahlia = true;

let dahliaBossDefeated = false;
var firstPlayCat = true;
let catBossDefeated = false;
var firstPlayBrooke = true;
let brookeBossDefeated = false;
var firstPlayJames = true;
let jamesBossDefeated = false;
var firstPlayLucas = true;
let lucasBossDefeated = false;
var firstPlayHouse = true;
let houseBossDefeated = false;
// var safeHouse;
var timedEvent;
// MAIN acts as the directory for the other scenes

class Mains extends Phaser.Scene {
    constructor() {
        super('Mains')
    }
    init(data) {
        this.charClass = data.charClass;
        this.character_name = data.character_name;
        this.level = data.level;
    }

    preload() {
        this.load.image('mainBackground', mainBackground)
        this.load.image('door', door)
        this.load.spritesheet('mage', mage, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('warrior', warrior, { frameWidth: 48, frameHeight: 48 });
        this.load.image("mainFloor", mainFloor)
        this.load.image("mainPlatform", mainPlatform)
        this.load.image("charDialogue", Dialogue)
    }
    create() {
        this.character = ""
        // create a background 
        dialogueImage = this.add.image(400, 100, 'charDialogue').setScale(.6).setDepth(.5)
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 800, 'mainPlatform').refreshBody();
        platforms.create(400, 540, 'mainFloor').refreshBody();
        
      

        const layer =this.add.layer();
        console.log(layer);
        // adding the background image as a layer above the floor

        layer.add(this.make.image({x:400, y:500, key:'mainBackground'},false).setScale(1.5));


        // adding the door to the game 
        doors = this.physics.add.staticGroup();
        door1 = this.physics.add.staticGroup();

        let doorX = 70;
        for (let i = 0; i < 5; i++) {
            var door = doors.create(doorX, 300, 'door').refreshBody().setScale(.3).setInteractive();
            door.on('pointerdown', function (pointer) {
                console.log("this");
                console.log(this);
                console.log("pointer")
                console.log(pointer);
                switch (this.x) {
                    case 70:
                        {
                            DahliaRoom();
                            break;
                        }
                    case 235:
                        {
                            BrookeRoom();
                            break;
                        }
                    case 400:
                        {
                            JamesRoom();
                            break;
                        }
                    case 565:
                        {
                            LucasRoom()
                            break;
                        }
                    case 730:
                        {
                            HouseRoom()
                            break;
                        }

                    default:
                        break;
                }
            });
            doorX += 165;
        }

        // add inputEnabled = true
        
        player = this.physics.add.sprite(350, 200, `${this.charClass}`).setScale(2);
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.setDataEnabled();
        player.data.set('class', this.charClass);
        player.data.set('level', this.level);
        player.data.set('character_name', this.character_name);

        // getting the player to render 
        const mage = () => {
            console.log('before')
            player.setTexture('mage');
            console.log('after')
        }
        const warrior = () => {
            console.log(this.charClass)
            console.log('before function warrior')
            player.setTexture('warrior');
            console.log('after function warrior')
        }
        if (player.data.get('class') === 'mage') {
            console.log('before')
            mage();
            console.log('after')
        } else {
            console.log('before if statement warrior')
            warrior();
            console.log('after if statement warrior')
        }

        // getting a ground to render on the bottom
        // let groundX = this.sys.game.config.width / 3;
        // let groundY = this.sys.game.config.height * .95;
        // let ground = this.physics.add.image(groundX, groundY, "ground");
        // ground.displayWidth = this.sys.game.config.width * 1.0;
        // ground.setBounce(0);
        // ground.setImmovable();
        // ground.setCollideWorldBounds(true);


        // player changing to right left and center positions
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
        door1.on('pointerdown', function (pointer) {

            console.log("clicked door 1")

        });



        // EVENT EMITTER LISTENERS
        eventsCenter.on('dahlia-defeated', this.dahliaDefeated, this)


        // Scene change handler currently on key, needs to be on press or bound conditionally (i.e. character position on a door)
        //  Please leave console logs for testing purposes as the game grows
        cursors = this.input.keyboard.createCursorKeys();
        let DahliaRoom = () => {
            const dahliaDoorText = this.add.text(280, 200, 'Fight Dahlia?!', { fontSize: '30px', fill: 'black', backgroundColor: 'lightgrey' })
            timedEvent = this.time.delayedCall(1500, dgOnEvent, [], this);
            function dgOnEvent() {
                dahliaDoorText.setText('')
                this.scene.start('Dahlias')
                this.scene.launch('BattleLog')
                firstPlayDahlia = false;
            }
            if (firstPlayDahlia !== false) {
                this.input.on('click',dgOnEvent)
                console.log("input A test", firstPlayDahlia);
            } else if (dahliaBossDefeated === false && firstPlayDahlia === false) {
                console.log(dahliaBossDefeated)
                this.scene.switch('Dahlias')
                this.scene.launch('BattleLog')
            }
        };
        let CatRoom = () => {
            //   console.log(firstPlay, dahliaBossDefeated)
            if (firstPlayCat !== false) {
                firstPlayCat = false;
                console.log("input A test", firstPlayCat);
                this.scene.start('Cats')
            } else if (catBossDefeated === false && firstPlayCat === false) {
                console.log(catBossDefeated)
                this.scene.switch('Cats')
            }
        };
        let BrookeRoom = () => {
            const brookeDoorText = this.add.text(280, 200, 'Fight Brooke?!', { fontSize: '30px', fill: 'black', backgroundColor: 'lightgrey' })
            timedEvent = this.time.delayedCall(1500, blOnEvent, [], this);
            function blOnEvent() {
                brookeDoorText.setText('')
                this.scene.start('Brookes')
                this.scene.launch('BattleLog')
                firstPlayBrooke = false;
            }
            if (firstPlayBrooke !== false) {
                this.input.on('click',blOnEvent)
                console.log("input A test", firstPlayBrooke);
            } else if (brookeBossDefeated === false && firstPlayBrooke === false) {
                console.log(brookeBossDefeated)
                this.scene.switch('Brookes')
                this.scene.launch('BattleLog')
            }
        };
        let JamesRoom = () => {
            const jamesDoorText = this.add.text(280, 200, 'Fight James?!', { fontSize: '30px', fill: 'black', backgroundColor: 'lightgrey' })
            timedEvent = this.time.delayedCall(1500, jhOnEvent, [], this);
            function jhOnEvent() {
                jamesDoorText.setText('')
                this.scene.start('Jamess')
                this.scene.launch('BattleLog')
                firstPlayJames = false;
            }
            if (firstPlayJames !== false) {
                this.input.on('click',jhOnEvent)
                console.log("input A test", firstPlayJames);
            } else if (jamesBossDefeated === false && firstPlayJames === false) {
                console.log(jamesBossDefeated)
                this.scene.switch('Jamess')
                this.scene.launch('BattleLog')
            }
        };
        let LucasRoom = () => {
            const lucasDoorText = this.add.text(280, 200, 'Fight Lucas?!', { fontSize: '30px', fill: 'black', backgroundColor: 'lightgrey' })
            timedEvent = this.time.delayedCall(1500, lrOnEvent, [], this);
            function lrOnEvent() {
                lucasDoorText.setText('')
                this.scene.start('Lucass')
                this.scene.launch('BattleLog')
                firstPlayLucas = false;
            }
            if (firstPlayLucas !== false) {
                this.input.on('click', lrOnEvent)
                console.log("input A test", firstPlayLucas);
            } else if (lucasBossDefeated === false && firstPlayLucas === false) {
                console.log(lucasBossDefeated)
                this.scene.switch('Lucass')
                this.scene.launch('BattleLog')
            }
        };
        let HouseRoom = () => {
            const houseDoorText = this.add.text(260, 200, 'Enter your house?', { fontSize: '30px', fill: 'black', backgroundColor: 'lightgrey' })
            timedEvent = this.time.delayedCall(1500, houseOnEvent, [], this);
            function houseOnEvent() {
                houseDoorText.setText('')
                firstPlayHouse = false;
                this.scene.start('House')
            }
            if (firstPlayHouse !== false) {
                this.input.on('click', houseOnEvent)
                console.log("input A test", firstPlayHouse);
            } else if (firstPlayHouse === false) {
                this.scene.switch('House')
            }
        };
        // eventsCenter.on('classSelect', function(playerChange){
        //     player.data.set('class',playerChange);
        //     console.log(player.data);
        // })





        // console.log(dahliaBossDefeated);
        // this is how originally worked ====================================================
        this.input.keyboard.on('keydown-C', () => {
            //   console.log(firstPlay, dahliaBossDefeated)

            if (firstPlayCat !== false) {
                firstPlayCat = false;
                console.log("input A test", firstPlayCat);
                this.scene.start('Cats')
            } else if (catBossDefeated === false && firstPlayCat === false) {
                console.log(dahliaBossDefeated)
                this.scene.switch('Cats')
            }
        })
        this.input.keyboard.on('keydown-F', () => {
            //   console.log(firstPlay, dahliaBossDefeated)
                this.scene.start('CatDoors')
        })
        // ======================================================================================


        // collider only takes in two parameters
        this.physics.add.collider(player, platforms);
        // this.physics.add.collider(player, doors);
        // this.physics.add.collider(boss, platforms);
    }

    dahliaDefeated() {
        dahliaBossDefeated = true;
    }


    updateClass(characterClass) {
        this.player.data.set = ('class', characterClass)
    }

    update() {

        if (cursors.left.isDown) {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }
    }

}

export default Mains