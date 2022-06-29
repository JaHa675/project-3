import Phaser from "phaser";
import eventsCenter from '../scripts/EventEmitter';
import battleFrame from '../assets/extras/frame2.png'
const logs = ['','','','','']

var image;
class TextBox extends Phaser.Scene {
    constructor(){
        super('BattleLog')
    }
    preload () {
        this.load.image('battleFrameTest', battleFrame);
    }

    create () {
        image = this.add.image(650, 500, 'battleFrameTest').setScale(.5).setDepth(-1)
        function logChangeHandler () {
            BattleLog1.setText(logs[0]);
            BattleLog2.setText(logs[1]);
            BattleLog3.setText(logs[2]);
            BattleLog4.setText(logs[3]);
            // BattleLog5.setText(logs[4]);
        }
        const BattleLog1 = this.add.text(575,450, logs[0], {fontSize: '20px', fill: 'black'});
        const BattleLog2 = this.add.text(575,475, logs[0], {fontSize: '20px', fill: 'black'});
        const BattleLog3 = this.add.text(575,500, logs[0], {fontSize: '20px', fill: 'black'});
        const BattleLog4 = this.add.text(575,525, logs[0], {fontSize: '20px', fill: 'black'});
        // const BattleLog5 = this.add.text(575,550, logs[0], {fontSize: '20px', fill: 'black'});
        eventsCenter.on('logChange', logChangeHandler,this);
        eventsCenter.on('playerAttack', this.playerAttackHandler,this);
        eventsCenter.on('bossAttack', this.bossAttackHandler,this);
        let megaThis = this
        let shutdownHandler = function () {
            console.log('shutdown scene function')
            eventsCenter.off('logChange', logChangeHandler);
            eventsCenter.off('playerAttack', megaThis.playerAttackHandler);
            eventsCenter.off('bossAttack',megaThis.bossAttackHandler);
        }

        this.events.on('shutdown', shutdownHandler())
        
    }
    playerAttackHandler(damage) {
        console.log(logs, "battle log")
        logs.unshift(`Player Deals ${damage}` );
        if (logs.length > 5) {
            logs.pop()
        }
        eventsCenter.emit('logChange')
        }
    bossAttackHandler(damage) {
        console.log(logs, "battle log")
        logs.unshift(`Boss Deals ${damage}` );
        if (logs.length > 5) {
            logs.pop()
        }
        eventsCenter.emit('logChange')
        }


    }
export default TextBox;
