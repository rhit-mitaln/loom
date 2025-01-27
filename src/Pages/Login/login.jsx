import React, { useEffect, useRef } from 'react';
import { SignInButton, useSignIn } from '@clerk/clerk-react';
import './login.css';
import videoBg from '../Login/Bloomloginbg.mp4';

function Login() {
    const { openSignIn } = useSignIn();
    const videoRef = useRef(null);

    const handleLoginClick = () => {
        openSignIn();
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Video playback failed:", error);
            });
        }
    }, []);

    return (
        <div>
            <div id='video'>
                <video
                    id='login-bg'
                    ref={videoRef}
                    src={videoBg}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onCanPlay={() => videoRef.current.play()}
                ></video>
            </div>
            <div id="login">
                <div id="login-top">
                    <div id="login-logo">Bloom</div>
                    <div id="login-tagline">Better mental health</div>
                </div>

                <div id="login-bottom">
                    <SignInButton mode="modal">
                        <button
                            id="login-buttons-buttons-login"
                            className="login-button"
                        >
                            Continue
                        </button>
                    </SignInButton>
                </div>
            </div>
        </div>
    );
}

export default Login;