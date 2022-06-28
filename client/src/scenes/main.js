// this is just for my extensions to stop yelling at me
/* eslint-disable no-loop-func */

import Phaser from "phaser";
import NavBar from '../components/NavBar'
import mainBackground from "../assets/backgrounds/MainBackground.png"
import mainFloor from "../assets/backgrounds/MainFloor.png"
import mainPlatform from "../assets/backgrounds/MainFloor.png"
import mage from "../assets/characters/Mage.png"
import warrior from "../assets/characters/Warrior.png"
// import ground from "../assets/backgrounds/BattleOption4ground.png"
import door from "../assets/backgrounds/TheDoorResize.png"
import DahliaScene from "./dahliaBoss"
import JamesScene from "./jamesBoss"
import LucasScene from "./lucasBoss"
import CatScene from "./catbBoss"
import CatDoors from "./finalBossDoors"
import House from "./playerHouse"
import eventsCenter from '../scripts/EventEmitter'
import Dialogue from '../assets/extras/charDialogue1.png'
import arrow from '../assets/extras/arrow3.png'
// import { Grid } from "matter";
// import React, {useEffect,useState} from 'react';

var player;
var platforms;
var cursors;
var doors;
var door1;
var dialogueImage;

var arrowLeft;
var arrowLeftFlag;
var arrowRight;
var arrowRightFlag;

var tutorialFlag = true;

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
// var safeHouse;
var timedEvent;
let level = 1;
// MAIN acts as the directory for the other scenes

