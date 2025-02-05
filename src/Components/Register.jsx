import React, { useState } from "react";

function Register() {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [register, setRegister] = useState('');
    // will I need useEffect? to make sure this login components shows on mount only, can't keep loggin in if already active/login = true

    const isLoggedIn = () => {
        setIsActive(!isActive);
    };

    const handleLogin = () => {
        e.preventDefault();
        // if username and password arent blank, setIsActive(true) & log in user and show search page

        if (username && password) {
            setIsActive(true);
            //do i need to reset username and password to blank fields?
            //show Search page
        }
    };

    return (
        <>
            <form onSubmit={handleLogin}>
                <div className="login-Container">
                    <h2 className="login-Header">New Member Registry</h2>
                    <div>
                        <label htmlFor="username">New Username</label>
                        <input className="login-input" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" name="username" id="username" />
                    </div>
                    <div>
                        <label htmlFor="password">Set Password</label>
                        <input className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" name="password" id="password" />

                    </div>

                    <div>
                        <label htmlFor="register-name">Name</label>
                        <input className="login-input" value={register} onChange={(e) => setRegister(e.target.value)} type="text" placeholder="registration name" name="register-name" id="register-anme" />
                    </div>
                    <div>
                        {/* /* {onClick - add username, email, password to userprofile object/ set login to true/ load Search screen/component  */}
                        <button className="button-login">Create Account</button>
                        <button className="button-login">Already a user? Sign In</button>

                    </div>
                    <div className="button-container">
                        {/* need a toggle? go back to login screen and hide register screen */}

                    </div>
                </div>
            </form>
        </>
    );
};

export default Register;