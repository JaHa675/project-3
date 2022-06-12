
import Phaser from "phaser";
import mage from "../assets/characters/Mage.png"
import warrior from "../assets/characters/Warrior.png"
import finalBackground from "../assets/backgrounds/MainBackground.png"
import finalGround from "../assets/backgrounds/MainFloor.png"
import finalPlatform from "../assets/backgrounds/MainPlatform.png"
import fancyDoor from "../assets/backgrounds/TransparentDoor.png"
import Mains from "./main";
import Dialogue from '../assets/extras/charDialogue1.png'

// base variables for the door
var player;
var platforms;
var cursors;
var finalDoors;

var firstPlayCat = true;
let catBossDefeated = false;
var firstPlayMain = true;
let mainBossDefeated = false;
var timedEvent;
var dialogueImage;

class CatDoor extends Phaser.Scene {
    constructor () {
        super('CatDoors')
    }
    preload () {
        this.load.image('finalBackground',finalBackground)
        this.load.image('fancyDoor', fancyDoor)
        this.load.spritesheet('mage',mage,{frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('warrior',warrior,{frameWidth: 48, frameHeight: 48});
        this.load.image("finalGround", finalGround)
        this.load.image("finalPlatform", finalPlatform)
        this.load.image("charDialogue", Dialogue)
    }
    create () {
        this.character ="";
        // create a background 
        dialogueImage = this.add.image(400, 100, 'charDialogue').setScale(.6).setDepth(.5)
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 460, 'finalGround').refreshBody();
        platforms.create(400, 530, 'finalPlatform').setScale(1.1).refreshBody();

        const layer =this.add.layer();
        console.log(layer);
        // adding the background image as a layer above the floor

        layer.add(this.make.image({x:400, y:500, key:'finalBackground'},false).setScale(1.5));

        //creating the 2 doors 
        finalDoors = this.physics.add.staticGroup();
        let doorX = 250;
        for (let i=0; i < 2; i++) {
            var finalDoor = finalDoors.create(doorX, 300, 'fancyDoor').refreshBody().setScale(1.4).setInteractive();
            finalDoor.on('pointerdown', function (pointer) {
                console.log("this");
                console.log(this);
                console.log("pointer");
                console.log(pointer);
                switch (this.x) {
                    case 250: 
                    {
                        CatRoom();
                        break;
                    }
                    // this number might be different in game
                    case 485:
                    {
                        MainRoom();
                        break;
                    }
                }
            })
            doorX += 235;
        }
            player = this.physics.add.sprite(350, 100, 'mage').setScale(2);
            // if(state.charClass === 'mage'){
            //     player = this.physics.add.sprite(350, 100, 'mage');
            // } else {
            //     player = this.physics.add.sprite(350, 100, 'warrior');
            // }
            
            player.setBounce(0.2);
            player.setCollideWorldBounds(true);
            
            // getting a ground to render on the bottom
            // let finalGroundX = this.sys.game.config.width / 3;
            // let finalGroundY = this.sys.game.config.height * .95;
            // let finalGround = this.physics.add.image(finalGroundX, finalGroundY, "finalGround");
            // finalGround.displayWidth = this.sys.game.config.width * 1.0;
            // finalGround.setBounce(0);
            // finalGround.setImmovable();
            // finalGround.setCollideWorldBounds(true);

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
        cursors = this.input.keyboard.createCursorKeys();
        
            let CatRoom = () => {
                const catDoorText = this.add.text(280, 110, 'MYSTERY DOOR?!', { fontSize: '30px', fill: 'black'}).setDepth(4)
                timedEvent = this.time.delayedCall(2000, CatOnEvent, [], this);
                function CatOnEvent() {
                    catDoorText.setText('')
                    this.scene.start('Cats')
                    this.scene.launch('BattleLog')
                }
                //   console.log(firstPlay, dahliaBossDefeated)
                 if (firstPlayCat !== false) {
                    this.input.on('click',CatOnEvent)
                     console.log("input A test",firstPlayCat);
                 } else if (catBossDefeated === false && firstPlayCat === false ) {
                     console.log(catBossDefeated)
                     this.scene.start('Cats')
                 } 
            };
            let MainRoom = () => {
                this.input.on('click', MainOnEvent)
                const lucasDoorText = this.add.text(260, 110, 'Back to Main Path', { fontSize: '30px', fill: 'black' }).setDepth(4)
            timedEvent = this.time.delayedCall(1500, MainOnEvent, [], this);
            function MainOnEvent() {
                lucasDoorText.setText('')
                this.scene.start('Mains')
            }
            }

        this.physics.add.collider(player, platforms);
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

export default CatDoor
