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
                    <Link to="/" >HomePage</Link>
                </p>
                }
                { document.location.pathname !== "/login" && 
                <p className="nav-item " >
                    <Link to="/login" >Login</Link>
                </p>
                }
                {
                    <p className="nav-item " >
                    <Link to="/main" >Game</Link>
                </p>
                }
                { document.location.pathname !== "/about" && 
                <p className="nav-item " >
                    <Link to="/about" >About The Creators</Link>
                </p>
                }
            </nav>
        </div>
    );
}
