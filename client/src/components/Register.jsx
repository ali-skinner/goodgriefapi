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
                {console.log("is register working?")}
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

// LOGIN PAGE CODE:

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useUser } from '../context/UserContext';

// function LoginPage() {
//     const [password, setPassword] = useState('');
//     const [username, setUsername] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const { handleLogin } = useUser();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setError('');

//         const success = handleLogin(username, password);

//         if (success) {
//             navigate('/search');
//             setPassword('');
//             setUsername('');
//         } else {
//             setError('Invalid username or password');
//         }
//     };

//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 <div className="login-Container">
//                     <h2 className="login-Header">Sign In</h2>

//                     {error && <div className="error-message">{error}</div>}

//                     <div>
//                         <input className="login-input"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             type="text"
//                             placeholder="username"
//                             name="username"
//                             id="username" />
//                     </div>
//                     <div>
//                         <input className="login-input"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             type="password"
//                             placeholder="password"
//                             name="password"
//                             id="password" />
//                     </div>
//                     <div className="button-container">
//                         {/* Log In onClick - add username, email, password to userprofile object/ set login to true/ load Search screen/component */}
//                         <button
//                             className="button-login"
//                             type="submit"
//                             name="logInButton"
//                             id="logInButton"
//                         >
//                             Log In
//                         </button>

//                         {/* Register onClick - Shows Register Component  <Register />  */}
//                         <button
//                             className="button-login"
//                             onClick={(e) => alert("Registration not implemented yet")}
//                         >
//                             Register
//                         </button>
//                     </div>

//                     <div className="test-users">
//                         <p>Test users:</p>
//                         <p>Username: test1, Password: password1</p>
//                         <p>Username: test2, Password: password2</p>
//                         <p>Username: admin, Password: admin123</p>
//                     </div>
                    
//                 </div>
//             </form>
//         </>
//     );
// };

// export default LoginPage;