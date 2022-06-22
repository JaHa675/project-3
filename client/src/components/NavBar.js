import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

export default function NavBar (){
    function refreshPage() {
        window.location.reload(false);
      }
    return(
            <div>
            <nav className= "navbar navbar-dark bg-dark" >
            <h1 className="text-light"> Battle Trail</h1>
              <p className="nav-item " >
              <Link  to="/" onClick={refreshPage}>HomePage</Link>
              </p>
              <p className="nav-item " >
              <Link  to="/login" onClick={refreshPage}>Login</Link>
              </p>
              <p className="nav-item " >
              <Link  to="/about" onClick={refreshPage}>About The Creators</Link>
              </p>
            </nav>

            </div>
          );
        }
