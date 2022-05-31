import React from 'react';
import '../styles/Login.css'
import Scroll from "../assets/images/600px\ scroll.png";
// creating a functioning page

export default function Login () {
        return (
            <div className="loginContainer">
                <div className="contentContainer">
                <div className='scrollImage '></div>
                    <h1>Login Page</h1>
                    <p>Please Login/Signup to Battle!</p>
                    <form action="#" method="post" id="loginOut">
                    <p>Email</p>
                    <input name="email" type="text" placeholder="Your Email Here"id="emailInput" required></input>
                    <p>Password</p>
                    <input name="password" type="text" placeholder="Your Password Here"id="passwordInput" required></input>
                    <input type="submit" value="Send Message" id="form_button" className="submitBTN"/>
                    <br></br>
                    <a>Create New Account</a>
                    </form>
                </div>
            </div>
        );
}
