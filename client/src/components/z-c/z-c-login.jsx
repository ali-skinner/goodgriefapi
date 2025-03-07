import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Add this if you're using React Router

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate(); // Add this if you're using React Router

    // Check if user is already logged in on mount
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setIsActive(true);
            navigate("/search"); // Redirect if already logged in
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        // Add your login logic here
        if (username && password) {
            setIsActive(true);
            localStorage.setItem("user", JSON.stringify({ username, isActive: true }));
            navigate("/search"); // Redirect to search page
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Add your register logic here
        // You might want to navigate to a register page or show register form
    };

    return (
        <>
            <form onSubmit={handleLogin}>
                <div className="login-Container">
                    <h2 className="login-Header">Sign In</h2>
                    <div className="login-Input">
                        <label htmlFor="username">Username</label>
                        <input 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="username"
                            name="username"
                            id="username"
                        />
                    </div>
                    <div className="login-Input">
                        <label htmlFor="password">Password</label>
                        <input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="password"
                            name="password"
                            id="password"
                        />
                    </div>
                    <div className="button-container">
                        <button type="submit" className="button-login">
                            Log In
                        </button>
                        <button 
                            type="button" 
                            className="button-login"
                            onClick={handleRegister}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default LoginPage;