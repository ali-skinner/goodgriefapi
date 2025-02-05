import React, { useState } from "react";

function LoginPage() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const [register, setRegister] = useState();
// will I need useEffect? to make sure this login components shows on mount only, can't keep loggin in if already active/login = true
    return (
        <>
            <form>
                <div className="login-Container">
                    <h2 className="login-Header">Sign In</h2>
                    <div className="login-Input">
                        <label htmlFor="username">Username</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" name="username" id="username" />
                    </div>
                    <div className="login-Input">
                        <label htmlFor="password">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" name="password" id="password" />

                    </div>
                    <div className="button-container">
                        {/* Log In onClick - add username, email, password to userprofile object/ set login to true/ load Search screen/component */}
                        <button className="button-login">Log In</button>

                        {/* Register onClick - Shows Register screen inputs/ Hides login In Screen inputs */}
                        <button className="button-login">Register</button>
                    </div>
                    <div className="login-Input">
                        <label htmlFor="register">Register</label>
                        <input value={register} onChange={(e) => setRegister(e.target.value)} type="text" placeholder="register" name="register" id="register" />
                    </div>
                    <div>
                        <button className="button-login">Create Username</button>
                        {/* onClick - add username, email, password to userprofile object/ set login to true/ load Search screen/component */}
                    </div>
                </div>
            </form>
        </>
    );
};

export default LoginPage;