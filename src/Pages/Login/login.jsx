import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './login.css';

function Login({ }) {

  useEffect(() => {

    
  }, []);

  return (
    <div>
        <div id='login'>
            <div id='login-top'>
                <div id='login-logo'>
                    Bloom
                </div>
                <div id='login-tagline'>
                    Your next step to better mental health
                </div>
                </div>
            <div id='login-bottom'>
                        <button id='login-buttons-buttons-login'>Log in</button>
                
                <div id='login-buttons-text'>or sign up instead</div>
                </div>
        </div>
    </div>
  );
}

export default Login;