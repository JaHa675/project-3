import React from 'react';
import '../../styles/Landing.css'
import logo from "../../assets/images/Battle_Trail_Gaming_Logo__AdobeCreativeCloudExpress.gif"
import NavBar from "../NavBar"

export default function Landing () {
    return (
        <div>
            <NavBar />
           <div className="landingContainer">
                <div style={{height: "250px"}}>
                <img src={logo} alt ="wait until the page loads" className="battleLogo"/>
                </div>
                <div className="landingBtnContainer">
                    <a href='/about'><button className="playNow landingBTNL ">About Us</button></a>
                    <hr></hr>
                    <a href='/login'><button className="playNow landingBTNR">Play Now</button></a>
                </div>
            </div>
        </div>
    );
}

