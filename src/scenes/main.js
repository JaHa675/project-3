
import Phaser from "phaser";
import dgBattle from "../assets/backgrounds/BattleOption4.png"
import mage from "../assets/characters/Mage.png"
import warrior from "../assets/characters/Warrior.png"
import ground from "../assets/backgrounds/BattleOption4ground.png"
import door from "../assets/backgrounds/DoorsTrial1.png"
import DahliaScene from "./dahliaBoss"
import CatScene from "./catbBoss"
import eventsCenter from '../scripts/EventEmitter'
// import React, {useEffect,useState} from 'react';

var player;
var platforms;
var cursors;
var doors;
var door1;

var firstPlayDahlia = true;
let dahliaBossDefeated = false;
var firstPlayCat = true;
let catBossDefeated = false;
var firstPlayBrooke = true;
let brookeBossDefeated = false;
var firstPlayJames = true;
let jamesBossDefeated = true;
// var safeHouse;

// MAIN acts as the directory for the other scenes

class Mains extends Phaser.Scene {
    constructor () {
        super('Mains')
    }
    preload () {
        this.load.image('dgBattle',dgBattle)
        this.load.image('door',door)
        this.load.spritesheet('mage',mage,{frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('warrior',warrior,{frameWidth: 48, frameHeight: 48});
        this.load.image("ground", ground)
    }
    create () {

        this.character= ""
        // create a background 
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 300, 'dgBattle').refreshBody();

        // adding the door to the game 
        doors =this.physics.add.staticGroup();
        door1 =this.physics.add.staticGroup();

        let doorX = 70;
        for(let i=0; i < 5; i++) {
            var door = doors.create(doorX, 440,'door').refreshBody().setScale(1.3).setInteractive();
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
                    case 235 :
                        {
                            BrookeRoom();
                            break;
                        }
                
                    default:
                        break;
                }
            });
            doorX += 165;
        }

        
        // add inputEnabled = true

        // doors.create(70, 440, 'door').refreshBody().setScale(1.3);
        // doors.create(235, 440, 'door').refreshBody().setScale(1.3);
        // doors.create(395, 440, 'door').refreshBody().setScale(1.3);
        // doors.create(570, 440, 'door').refreshBody().setScale(1.3);
        // doors.create(725, 440, 'door').refreshBody().setScale(1.3);


        // getting the player to render 
        player = this.physics.add.sprite(350, 100, 'mage').setScale(2);
        // if(state.charClass === 'mage'){
        //     player = this.physics.add.sprite(350, 100, 'mage');
        // } else {
        //     player = this.physics.add.sprite(350, 100, 'warrior');
        // }
        
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        
        // getting a ground to render on the bottom
        let groundX = this.sys.game.config.width / 3;
        let groundY = this.sys.game.config.height * .95;
        let ground = this.physics.add.image(groundX, groundY, "ground");
        ground.displayWidth = this.sys.game.config.width * 1.0;
        ground.setBounce(0);
        ground.setImmovable();
        ground.setCollideWorldBounds(true);


        // player changing to right left and center positions
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('mage', { start: 4, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'mage', frame: 4} ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('mage', { start: 6, end: 7}),
            frameRate: 10,
            repeat: -1
        });
        door1.on('pointerdown', function (pointer) {

            console.log("clicked door 1")
    
        });
// Scene change handler currently on key, needs to be on press or bound condtionally (i.e. character position on a door)
//  Please leave console logs for testing purposes as the game grows
        cursors = this.input.keyboard.createCursorKeys();


        var DahliaRoom = () => {
            if (firstPlayDahlia !== false) {
                firstPlayDahlia = false;
                 console.log("input A test",firstPlayDahlia);
                this.scene.start ('Dahlias')
             } else if (dahliaBossDefeated === false && firstPlayDahlia === false ) {
                 console.log(dahliaBossDefeated)
                 this.scene.switch('Dahlias')
             } 
            }
        var CatRoom = () => {
                //   console.log(firstPlay, dahliaBossDefeated)
                 if (firstPlayCat !== false) {
                    firstPlayCat = false;
                     console.log("input A test",firstPlayCat);
                    this.scene.start ('Cats')
                 } else if (catBossDefeated === false && firstPlayCat === false ) {
                     console.log(catBossDefeated)
                     this.scene.switch('Cats')
                 } 
             }
        var BrookeRoom = () => {
            if (firstPlayBrooke !== false) {
                firstPlayBrooke = false;
                 console.log("input A test",firstPlayBrooke);
                this.scene.start ('Brookes')
             } else if (brookeBossDefeated === false && firstPlayBrooke === false ) {
                 console.log(brookeBossDefeated)
                 this.scene.switch('Brookes')
             } 
        }
        // eventsCenter.on('classSelect', function(playerChange){
        //     player.data.set('class',playerChange);
        //     console.log(player.data);
        // })
       
        
        


// console.log(dahliaBossDefeated);
// this is how originally worked ====================================================
// this.input.keyboard.on('keydown-A', () => {
//             //   console.log(firstPlay, dahliaBossDefeated)
        
//              if (firstPlayDahlia !== false) {
//                 firstPlayDahlia = false;
//                  console.log("input A test",firstPlayDahlia);
//                 this.scene.start ('Dahlias')
//              } else if (dahliaBossDefeated === false && firstPlayDahlia === false ) {
//                  console.log(dahliaBossDefeated)
//                  this.scene.switch('Dahlias')
//              } 
//          })
// ======================================================================================

this.input.keyboard.on('keydown-L', () => {
            //   console.log(firstPlay, dahliaBossDefeated)
             
         })
         this.input.keyboard.on('keydown-J', () => {
            //   console.log(firstPlay, jamesBossDefeated)
             if (firstPlayJames !== false) {
                firstPlayJames = false;
                 console.log("input A test",firstPlayJames);
                this.scene.start ('Jamess')
             } else if (jamesBossDefeated === false && firstPlayJames === false ) {
                 console.log(jamesBossDefeated)
                 this.scene.switch('Jamess')
             }
         })

        // collider only takes in two parameters
        this.physics.add.collider(player, ground);
        // this.physics.add.collider(player, doors);
        // this.physics.add.collider(boss, platforms);
    }

    dahliaDefeated(){
        dahliaBossDefeated = true;
    }


    updateClass(characterClass)
    {
        this.player.data.set = ('class',characterClass)
    }

     update ()
    {

        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
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
export default Mains