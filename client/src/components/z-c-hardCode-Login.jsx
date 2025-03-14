import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function LoginPage() {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const { handleLogin } = useUser();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        
        const success = handleLogin(username, password);
        
        if (success) {
            navigate('/search');
            setPassword('');
            setUsername('');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="login-Container">
                    <h2 className="login-Header">Sign In</h2>
                    
                    {error && <div className="error-message">{error}</div>}
                    
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

                        <button 
                            className="button-login" 
                            type="button" 
                            onClick={() => alert("Registration not implemented yet")}
                        >
                            Register
                        </button>
                    </div>
                    
                    <div className="test-users">
                        <p>Test users:</p>
                        <p>Username: test1, Password: password1</p>
                        <p>Username: test2, Password: password2</p>
                        <p>Username: admin, Password: admin123</p>
                    </div>
                </div>
            </form>
        </>
    );
}

export default LoginPage;