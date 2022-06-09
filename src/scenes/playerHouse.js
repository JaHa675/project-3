import React, {useEffect} from 'react';
import Phaser from "phaser";
import housebg from "../assets/backgrounds/BattleOption5.png"
import mage from "../assets/characters/Mage.png"
import warrior from "../assets/characters/Warrior.png"

var player;
var platforms;
var cursors;

class playerHouse extends Phaser.Scene {
    constructor () {
        super('playerHouse')
    }
    preload () {
        this.load.image('housebg',housebg);
        this.load.spritesheet('mage', mage, {frameWidth: 48, frameHeight: 48});
    }
    create () {
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 300, 'housebg').refreshBody();

        player = this.physics.add.sprite(350, 100, 'mage');
        player.setCollideWorldBounds(true).setBounce(0.2).setScale(2);

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
export default playerHouse

// export default function House(props) {
//     var game = null;

    
//     useEffect((props) => {
//         const config = {
//             type: Phaser.AUTO,
//             parent: "phaser",
//             width: 800,
//             height: 600,
//             scene: playerHouse
//         }
//          game = new Phaser.Game(config);
//     },[])
    
//     return (
//         <div id="battle">{game ? game :""}</div>
        
//     )
    
// }