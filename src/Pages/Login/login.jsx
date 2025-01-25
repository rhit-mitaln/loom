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
                <div id="login-tagline">Better mental health</div>
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
                        Continue
                    </button>
                </SignInButton>
            </div>
        </div>
    );
}

export default Login;
