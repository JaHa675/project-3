import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

export default function NavBar() {
    // function refreshPage() {
    //     window.location.reload(false);

    //   }
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark" >
                <h1 className="text-light"> Battle Trail</h1>
                { document.location.pathname !== "/" && 
                <p className="nav-item " >
                    <div onClick={()=> {window.location.href="/"}}> HomepPage</div>
                </p>
                }
                { document.location.pathname !== "/login" && 
                <p className="nav-item " >
                    <div onClick={()=> {window.location.href="/login"}}> Login</div>
                </p>
                }
                {
                    <p className="nav-item " >
                    <div onClick={()=> {window.location.href="/main"}}> Game</div>
                </p>
                }
                { document.location.pathname !== "/about" && 
                <p className="nav-item " >
                    <div onClick={()=> {window.location.href="/about"}}> About The Creators</div>
                </p>
                }
            </nav>
        </div>
    );
}
