import React from "react";

const Login = (props) => {

    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleLogout,
        handleSignUp,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError
    } = props;

    return(
        <section className="login">
            
            <div className="loginContainer">
                <label>EPM Admin Console</label>
                <label>Username</label>
                <input type="text" 
                autoFocus 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}/>
                <p className="errorMsg">{emailError}</p>

                <label>Password</label>
                <input type="password" 
                autoFocus 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}/>
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    <button onClick={handleLogin}>Sign In</button>
                </div>
            </div>
        </section>
    )
}

export default Login;