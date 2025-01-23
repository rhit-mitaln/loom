import React, { useState, useEffect } from 'react';
import './home.css';
import WeekProgress from '../../components/week';
import Overlay from '../../components/Overlay';
import { motion, AnimatePresence } from 'framer-motion';
import { div } from 'framer-motion/client';
import { SignedIn, UserButton } from '@clerk/clerk-react';

const LoadingScreen = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Cleanup the timeout
  }, []);

  const loadingVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1, staggerChildren: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  const letterVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 0.5, duration: 0.5 } }, // Delay to wait for loading screen exit
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          id='overlay-home'
          variants={loadingVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(-45deg, #FFB300, #FF9F00, #FF8B00, #FF7700, #CC5500)',
            backgroundSize: '400% 400%',
            animation: 'gradient 5s ease infinite',
            fontFamily: 'Kanit',
            color: 'white',
            zIndex: 1000,
          }}
        >
          <motion.div style={{ display: 'flex', fontSize: '36px', fontWeight: 'bold' }}>
            {['B','l', 'o', 'o', 'm'].map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                style={{ marginRight: '5px' }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          variants={contentVariants}
          initial="initial"
          animate="animate"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function HomeContent() {
  const [quote, setQuote] = useState('Loading quote...');
  const [author, setAuthor] = useState('');
  const [fontSize, setFontSize] = useState('3.5rem');
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const response = await fetch('/quotes.txt');
        if (!response.ok) {
          throw new Error('Failed to fetch quotes');
        }

        const text = await response.text();
        const quotes = text.split('\n').filter(line => line.trim() !== '');

        const todayIndex = new Date().getDate() % quotes.length;
        const randomQuote = quotes[todayIndex];

        const [quoteText, authorText] = randomQuote.split(' - ');
        setQuote(quoteText.trim());
        setAuthor(authorText.trim());

        adjustFontSize(quoteText.trim().length);
      } catch (error) {
        console.error('Error fetching quotes:', error);
        const fallbackQuote = 'Take a deep breath. You are stronger than you think.';
        setQuote(fallbackQuote);
        setAuthor('Unknown');

        adjustFontSize(fallbackQuote.length);
      }
    }

    fetchQuotes();
  }, []);

  useEffect(() => {
    if (showOverlay) {
      const timeoutId = setTimeout(() => {
        setShowOverlay(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [showOverlay]);

  const adjustFontSize = (charCount) => {
    const maxFontSize = 2.5;
    const minFontSize = 1.5;
    const maxChars = 70;
    const minChars = 20;

    if (charCount > maxChars) {
      setFontSize(`${minFontSize}rem`);
    } else if (charCount < minChars) {
      setFontSize(`${maxFontSize}rem`);
    } else {
      const scaleFactor = (maxFontSize - minFontSize) / (maxChars - minChars);
      const newFontSize = maxFontSize - (charCount - minChars) * scaleFactor;
      setFontSize(`${newFontSize.toFixed(2)}rem`);
    }
  };

  return (
    <div id='home'>
      <div id='home-top'>
        <div id='home-top-top'>
          <div id='home-logo'>
            Bloom
          </div>
          <div id='home-profile'>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <div id='home-top-bottom'>
          <div id='home-top-quote' style={{ fontSize: fontSize}}>
            {quote}
          </div>
          <div id='home-top-author'>
          - {author}
          </div>
        </div>
      </div>
      <div id='home-bottom'>
        <div id='home-bottom-top'>
          <div id='home-bottom-title'>
            Take Daily Assessment
          </div>
          <div id='home-bottom-info'>
            Helps not only you, but also us to get to know you better.
          </div>
          <div id='home-bottom-subinfo'>
            Read this article to know more about the daily assessments we encourage you to take and how it helps.
          </div>
        </div>
        <div id='home-bottom-card-container'>
          <div id='home-bottom-card-top'>
            <div id='home-bottom-card-title'>
              Daily Assessment
            </div>
           <div id='home-bottom-card-subtitle'>
              Answer a few questions and log your day.
           </div>
          </div>
          <div id='home-bottom-card-bottom'>
            <div id='home-bottom-card-time'>
              <div id='home-bottom-card-timetext'>
                Estimated Time
              </div>
              <div id='home-bottom-card-esttime'>
                5-7 minutes
              </div>
            </div>
            <div>
              <button id='home-bottom-takeassesment'>
                Start
              </button>
            </div>
          </div>
        </div>
        <div id='home-bottom-menu'>
          menu
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <LoadingScreen>
      <HomeContent />
    </LoadingScreen>
  );
}

export default Home;