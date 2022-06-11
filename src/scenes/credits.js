import React, {useEffect} from 'react';
import Phaser from "phaser";
// import playGame from "../phaserGame"
import creditBackground from "../assets/backgrounds/CreditTavern.gif"


var scrollText;

class Credit extends Phaser.Scene {
    constructor () {
        super('Credit')
    }
    preload () {
        this.load.image('creditBackground',creditBackground)
    }
    create () {
        this.add.image(300,300,'creditBackground').setScale(1.9);
        var content = [
            "You did it! You have bested the four of us and the elusive Cat Boss!",
            "That is no small feat and we thank you for working your way through our game! ",
            "",
            "It started with an idea and a determination to win an award.",
            "",
            "Each of us knew that we wanted to create a game. We were excited to bring you, the user, a fun rpg experience that we curated in 2 weeks time.",
            "Battle Trail was brought to you by 4 web developers in the tail end of the UW Coding Bootcamp.",
            "We are Brooke Love, Lucas Roman, James Harding and Dahlia Graves!",
            "For more information about the creators please visit /about",
            "",
            "We'd also like to thank the team that supported us through the creation of Battle Trail.",
            "",
            "To King Joe- we'll never forget your love of salmon and manatees. As well as, your seemingly endless amount of knowledge that you bestowed upon us.",
            "To all of our TAs- thank you for being readily available to answer every and all questions. The one on one help we received was unmatched.",
            "We'd like to thank Spriters-Resource.com for the endless amount of all things sprites. This was a very useful resource for us for this project.",
            "Another irreplacable resource we ended up utlizing was Aseprite.",
            "We used this to edit of all of our sprites and make them all feel more like each of us.",
            "",
            "Thank you to the tomato. You got us where we are today. You are the best platform ♡",
            "And last, but certainly not least, we'd like to thank the University of Washington for hosting the bootcamp that we have all loved to be a part of.",
            "",
            "Thank you for playing ♡",
        ];
    
        scrollText = this.add.text(200, 100, content, { fontSize:'32px', fontFamily: '"Press Start 2P"', color: 'white', wordWrap: { width: 500 } }).setOrigin(0);
    }

    update ()
    {
        scrollText.y -= 0.5;
    }
}


export default function Credits(props) {
    var game = null;

    
    useEffect((props) => {
        const config = {
            type: Phaser.AUTO,
            parent: "phaser",
            width: 800,
            height: 600,
            scene: Credit
        }
         game = new Phaser.Game(config);
    },[])
    
    return (
        <div id="battle">{game ? game :""}</div>
        
    )
    
}