import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './welcome.css';

function Welcome({ onComplete }) {
  const [step, setStep] = useState(0);
  const [showGradient, setShowGradient] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timings = {
      firstOverlay: 3000,
      secondOverlay: 4000,
      thirdOverlay: 5000,
      gradientTransition: 2500,
      taglineDelay: 1000,
      buttonDelay: 2000,
    };

    if (step < 3) {
      const timer = setTimeout(() => {
        setStep((prev) => prev + 1);
        if (step === 2) {
          setShowGradient(true);
          setTimeout(() => {
            setShowTagline(true);
            setTimeout(() => {
              setShowButtons(true);
            }, timings.buttonDelay);
          }, timings.gradientTransition + timings.taglineDelay);
        }
      }, step === 0 ? timings.firstOverlay : step === 1 ? timings.secondOverlay : timings.thirdOverlay);

      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="welcome-overlay">
      {/* First Overlay - "Hello" Text */}
      {step >= 0 && (
        <motion.div
          className="overlay-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <h1>Hello</h1>
        </motion.div>
      )}

      {/* Second Overlay - "It is important for us to look into our minds" */}
      {step >= 1 && (
        <motion.div
          className="overlay-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
          <h1>It is important for us to look into our minds</h1>
        </motion.div>
      )}

      {/* Third Overlay - LOOM Text */}
      {step >= 2 && (
        <motion.div
          className="overlay-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.7 }}
        >
          <h1 className="loom-text">LOOM</h1>
        </motion.div>
      )}

      {/* Gradient Background after Loom Text */}
      {step >= 3 && showGradient && (
        <motion.div
          className="gradient-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 2 }}
        />
      )}

      {/* Tagline in the fourth overlay */}
      {step >= 4 && showTagline && (
        <motion.div
          className="tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
          <p>Your next step towards better mental health</p>
        </motion.div>
      )}

      {/* Login and Sign-up Buttons */}
      {step >= 5 && showButtons && (
        <motion.div
          className="button-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.7 }}
        >
          <button className="button button-login" onClick={onComplete}>Log In</button>
          <button className="button button-signup" onClick={onComplete}>Sign Up</button>
        </motion.div>
      )}
    </div>
  );
}

export default Welcome;
