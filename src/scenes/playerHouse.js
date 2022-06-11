import React, {useEffect} from 'react';
import Phaser from "phaser";
import housebg from "../assets/backgrounds/Room.png"
import mage from "../assets/characters/Mage.png"
import warrior from "../assets/characters/Warrior.png"
import floor from "../assets/backgrounds/RoomFloor.png"
import floorPlatform from "../assets/backgrounds/RoomPlatform.png"
import catPath from "../assets/extras/catDoor.png"
import CatDoors from "./finalBossDoors"
import KingJoe from "../assets/characters/KingJoe.png"


var player;
var platforms;
var cursors;
var doors;
var backDoor;

class House extends Phaser.Scene {
    constructor () {
        super('House')
    }
    preload () {
        this.load.image('catPath', catPath)
        this.load.image('housebg',housebg);
        this.load.image('floor',floor);
        this.load.image('floorPlatform',floorPlatform);
        this.load.spritesheet('mage', mage, {frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('KingJoe', KingJoe, {frameWidth: 48, frameHeight: 48});
    }
    create () {
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 300, 'floor').setScale(2).refreshBody();
        platforms.create(400, 560, 'floorPlatform').setScale(1.5).refreshBody();

        const layer =this.add.layer();
        console.log(layer);
        // adding the background image as a layer above the floor

        layer.add(this.make.image({x:400, y:400, key:'housebg'},false));

        // layer.add(this.add.text(25, 50, 'Player House', { fontFamily: 'Press Start 2P', fontSize: 300, color: 'goldenrod' }))

        this.add.sprite(600,300,'KingJoe').setScale(2);

        player = this.physics.add.sprite(350, 100, 'mage').setScale(2);
        player.setBounce(0.2);

        player.setCollideWorldBounds(true);
        doors = this.physics.add.staticGroup();
        // for (let i=0; i<1; i++) {
        backDoor =  doors.create(200, 500, 'catPath').refreshBody().setScale(.3).setInteractive();
            backDoor.on('pointerdown', function (pointer) {
                console.log("this");
                console.log(this);
                console.log("pointer");
                console.log(pointer);
                switch (this.x) {
                    case 200: {
                        CatPath()
                        break;
                    }
                    default: 
                        break;
                }
            })
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
            frames: this.anims.generateFrameNumbers('mage', { start: 4, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'mage', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('mage', { start: 6, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(player, platforms);

        player.setDataEnabled();

        let CatPath = () => {
            this.scene.start('CatDoors')
    }
    }
    update () {
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
export default House

