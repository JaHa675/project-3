import React from 'react';
import '../../styles/Login.css'
// creating a functioning page

export default function Login () {
        return (
            <div className="loginContainer">
                <div className="contentContainer">
                <div className='scrollImage '></div>
                    <h1 className= "loginPage">Login</h1>
                    <p>Please Login to Battle!</p>
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
