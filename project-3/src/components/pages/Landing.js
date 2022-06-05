import React from 'react';
import '../../styles/Landing.css'
import logo from "../../assets/images/Battle_Trail_Gaming_Logo__AdobeCreativeCloudExpress.gif"

export default function Landing () {
    return (
        <div>
            <div className="landingContainer">
                <div style={{height: "250px"}}>
                <img src={logo} alt ="wait until the page loads" className="battleLogo"/>
                </div>
                <a href='/login'><button className="playNow">Play Now</button></a>
            </div>
        </div>
    );
}

