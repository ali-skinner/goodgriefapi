import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../App'; // Import the user context

function LoginPage() {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    
    // Get authentication functions from context
    const { setUser, handleLogin } = useUser();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (username.trim() && password.trim()) {
            // Set the user in context
            setUser(username);
            
            // Update authentication state
            handleLogin();
            
            // Navigate to search page
            navigate('/search');
            
            // Clear form fields
            setPassword('');
            setUsername('');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="login-Container">
                    <h2 className="login-Header">Sign In</h2>
                    <div>
                        <input 
                            className="login-input" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            type="text" 
                            placeholder="username" 
                            name="username" 
                            id="username" 
                        />
                    </div>
                    <div>
                        <input 
                            className="login-input" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            type="password" 
                            placeholder="password" 
                            name="password" 
                            id="password" 
                        />
                    </div>
                    <div className="button-container">
                        <button 
                            className="button-login" 
                            type="submit" 
                            name="logInButton" 
                            id="logInButton"
                        >
                            Log In
                        </button>

                        {/* For now, just a placeholder button */}
                        <button 
                            className="button-login" 
                            type="button" 
                            onClick={() => alert("Registration not implemented yet")}
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