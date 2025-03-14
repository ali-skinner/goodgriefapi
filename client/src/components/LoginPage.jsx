import React, { useState } from "react";
import Register from './Register';

function LoginPage() {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [user, setUser] = useState('');
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();
    // will I need useEffect? to make sure this login components shows on mount only, can't keep loggin in if already active/login = true

    const isLoggedIn = () => {
        setIsActive(!isActive);
        //Do i need this or does isAuthenticated from App work instead
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // if username and password arent blank, setIsActive(true) & log in user and show search page

        if (username && password) {
            setIsActive(true);
            //do i need to reset username and password to blank fields?
        }
    };

    return (
        <>
            <form onSubmit={handleLogin}>
                <div className="login-Container">
                    <h2 className="login-Header">Sign In</h2>
                    <div>
                        <input className="login-input" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" name="username" id="username" />
                    </div>
                    <div>
                        <input className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" name="password" id="password" />
                    </div>
                    <div className="button-container">
                        {/* Log In onClick - add username, email, password to userprofile object/ set login to true/ load Search screen/component */}
                        <button className="button-login" type="submit" name="logInButton" id="logInButton">Log In</button>

                        {/* Register onClick - Shows Register screen inputs/ Hides login In Screen inputs */}
                        <button className="button-login" onClick={(e) => <Register />}>Register</button>

                    </div>
                </div>
            </form>
        </>
    );
};

export default LoginPage;