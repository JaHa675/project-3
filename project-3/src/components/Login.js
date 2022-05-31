import React, {Component} from 'react';
import '../styles/Login.css'

// creating a functioning page

class Login extends Component() {
    componentDidMount() {
        loginpage();
    }
    render () {
        return (
        <div>
            <div class='box'>
                    <div class='box-form'>
                    <div class='box-login-tab'></div>
                    <div class='box-login-title'>
                        <div class='i i-login'></div><h2>LOGIN</h2>
                    </div>
                    <div class='box-login'>
                        <div class='fieldset-body' id='login_form'>
                            <button onclick="openLoginInfo();" class='b b-form i i-more' title='Mais Informações'></button>
                            <p class='field'>
                                <label for='user'>E-MAIL</label>
                                <input type='text' id='user' name='user' title='Username' />
                                <span id='valida' class='i i-warning'></span>
                            </p>
                            <p class='field'>
                                <label for='pass'>PASSWORD</label>
                                <input type='password' id='pass' name='pass' title='Password' />
                                <span id='valida' class='i i-close'></span>
                            </p>
                            <input type='submit' id='do_login' value='GET STARTED' title='Get Started' />
                        </div>
                    </div>
                </div>
                <div class='box-info'>
                    <button onclick="closeLoginInfo();" class='b b-info i i-left' title='Back to Sign In'></button>
        
                    <button onclick="" class='b-support' title='About Us?'> About Us</button>
                    <button onclick="" class='b-support' title='Credits'> Credits</button>
                    <div class='line-wh'></div>
                    <button onclick="" class='b-cta' title='Sign up now!'> CREATE ACCOUNT</button>
                </div>
            </div><div class='icon-credits'>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a>, <a href="http://www.flaticon.com/authors/budi-tanrim" title="Budi Tanrim">Budi Tanrim</a> & <a href="http://www.flaticon.com/authors/nice-and-serious" title="Nice and Serious">Nice and Serious</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
        </div>
    );
    }
}

export default Login;