import React, { useEffect } from 'react';
import { SignInButton, useSignIn } from '@clerk/clerk-react';
import './login.css';

function Login() {
    const { openSignIn } = useSignIn();

    const handleLoginClick = () => {
        openSignIn();
    };

    return (
        <div id="login">
            <div id="login-top">
                <div id="login-logo">Bloom</div>
                <div id="login-tagline">Your next step to better mental health</div>
            </div>

            <div id="login-bottom">
                {/* Customize the button styling */}
                <SignInButton
                    mode="modal"
                >
                    <button
                        id="login-buttons-buttons-login"
                        className="login-button"
                    >
                        Log in
                    </button>
                </SignInButton>

                <div id="login-buttons-text">or sign up instead</div>
            </div>
        </div>
    );
}

export default Login;
