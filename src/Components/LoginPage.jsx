import React, { useState } from "react";

 function LoginPage() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const [register, setRegister] = useState();

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
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="password" name="password" id="password" />
                        <button className="button-login">Log In</button>
                    </div>
                    <div className="login-Input">
                        <label htmlFor="register">Register</label>
                        <input value={register} onChange={(e) => setRegister(e.target.value)} type="text" placeholder="register" name="register" id="register" />
                        <button className="button-login">Create Username</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default LoginPage;