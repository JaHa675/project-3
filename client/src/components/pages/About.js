import React from 'react';
import '../../styles/About.css'
import Brooke from "../../assets/characters/Brooke.png"
import Dahlia from "../../assets/characters/Dahlia.png"
import James from "../../assets/characters/James.png"
import Lucas from "../../assets/characters/Lucas.png"
import NavBar from "../NavBar"


export default function About() {
    return (
        <div>
            <NavBar></NavBar>
            <div className='infoContainer'>
                <div className='aboutContainer'>
                    <h1 className='aboutTitle'>Why Make A Game?</h1>
                    <div className='aboutParaContainer'>
                        <h6 className='aboutUsPara'>
                            We wanted to create a fun exiting game that brought us to the early 2000s with pixelated games. As enginners, we liked the thought of a game that combined all of our love for games and challlenged us to create something new.
                        </h6>
                        {/* make sure that it is known that the sprite sheet can create white space at the bottom */}
                        {/* <h6 className='aboutUsPara'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </h6> */}
                    </div>
                </div>
                <div className='linksContainer'>
                    <div className="gitHubTitle">
                        <h4>Click our Avatars</h4>
                        <h5 className="subText">For Links to Our GitHub</h5>
                    </div>
                    </div>
                    <div className="characterArea">
                        <div className="characterBox">
                            <div className="avatarBox">
                            <a href='https://github.com/brookelove'><img className="avatar pixelart" id="mage" target="_blank" src={Brooke} alt="Brooke" /></a>
                                
                            </div>
                        </div>
                        {/* <br /> */}
                        <div className="characterBox">
                            <div className="avatarBox">
                            <a href="https://github.com/DahliaGRV"><img className="avatar pixelart" id="warrior"target="_blank" src={Dahlia} alt="Dahlia" /></a>
                            </div>
                        </div>
                        <div className="characterBox">
                            <div className="avatarBox">
                            <a href='https://github.com/JaHa675'><img className="avatar pixelart" id="warrior"target="_blank" src={James} alt="James" /></a>
                            </div>
                        </div>
                        <div className="characterBox">
                            <div className="avatarBox">
                            <a href='https://github.com/remotemana'> <img className="avatar pixelart" id="warrior"  src={Lucas} alt="Lucas" /></a>
                            </div>
                        </div>
                    {/* </div> */}
                    {/* <ul className="githubLinks">
                        <li> <a href='https://github.com/brookelove'>Brooke</a> </li>
                        <li> <a href="https://github.com/DahliaGRV">Dahlia </a> </li>
                        <li> <a href='https://github.com/JaHa675'>James</a> </li>
                        <li> <a href='https://github.com/remotemana'>Lucas</a> </li>
                    </ul> */}
                </div>
            </div>
        </div>
    );
}