var color = 0xffffff;
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
        this.load.image("arrow", arrow)
    }
    create() {
        this.character = ""
        // create a background 
        dialogueImage = this.add.image(400, 100, 'charDialogue').setScale(.6).setDepth(.5)
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 800, 'mainPlatform').refreshBody();
        platforms.create(400, 540, 'mainFloor').refreshBody();

        
        cursors = this.input.keyboard.createCursorKeys();
        // A, D movment keys. If we want to include jump need to add a W option
        this.input.keyboard.on('keydown-A', () => {arrowLeftFlag = true})
        this.input.keyboard.on('keyup-A', () => {arrowLeftFlag = false})
        this.input.keyboard.on('keydown-D', () => {arrowRightFlag = true})
        this.input.keyboard.on('keyup-D', () => {arrowRightFlag = false})
        
        // left arrow movement
        arrowLeft = this.add.image(100, 500, "arrow").setScale(.1);
        arrowLeft.setInteractive();
        arrowLeft.on('pointerdown', () => {arrowLeftFlag = true;});
        arrowLeft.on('pointerup', () => {arrowLeftFlag = false;});
        arrowLeft.flipX=true;
        
        // Right arrow movement
        arrowRight = this.add.image(225, 500, "arrow").setScale(.1);
        arrowRight.setInteractive();
        arrowRight.on('pointerdown', () => {arrowRightFlag = true;});
        arrowRight.on('pointerup', () => {arrowRightFlag = false;});
        
        const layer =this.add.layer();
        // console.log(layer);
        // adding the background image as a layer above the floor
        
        layer.add(this.make.image({x:400, y:500, key:'mainBackground'},false).setScale(1.5));
        
        
        // adding the door to the game and function to navigate to scenes
        doors = this.physics.add.staticGroup();
        door1 = this.physics.add.staticGroup();
        
        let doorX = 70;
        for (let i = 0; i < 5; i++) {
            var door = doors.create(doorX, 300, 'door').refreshBody().setScale(1.5).setInteractive();
            //this is just to make one of my extensions not yell at me
            // eslint-disable-next-line no-loop-func
            door.on('pointerdown', function () {
                // console.log("this");
                // console.log(this);
                // console.log("pointer")
                // console.log(pointer);
                // console.log(this.x)
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
        player.data.set('level', level);
        player.data.set('character_name', this.character_name);

        // getting the player to render 
        const mage = () => {

            player.setTexture('mage');

        }
        const warrior = () => {
            console.log(this.charClass)

            player.setTexture('warrior');

        }
        if (player.data.get('class') === 'mage') {

            mage();

        } else {

            warrior();

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
        let DahliaRoom = () => {
            if(!dahliaBossDefeated){
                const dahliaDoorText = this.add.text(280, 110, 'Fight Dahlia?!', { fontSize: '30px', fill: 'black' }).setDepth(4)
                timedEvent = this.time.delayedCall(1500, dgOnEvent, [], this);
                function dgOnEvent() {
                    dahliaDoorText.setText('')
                    this.scene.start('Dahlias', { character_name: this.character_name, charClass: this.charClass, level: level })
                    this.scene.launch('BattleLog')
                    firstPlayDahlia = false;
                }
                if (firstPlayDahlia !== false) {
                    this.input.on('click', dgOnEvent)
                    console.log("input A test", firstPlayDahlia);
                } else if (dahliaBossDefeated === false && firstPlayDahlia === false) {
                    console.log(dahliaBossDefeated)
                    this.scene.start('Dahlias', { character_name: this.character_name, charClass: this.charClass, level: level })
                    this.scene.launch('BattleLog')
                }
            }
        };

        // EVENT EMITTER LISTENERS
        // eventsCenter.on('brooke-defeated', this.brookeDefeated, this)

        let BrookeRoom = () => {
            if(!brookeBossDefeated){
                const brookeDoorText = this.add.text(280, 110, 'Fight Brooke?!', { fontSize: '30px', fill: 'black' }).setDepth(4)
                timedEvent = this.time.delayedCall(1500, blOnEvent, [], this);
                function blOnEvent() {
                    brookeDoorText.setText('')
                    this.scene.start('Brookes', { character_name: this.character_name, charClass: this.charClass, level: level  })
                    this.scene.launch('BattleLog')
                    firstPlayBrooke = false;
                }
                if (firstPlayBrooke !== false) {
                    this.input.on('click', blOnEvent)
                    console.log("input A test", firstPlayBrooke);
                } else if (brookeBossDefeated === false && firstPlayBrooke === false) {
                    console.log(brookeBossDefeated)
                    this.scene.start('Brookes', { character_name: this.character_name, charClass: this.charClass, level: level  })
                    this.scene.launch('BattleLog')
                }
            }
            };

        // EVENT EMITTER LISTENERS
        // eventsCenter.on('jeames-defeated', this.jamesDefeated, this)

        let JamesRoom = () => {
            if(!jamesBossDefeated){
                const jamesDoorText = this.add.text(280, 110, 'Fight James?!', { fontSize: '30px', fill: 'black' }).setDepth(4)
                timedEvent = this.time.delayedCall(1500, jhOnEvent, [], this);
                function jhOnEvent() {
                    jamesDoorText.setText('')
                    this.scene.start('Jamess', { character_name: this.character_name, charClass: this.charClass, level: level })
                    this.scene.launch('BattleLog')
                    firstPlayJames = false;
                }
                if (firstPlayJames !== false) {
                    this.input.on('click', jhOnEvent)
                    console.log("input A test", firstPlayJames);
                } else if (jamesBossDefeated === false && firstPlayJames === false) {
                    console.log(jamesBossDefeated)
                    this.scene.start('Jamess', { character_name: this.character_name, charClass: this.charClass, level: level })
                    this.scene.launch('BattleLog')
                }
            }
        };

        // EVENT EMITTER LISTENERS
        // eventsCenter.on('lucas-defeated', this.lucasDefeated, this)

        let LucasRoom = () => {
            if(!lucasBossDefeated){
                const lucasDoorText = this.add.text(280, 110, 'Fight Lucas?!', { fontSize: '30px', fill: 'black' }).setDepth(4)
                timedEvent = this.time.delayedCall(1500, lrOnEvent, [], this);
                function lrOnEvent() {
                lucasDoorText.setText('')
                this.scene.start('Lucass', { character_name: this.character_name, charClass: this.charClass, level: level })
                this.scene.launch('BattleLog')
                firstPlayLucas = false;
            }
            if (firstPlayLucas !== false) {
                this.input.on('click', lrOnEvent)
                console.log("input A test", firstPlayLucas);
            } else if (firstPlayLucas === false) {
                console.log(lucasBossDefeated)
                this.scene.start('Lucass', { character_name: this.character_name, charClass: this.charClass, level: level })
                this.scene.launch('BattleLog')
            }
        }
        };
        let HouseRoom = () => {
            const houseDoorText = this.add.text(260, 110, 'Enter your house?', { fontSize: '30px', fill: 'black' }).setDepth(4)
            timedEvent = this.time.delayedCall(1500, houseOnEvent, [], this);
            function houseOnEvent() {
                houseDoorText.setText('')
                // firstPlayHouse = false;
                this.scene.start('House', { character_name: this.character_name, charClass: this.charClass, level: level })
            }
            // if (firstPlayHouse !== false) {
            //     this.input.on('click', houseOnEvent)
            //     console.log("input A test", firstPlayHouse);
            // } else if (firstPlayHouse === false) {
                //     this.scene.start('House')
                // }
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
                console.log("input C test", firstPlayCat);
                this.scene.start('Cats', { character_name: this.character_name, charClass: this.charClass, level: 1 })
            } else if (catBossDefeated === false && firstPlayCat === false) {
                console.log(dahliaBossDefeated)
                this.scene.start('Cats', { character_name: this.character_name, charClass: this.charClass, level: 1 })
            }
        })
        this.input.keyboard.on('keydown-F', () => {
            //   console.log(firstPlay, dahliaBossDefeated)
            this.scene.start('CatDoors', { character_name: this.character_name, charClass: this.charClass, level: 1 })
        })
        // ======================================================================================
        
        // collider only takes in two parameters
        this.physics.add.collider(player, platforms);
        // this.physics.add.collider(player, doors);
        // this.physics.add.collider(boss, platforms);
        // player tutorial
        
        function tutorialStart() {
            console.log(dahliaBossDefeated)
             dahliaBossDefeated = true;
            console.log("dg door flag is " + dahliaBossDefeated)
            var tutorialLogs = [
                'Battle Trail Tutorial',
                'Navigate to a door',
                'Click to Battle!',
                ''
            ]
            const tutorialText = this.add.text(235, 105, '', { fontSize: '30px', fill: 'black' }).setDepth(4)
            // timedEvent leave 'Battle Trail Tutorial' up for 1 second before changing into tutotrial text
            timedEvent = this.time.delayedCall(1000,tutorialChangeHandler, [], this);
            console.log("tutorial started")
            function tutorialChangeHandler() {
                if (tutorialFlag !== false) {
                    for (let i = 0; i < tutorialLogs.length; i++) {
                        const element = tutorialLogs[i];
                        (function (i) {
                            setTimeout(() => {
                                tutorialText.setText(element)
                                console.log(i, tutorialLogs[i])
                                if (tutorialLogs[i] === ''){
                                    dahliaBossDefeated = false;
                                    tutorialFlag = false;
                                    console.log('tutorial finished', dahliaBossDefeated)
                                }
                            }, 2000 * i);
                        })(i);
                    }
                }
            }
        }
        // timeout call to initialize the tutorial
        this.time.delayedCall(1000,tutorialStart, [], this);
    }
    
    dahliaDefeated() {
        dahliaBossDefeated = true;
        level++;
    }

    jamesDefeated() {
        jamesBossDefeated = true;
        level++;
    }

    lucasDefeated() {
        lucasBossDefeated = true;
        level++;
    }

    brookeDefeated() {
        brookeBossDefeated = true;
        level++;
    }
    
    updateClass(characterClass) {
        this.player.data.set = ('class', characterClass)
    }
    
    update() {
        if (cursors.left.isDown || arrowLeftFlag === true) {
            player.setVelocityX(-160);
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown || arrowRightFlag === true) {
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