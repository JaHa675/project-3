import React, {useEffect} from 'react';
import Phaser from "phaser";
import housebg from "../assets/backgrounds/Room.png"
import mage from "../assets/characters/Mage.png"
import warrior from "../assets/characters/Warrior.png"
import floor from "../assets/backgrounds/RoomFloor.png"

var player;
var platforms;
var cursors;

class House extends Phaser.Scene {
    constructor () {
        super('House')
    }
    preload () {

        this.load.image('housebg',housebg);
        this.load.image('floor',floor);
        this.load.spritesheet('mage', mage, {frameWidth: 48, frameHeight: 48});
    }
    create () {
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 300, 'floor').setScale(2).refreshBody();

        const layer =this.add.layer();
        console.log(layer);
        // adding the background image as a layer above the floor

        layer.add(this.make.image({x:400, y:400, key:'housebg'},false));

        // layer.add(this.add.text(25, 50, 'Player House', { fontFamily: 'Press Start 2P', fontSize: 300, color: 'goldenrod' }))
        


        player = this.physics.add.sprite(350, 100, 'mage').setScale(2);
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

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