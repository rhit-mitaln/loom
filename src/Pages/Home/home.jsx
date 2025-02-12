import React, { useState, useEffect, useRef } from 'react';
import './home.css';
import WeekProgress from '../../components/week';
import Overlay from '../../components/Overlay';
import { motion, AnimatePresence } from 'framer-motion';
import { div } from 'framer-motion/client';
import { SignedIn, UserButton } from '@clerk/clerk-react';
import videoBgHome from '../Home/BloomAfterLogin.mp4';
import { useNavigate } from 'react-router-dom';

const LoadingScreen = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds

    if (videoRef.current) {
      videoRef.current.play().catch(error => {
          console.error("Video playback failed:", error);
      });
    }

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
            backgroundSize: '400% 400%',
            animation: 'gradient 5s ease infinite',
            fontFamily: 'Kanit',
            color: 'black',
            zIndex: 1000,
          }}
        >
          <motion.div
          key="content"
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          >
            <div id='overlay-home'>
              <div id='overlay-home-video'>
              <video
                    id='home-overlay-bg'
                    ref={videoRef}
                    src={videoBgHome}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onCanPlay={() => videoRef.current.play()}
                ></video>
              </div>
              <div id='overlay-home-svg'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 107.43 105.81" class='home-logo-svg' width="6rem">
              <g>
                <path d="M14.08,55.23c.38,1.14.64,1.88.89,2.64,1.38,4.26,4.37,6.87,8.71,7.41,2.68.33,5.49-.07,8.21-.41,3.64-.45,7.23-1.29,10.87-1.72,7.57-.89,13.85,1.6,18.68,7.55,2.33,2.87,3.43,6.04,1.69,9.58-1.7,3.47-4.77,4.49-8.44,4.29-1.25-.07-2.65-.07-3.73.43-.98.46-2.22,1.63-2.26,2.54-.05,1.07.9,2.34,1.74,3.23.6.63,1.71.77,2.89,1.25-.5.75-.83,1.39-1.29,1.92-3.13,3.64-6.3,7.23-9.41,10.89-.91,1.07-1.67,1.27-3.05.63-6.49-3.02-11.91-7.17-15.3-13.64-2.7-5.15-.12-12.29,5.26-14.61,4.07-1.75,8.31-2.4,12.73-2.13,2.39.15,4.79.15,7.19.22,1.75.05,3.16-.55,3.55-2.41.37-1.78-.5-2.94-2.09-3.78-4.2-2.23-8.39-1.52-12.32.4-4.63,2.26-8.9,5.29-13.59,7.41-6.59,2.99-13.43,4.35-20.24.32-.26-.15-.53-.28-.79-.43-4.93-2.99-5.13-4.28-1.4-8.53,3.26-3.72,6.48-7.48,9.73-11.21.47-.54.99-1.03,1.77-1.84Z" fill="#ffffff"/>
                <path d="M56.14,91.59c4.75-.84,8.15-3.18,9.42-7.45.8-2.71.87-5.77.63-8.62-.42-5.13-1.77-10.21-1.92-15.34-.21-7.39,5.08-14.75,11.61-17.27,5.49-2.12,10.69,1.81,10.26,7.68-.11,1.55-.03,3.14.24,4.67.27,1.54,1.3,2.53,3.01,2.45,1.69-.08,2.79-.88,3.18-2.61.57-2.56.88-2.65,2.88-.94,3.3,2.83,6.55,5.72,9.87,8.52,1.19,1,1.59,1.9.83,3.44-2.95,6.05-6.86,11.24-12.63,14.88-6.11,3.86-13.73,1.01-15.97-5.84-1.42-4.35-.76-8.75-.78-13.15,0-1.87.07-3.74.02-5.61-.04-1.48-.69-2.6-2.27-2.93-1.54-.32-2.85.05-3.73,1.41-1.51,2.31-2.28,4.94-1.25,7.49,1.72,4.27,3.8,8.41,5.84,12.55,2.91,5.93,5.89,11.78,5.1,18.75-.55,4.9-3.45,8.36-6.63,11.67-.4.41-1.84.47-2.3.08-4.95-4.13-9.81-8.37-14.67-12.6-.25-.22-.36-.6-.72-1.24Z" fill="#ffffff"/>
                <path d="M54.12,13.91c1.52-1.76,2.77-3.21,4.02-4.66,2.15-2.5,4.34-4.97,6.43-7.53.89-1.09,1.78-1.37,3.12-.89,6.89,2.46,11.99,7.09,15.43,13.38,3.48,6.35-.52,14.19-7.76,15.19-4.49.62-9.09.42-13.64.61-1.56.07-3.24-.11-4.64.42-1.06.4-2.35,1.69-2.47,2.7-.11.97.91,2.53,1.86,3.09,3.32,1.96,6.92,1.87,10.34.21,3.43-1.66,6.71-3.63,10.11-5.36,2.6-1.32,5.33-2.39,7.92-3.72,6.78-3.47,16.23-1.74,21.72,4.07.76.8,1.28,1.49.43,2.48-4.49,5.21-8.99,10.42-13.65,15.82-.33-.66-.58-1.01-.7-1.4-1.59-5.28-6.16-8.77-11.67-8.31-4.68.4-9.33,1.31-13.97,2.11-7.91,1.36-14.78-.48-20.07-6.67-1.35-1.58-2.37-3.7-2.83-5.74-1.1-4.93,2.72-9.05,7.79-8.8,1.27.06,2.54.19,3.8.15,1.73-.05,3.1-.77,3.4-2.64.31-1.95-.84-3.08-2.48-3.79-.61-.26-1.27-.38-2.51-.74Z" fill="#ffffff"/>
                <path d="M51.31,13.6c-1.2.48-1.78.75-2.38.96-5.42,1.85-8.38,6.09-7.9,12.12.33,4.16,1.06,8.31,1.96,12.4,1.87,8.51-1.48,17.45-8.65,22.31-2.68,1.82-5.58,2.21-8.5.71-2.83-1.45-3.91-3.98-3.86-7.08.02-1.2-.07-2.4-.1-3.6-.03-1.95-1.11-3.18-2.91-3.45-1.75-.26-2.94.83-3.62,2.43-.97,2.28-1.32,2.39-3.22.77-3.36-2.87-6.65-5.83-10.03-8.68-1.31-1.1-1.45-2.13-.71-3.69,2.82-6.01,7.07-10.75,12.59-14.34,6.38-4.15,14.46-.77,16.25,6.64,1.03,4.27,1.28,8.56.71,12.93-.19,1.47-.19,3,0,4.47.24,1.83,1.17,3.33,3.21,3.5,1.94.17,2.92-1.07,3.61-2.66,1.1-2.58,1.6-5.29,1.02-8.12-.75-3.62-2.34-7.08-3.63-10.56-1.85-5.01-3.57-10.05-3.58-15.45-.01-5.6,2.89-9.8,7.75-11.66.42-.17.8-.44,1.55-.86Z" fill="#ffffff"/>
              </g>
            </svg>

              </div>
            </div>
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
  const navigate = useNavigate();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleAssesmentClick = () => {
    navigate('/dailyAssesment');
  }

  const getFormattedDate = () => {
    const date = new Date();
    const dayName = dayNames[date.getDay()]; // Get the day name (e.g., Monday)
    const day = date.getDate(); // Get the day of the month (e.g., 10)
    const monthName = monthNames[date.getMonth()]; // Get the month name (e.g., February)

    // Function to add the correct suffix to the day (e.g., 1st, 2nd, 3rd, 4th)
    const getDaySuffix = (day) => {
      if (day > 3 && day < 21) return 'th'; // Special case for 11th, 12th, 13th, etc.
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    const daySuffix = getDaySuffix(day);

    return `${dayName}, ${day}${daySuffix} ${monthName}`;
  };

  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  

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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 107.43 105.81" class='home-logo-small-svg' width="2rem">
              <g>
                <path d="M14.08,55.23c.38,1.14.64,1.88.89,2.64,1.38,4.26,4.37,6.87,8.71,7.41,2.68.33,5.49-.07,8.21-.41,3.64-.45,7.23-1.29,10.87-1.72,7.57-.89,13.85,1.6,18.68,7.55,2.33,2.87,3.43,6.04,1.69,9.58-1.7,3.47-4.77,4.49-8.44,4.29-1.25-.07-2.65-.07-3.73.43-.98.46-2.22,1.63-2.26,2.54-.05,1.07.9,2.34,1.74,3.23.6.63,1.71.77,2.89,1.25-.5.75-.83,1.39-1.29,1.92-3.13,3.64-6.3,7.23-9.41,10.89-.91,1.07-1.67,1.27-3.05.63-6.49-3.02-11.91-7.17-15.3-13.64-2.7-5.15-.12-12.29,5.26-14.61,4.07-1.75,8.31-2.4,12.73-2.13,2.39.15,4.79.15,7.19.22,1.75.05,3.16-.55,3.55-2.41.37-1.78-.5-2.94-2.09-3.78-4.2-2.23-8.39-1.52-12.32.4-4.63,2.26-8.9,5.29-13.59,7.41-6.59,2.99-13.43,4.35-20.24.32-.26-.15-.53-.28-.79-.43-4.93-2.99-5.13-4.28-1.4-8.53,3.26-3.72,6.48-7.48,9.73-11.21.47-.54.99-1.03,1.77-1.84Z" fill="#FF9E27"/>
                <path d="M56.14,91.59c4.75-.84,8.15-3.18,9.42-7.45.8-2.71.87-5.77.63-8.62-.42-5.13-1.77-10.21-1.92-15.34-.21-7.39,5.08-14.75,11.61-17.27,5.49-2.12,10.69,1.81,10.26,7.68-.11,1.55-.03,3.14.24,4.67.27,1.54,1.3,2.53,3.01,2.45,1.69-.08,2.79-.88,3.18-2.61.57-2.56.88-2.65,2.88-.94,3.3,2.83,6.55,5.72,9.87,8.52,1.19,1,1.59,1.9.83,3.44-2.95,6.05-6.86,11.24-12.63,14.88-6.11,3.86-13.73,1.01-15.97-5.84-1.42-4.35-.76-8.75-.78-13.15,0-1.87.07-3.74.02-5.61-.04-1.48-.69-2.6-2.27-2.93-1.54-.32-2.85.05-3.73,1.41-1.51,2.31-2.28,4.94-1.25,7.49,1.72,4.27,3.8,8.41,5.84,12.55,2.91,5.93,5.89,11.78,5.1,18.75-.55,4.9-3.45,8.36-6.63,11.67-.4.41-1.84.47-2.3.08-4.95-4.13-9.81-8.37-14.67-12.6-.25-.22-.36-.6-.72-1.24Z" fill="#FF9E27"/>
                <path d="M54.12,13.91c1.52-1.76,2.77-3.21,4.02-4.66,2.15-2.5,4.34-4.97,6.43-7.53.89-1.09,1.78-1.37,3.12-.89,6.89,2.46,11.99,7.09,15.43,13.38,3.48,6.35-.52,14.19-7.76,15.19-4.49.62-9.09.42-13.64.61-1.56.07-3.24-.11-4.64.42-1.06.4-2.35,1.69-2.47,2.7-.11.97.91,2.53,1.86,3.09,3.32,1.96,6.92,1.87,10.34.21,3.43-1.66,6.71-3.63,10.11-5.36,2.6-1.32,5.33-2.39,7.92-3.72,6.78-3.47,16.23-1.74,21.72,4.07.76.8,1.28,1.49.43,2.48-4.49,5.21-8.99,10.42-13.65,15.82-.33-.66-.58-1.01-.7-1.4-1.59-5.28-6.16-8.77-11.67-8.31-4.68.4-9.33,1.31-13.97,2.11-7.91,1.36-14.78-.48-20.07-6.67-1.35-1.58-2.37-3.7-2.83-5.74-1.1-4.93,2.72-9.05,7.79-8.8,1.27.06,2.54.19,3.8.15,1.73-.05,3.1-.77,3.4-2.64.31-1.95-.84-3.08-2.48-3.79-.61-.26-1.27-.38-2.51-.74Z" fill="#FF9E27"/>
                <path d="M51.31,13.6c-1.2.48-1.78.75-2.38.96-5.42,1.85-8.38,6.09-7.9,12.12.33,4.16,1.06,8.31,1.96,12.4,1.87,8.51-1.48,17.45-8.65,22.31-2.68,1.82-5.58,2.21-8.5.71-2.83-1.45-3.91-3.98-3.86-7.08.02-1.2-.07-2.4-.1-3.6-.03-1.95-1.11-3.18-2.91-3.45-1.75-.26-2.94.83-3.62,2.43-.97,2.28-1.32,2.39-3.22.77-3.36-2.87-6.65-5.83-10.03-8.68-1.31-1.1-1.45-2.13-.71-3.69,2.82-6.01,7.07-10.75,12.59-14.34,6.38-4.15,14.46-.77,16.25,6.64,1.03,4.27,1.28,8.56.71,12.93-.19,1.47-.19,3,0,4.47.24,1.83,1.17,3.33,3.21,3.5,1.94.17,2.92-1.07,3.61-2.66,1.1-2.58,1.6-5.29,1.02-8.12-.75-3.62-2.34-7.08-3.63-10.56-1.85-5.01-3.57-10.05-3.58-15.45-.01-5.6,2.89-9.8,7.75-11.66.42-.17.8-.44,1.55-.86Z" fill="#FF9E27"/>
              </g>
            </svg>
          </div>
          <div id='home-profile'>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
      <div id='home-main'>
        <div id='home-welcome'>
          <div id='home-welcome-message'>
            Welcome Username
          </div>
          <div id='home-welcome-date'>
            {currentDate}
          </div>
        </div>
        <div id='home-image'>
          <div id='home-quote-image-container'>
            <div id='home-image-quote'>{ quote }</div>
            <div id='home-image-author'>- { author }</div>
          </div>
        </div>
        <div id='home-dailyassesment-card'>
          <div id='home-dailyassesment-card-info'>
            <div id='home-daily-title'>Daily Assesment</div>
            <div id='home-daily-sub'>Take your daily assessment. Click here to learn why Daily Assesments are good for you.</div>
          </div>
          <div id='home-daily-cont'>
            <div id='home-daily-time'>
              <div id='home-daily-estimation'>
                Estimated Time
              </div>
              <div id='home-daily-timeval'>
                3-7 minutes
              </div>
            </div>
              <button id='home-daily-button' onClick={ handleAssesmentClick }>Start</button>
          </div>
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