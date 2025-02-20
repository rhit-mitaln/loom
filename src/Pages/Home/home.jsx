import React, { useState, useEffect, useRef } from 'react';
import './home.css';
import WeekProgress from '../../components/week';
import Overlay from '../../components/Overlay';
import { motion, AnimatePresence } from 'framer-motion';
import { div } from 'framer-motion/client';
import { SignedIn, UserButton, useUser } from '@clerk/clerk-react';
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

  console.log("<3 Adonia");

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
            Welcome User
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
      <div id='home-bottom-menu'>
      <button className="menu-icon-button menu-icon-button-selected" id='menu-icon-selected-home'>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 109.42 108.89"
    width="2rem" 
    height="2rem"
    className="custom-icon-selected"
  >
    <path 
      fill="#FF8B00" 
      //stroke='#FF8B00'
      strokeLinecap='round'
      strokeLinejoin='round'
      id='home-selected-path'
      d="M54.71,0c.69,0,1.38.03,2.07.05.43.01.81.26,0.98.66,3.64,8.39,10.12,16.54,10.12,25.34-.05,4.67-1.83,9.13-4.06,13.52-.45.88.42,1.85,1.35,1.52.21-.07.42-.15.63-.23.26-.1.47-.29.6-.53,2.4-4.65,4.42-9.36,4.42-14.28,0-8.33-5.73-16.06-9.46-23.94-.38-.79.29-1.69,1.16-1.55.74.12,1.47.25,2.2.38.35.06.64.29.79.61,3.72,8.04,9.7,15.94,9.7,24.5,0,2.73-.61,5.4-1.58,8.04-.4,1.08.91,1.98,1.76,1.2.07-.07.15-.14.22-.21,5.91-5.94,7.36-15.44,10.35-23.62.25-.69,1.1-.92,1.68-.49.53.4,1.05.81,1.56,1.23.37.3.49.8.32,1.25-3.3,8.38-4.57,18.53-10.8,24.73-2.62,2.61-5.89,4.31-9.49,5.66-.25.09-.46.27-.58.5-.19.36-.38.71-.57,1.07-.46.88.4,1.85,1.33,1.53,4.39-1.51,8.51-3.38,11.62-6.47,6.09-6.01,7.42-15.83,10.54-24.15.28-.75,1.23-.96,1.8-.4.5.5.99,1,1.47,1.51.29.31.36.75.21,1.14-3.38,8.51-4.58,18.78-10.89,25.01-3.28,3.31-7.71,5.22-12.43,6.77-.94.31-1.01,1.61-.11,2.03.2.09.4.19.6.28.25.12.54.13.8.04,4.99-1.64,9.74-3.53,13.28-7,5.91-5.93,7.32-15.44,10.32-23.58.3-.82,1.39-.98,1.91-.28.44.6.87,1.21,1.3,1.83.21.3.25.67.12,1.01-3.14,8.29-4.49,18.11-10.54,24.13-1.93,1.92-4.24,3.35-6.75,4.52-1.06.49-.74,2.08.42,2.09.07,0,.14,0,.2,0,8.38,0,16.13-5.73,24.05-9.41.66-.31,1.44.13,1.53.85.09.65.17,1.3.23,1.97.05.47-.22.91-.66,1.1-8.3,3.63-16.4,9.92-25.16,9.92-3.69,0-7.27-1.13-10.79-2.66-.23-.1-.49-.12-.74-.05-.38.11-.77.22-1.15.34-.96.28-1.06,1.6-.16,2.04,4.19,2.03,8.43,3.61,12.84,3.61,8.53,0,16.44-6,24.56-9.68.73-.33,1.55.2,1.55,1h0c0,.69,0,1.38-.02,2.08-.01.42-.28.78-.66.95-8.39,3.63-16.58,10.08-25.43,10.08-4.7-.05-9.2-1.83-13.66-4.06-.88-.44-1.84.43-1.51,1.36.08.21.15.42.23.63.1.26.29.47.53.6,4.67,2.39,9.46,4.4,14.41,4.4,8.33,0,16.1-5.72,24.03-9.43.79-.37,1.68.29,1.55,1.15-.11.75-.24,1.48-.39,2.22-.07.34-.3.62-.62.77-8.09,3.7-16.02,9.66-24.57,9.66-2.75,0-5.43-.6-8.06-1.54-1.1-.4-1.99.95-1.17,1.78.05.05.11.11.16.16,5.91,5.88,15.49,7.32,23.69,10.29.69.25.93,1.11.48,1.7-.4.51-.8,1.02-1.2,1.52-.3.38-.8.51-1.25.34-8.47-3.28-18.67-4.54-24.9-10.74-2.57-2.61-4.32-5.86-5.69-9.45-.09-.25-.27-.45-.51-.58-.36-.19-.72-.38-1.09-.57-.88-.45-1.85.41-1.53,1.34,1.52,4.37,3.4,8.47,6.5,11.56,6.09,6.06,15.9,7.38,24.26,10.49.75.28.97,1.24.4,1.81-.5.5-1,.98-1.51,1.45-.31.28-.75.36-1.14.2-8.5-3.37-18.88-4.56-25.13-10.84-3.33-3.27-5.21-7.69-6.76-12.39-.31-.94-1.61-1.01-2.03-.12-.1.21-.19.41-.28.62-.11.25-.13.53-.05.79,1.59,4.97,3.55,9.7,7.04,13.22,5.91,5.88,15.46,7.29,23.64,10.27.82.3.98,1.39.28,1.91-.58.44-1.18.86-1.79,1.29-.29.21-.67.25-1.01.13-8.38-3.13-18.2-4.47-24.25-10.49-1.94-1.93-3.42-4.26-4.61-6.78-.5-1.05-2.08-.73-2.09.43,0,.08,0,.17,0,.25,0,8.33,5.75,16.05,9.45,23.92.31.66-.12,1.44-.85,1.54-.65.09-1.31.17-1.98.23-.47.04-.91-.22-1.1-.65-3.64-8.26-9.97-16.32-9.97-25.04,0-3.66,1.13-7.21,2.71-10.71.11-.25.13-.53.04-.79-.12-.37-.24-.73-.35-1.1-.29-.95-1.59-1.04-2.03-.15-2.04,4.16-3.61,8.37-3.61,12.75,0,8.19,5.57,15.82,9.28,23.61-.78,1.22-.74,1.16-1.52,2.38-.39,0-.79,0-1.18-.02-.42-.01-.78-.28-.95-.66-3.64-8.35-10.07-16.5-10.07-25.31,0-4.67,1.78-9.14,4.01-13.58.44-.88-.42-1.85-1.35-1.52-.2.07-.41.15-.61.23-.25.1-.45.28-.58.52-2.45,4.66-4.43,9.42-4.43,14.35,0,8.28,5.74,16.02,9.43,23.91.37.79-.29,1.68-1.15,1.55-.75-.11-1.5-.24-2.25-.39-.34-.07-.63-.3-.77-.62-3.67-8.05-9.71-15.94-9.71-24.45,0-2.73.62-5.37,1.56-7.98.4-1.11-.98-2.01-1.8-1.16-.04.04-.07.08-.11.12-5.96,5.88-7.37,15.42-10.34,23.59-.25.69-1.11.92-1.69.48-.52-.4-1.03-.8-1.54-1.19-.38-.3-.51-.81-.34-1.26,3.29-8.43,4.56-18.58,10.73-24.77,2.62-2.56,5.95-4.31,9.5-5.67.24-.09.44-.27.57-.49.19-.35.39-.7.58-1.06.47-.87-.38-1.87-1.32-1.55-4.42,1.51-8.53,3.38-11.64,6.47-6.03,6.05-7.41,15.81-10.53,24.13-.28.75-1.24.96-1.81.39-.48-.48-.96-.97-1.44-1.47-.3-.31-.38-.77-.22-1.17,3.38-8.45,4.63-18.77,10.88-24.99,3.33-3.31,7.77-5.18,12.49-6.72.94-.31,1.02-1.62.11-2.03-.21-.09-.41-.19-.62-.28-.25-.11-.52-.13-.78-.05-5.05,1.59-9.8,3.53-13.29,7.01-5.92,5.89-7.38,15.41-10.35,23.56-.3.81-1.38.98-1.9.29-.46-.6-.89-1.21-1.31-1.83-.2-.29-.24-.66-.11-.99,3.09-8.34,4.44-18.12,10.49-24.14,1.94-1.93,4.26-3.39,6.8-4.58,1.05-.49.74-2.08-.42-2.09-.07,0-.13,0-.2,0-8.38,0-16.18,5.73-24.11,9.41-.66.31-1.43-.13-1.53-.85-.09-.65-.17-1.3-.23-1.97-.05-.47.22-.91.66-1.1,8.3-3.63,16.4-9.92,25.21-9.92,3.68,0,7.25,1.12,10.71,2.7.25.11.53.13.78.04.37-.12.73-.23,1.09-.35.95-.29,1.05-1.59.15-2.03-4.16-2.02-8.35-3.59-12.74-3.59-8.6,0-16.53,5.97-24.62,9.64C.83,55.79,0,55.27,0,54.47c0,0,0-.02,0-.03,0-.68.03-1.37.05-2.05.01-.43.26-.81.66-.98,8.44-3.62,16.62-10.02,25.46-10.02,4.69,0,9.17,1.77,13.59,3.98.88.44,1.85-.43,1.51-1.35-.07-.2-.15-.39-.22-.58-.1-.25-.28-.45-.52-.58-4.68-2.44-9.41-4.41-14.37-4.41-8.38,0-16.15,5.71-24.07,9.38-.79.37-1.68-.3-1.54-1.16.12-.74.25-1.47.38-2.19.06-.35.3-.64.62-.79,8.08-3.65,16.01-9.66,24.61-9.66,2.73,0,5.4.63,8.04,1.58,1.09.39,1.99-.95,1.18-1.78-.05-.05-.1-.1-.15-.15-5.97-5.94-15.52-7.33-23.73-10.3-.69-.25-.93-1.1-.49-1.68.4-.54.81-1.06,1.24-1.57.3-.36.79-.47,1.23-.3,8.42,3.29,18.64,4.55,24.87,10.69,2.62,2.61,4.33,5.92,5.69,9.46.09.24.27.44.5.57.36.19.72.39,1.07.58.88.47,1.87-.39,1.55-1.33-1.51-4.39-3.4-8.49-6.5-11.57-6.03-6-15.88-7.37-24.23-10.48-.75-.28-.96-1.24-.39-1.81.48-.48.97-.95,1.47-1.43.31-.3.76-.38,1.16-.22,8.55,3.36,18.87,4.61,25.12,10.84,3.33,3.31,5.25,7.74,6.81,12.44.31.94,1.6,1,2.03.11.1-.2.19-.4.28-.61.12-.25.13-.54.05-.81-1.64-5.02-3.54-9.74-7.03-13.21-5.96-5.88-15.53-7.34-23.71-10.29-.83-.3-.98-1.4-.27-1.92.61-.45,1.23-.88,1.86-1.29.29-.19.65-.23.97-.11,8.33,3.08,18.21,4.42,24.27,10.44,1.93,1.92,3.37,4.23,4.55,6.76.49,1.06,2.08.74,2.09-.42,0-.06,0-.12,0-.18,0-8.33-5.75-16.1-9.45-23.98-.31-.66.12-1.44.85-1.54.65-.09,1.31-.17,1.98-.23.47-.04.91.22,1.1.65,3.64,8.26,9.97,16.32,9.97,25.09,0,3.67-1.13,7.22-2.67,10.67-.1.24-.12.5-.05.75.11.39.23.77.34,1.16.29.95,1.59,1.06,2.03.16,2.05-4.16,3.64-8.35,3.64-12.74,0-8.55-6.04-16.44-9.74-24.49C53.36.83,53.89,0,54.69,0c0,0,.02,0,.03,0h0Z"
    />
  </svg>
  </button>

  <button className="menu-icon-button">
<svg 
xmlns="http://www.w3.org/2000/svg" 
viewBox="0 0 108.89 108.89"
width="2rem" 
height="2rem"
className="custom-icon"
>
<path 
fill="#aaaaaa" 
d="M92.94,15.95C82.67,5.66,68.99,0,54.45,0S26.23,5.66,15.95,15.95C5.66,26.23,0,39.9,0,54.45s5.66,28.21,15.95,38.5c10.28,10.28,23.96,15.95,38.5,15.95s28.22-5.66,38.5-15.95c10.28-10.28,15.95-23.96,15.95-38.5s-5.66-28.22-15.95-38.5ZM106.73,53.38h-.16c-6,0-10.99-4.44-11.93-10.37-1.62-10.13-5.4-19.44-11.03-26.95-.13-.17-.27-.34-.4-.51,1.39-.57,2.76-1.17,4.08-1.83,1.44,1.16,2.83,2.4,4.15,3.73,9.63,9.63,15.02,22.35,15.29,35.92ZM81.13,92.52c-2.68-.99-5.48-1.83-8.38-2.51,3.65-9.6,5.69-21.67,5.8-34.5h1.29c7.72,0,13.53,7.18,11.77,14.7-1.97,8.4-5.52,16.06-10.45,22.31h-.02ZM27.74,92.52c-4.94-6.25-8.49-13.91-10.46-22.31-1.76-7.52,4.05-14.69,11.77-14.69h1.29c.11,12.83,2.15,24.9,5.8,34.5-2.91.68-5.7,1.52-8.38,2.51h-.02ZM27.76,16.37c2.68.99,5.48,1.83,8.38,2.51-3.65,9.6-5.69,21.67-5.8,34.5h-1.29c-7.72,0-13.53-7.18-11.77-14.69,1.97-8.4,5.52-16.06,10.46-22.31h.02ZM32.48,55.57c5.46.27,10.56,2.49,14.46,6.39,4.15,4.15,6.44,9.68,6.44,15.55v10.47c-5.16.06-10.23.61-15.12,1.6-3.63-9.39-5.67-21.31-5.78-34.01ZM53.38,18.78c-4.89-.06-9.69-.57-14.32-1.49.02-.05.04-.12.07-.17,3.92-9.06,8.94-14.31,14.26-14.93v16.59ZM38.26,19.32c4.89,1,9.95,1.54,15.12,1.6v10.47c0,5.88-2.29,11.4-6.44,15.55-3.9,3.9-9,6.12-14.46,6.39.11-12.7,2.15-24.62,5.78-34.01ZM53.38,90.11v16.58c-5.31-.62-10.34-5.86-14.26-14.93-.02-.06-.04-.12-.07-.17,4.63-.92,9.43-1.42,14.33-1.48ZM55.51,90.11c4.89.06,9.69.57,14.33,1.48-.02.06-.04.12-.07.17-3.92,9.06-8.94,14.31-14.26,14.93v-16.58ZM70.63,89.58c-4.88-.99-9.95-1.54-15.12-1.6v-10.47c0-5.88,2.29-11.4,6.44-15.55,3.9-3.89,9-6.12,14.46-6.39-.11,12.7-2.15,24.62-5.78,34.01ZM61.95,46.94c-4.15-4.15-6.44-9.68-6.44-15.55v-10.47c5.16-.06,10.23-.61,15.12-1.6,3.63,9.39,5.67,21.31,5.78,34.01-5.46-.27-10.56-2.49-14.46-6.39ZM55.51,18.78V2.2c5.32.62,10.34,5.87,14.26,14.93.02.05.04.12.07.17-4.64.92-9.43,1.42-14.32,1.49ZM71.73,16.28c-2.5-5.79-5.5-10.14-8.78-12.88,6.16,1.84,11.88,5.66,16.75,11.24-2.47.88-5.05,1.63-7.73,2.24-.08-.19-.15-.41-.23-.6ZM37.16,16.28c-.08.19-.15.4-.23.6-2.67-.61-5.25-1.36-7.73-2.24,4.86-5.58,10.59-9.4,16.74-11.24-3.29,2.74-6.28,7.09-8.78,12.88ZM36.93,92.02c.08.19.15.41.23.6,2.5,5.79,5.49,10.14,8.78,12.88-6.16-1.83-11.88-5.66-16.75-11.24,2.48-.88,5.06-1.63,7.73-2.24ZM71.73,92.61c.08-.19.15-.4.23-.6,2.67.61,5.25,1.36,7.73,2.24-4.86,5.58-10.59,9.4-16.75,11.24,3.29-2.74,6.28-7.09,8.78-12.88ZM78.55,53.38c-.11-12.83-2.15-24.91-5.8-34.5,2.91-.68,5.7-1.52,8.38-2.51h.02c4.94,6.26,8.49,13.91,10.46,22.31,1.76,7.52-4.05,14.7-11.77,14.7h-1.29ZM85.39,12.26c-1.16.55-2.36,1.07-3.58,1.55-3.01-3.57-6.36-6.49-9.94-8.71,4.82,1.7,9.37,4.1,13.52,7.16ZM27.09,13.81c-1.22-.48-2.42-1-3.58-1.55,4.15-3.06,8.7-5.46,13.52-7.16-3.58,2.22-6.93,5.15-9.94,8.71ZM17.46,17.46c1.33-1.33,2.72-2.57,4.15-3.73,1.32.65,2.68,1.26,4.07,1.83-.13.17-.27.33-.4.51-5.63,7.51-9.41,16.82-11.03,26.95-.95,5.93-5.93,10.37-11.93,10.37h-.16c.27-13.57,5.67-26.29,15.3-35.92ZM2.16,55.51h.16c6,0,10.98,4.44,11.93,10.37,1.62,10.13,5.39,19.44,11.03,26.95.13.17,27.34.4.51-1.39.57-2.76,1.17-4.07,1.83-1.44-1.16-2.83-2.4-4.15-3.73-9.63-9.63-15.02-22.35-15.3-35.92ZM23.51,96.63c1.16-.55,2.36-1.07,3.58-1.55,3.01,3.57,6.35,6.49,9.94,8.71-4.81-1.7-9.36-4.1-13.52-7.16ZM81.81,95.08c1.22.48,2.42,1,3.58,1.55-4.15,3.06-8.7,5.46-13.52,7.16,3.58-2.22,6.93-5.15,9.94-8.71ZM91.44,91.44c-1.33,1.33-2.72,2.57-4.15,3.73-1.32-.65-2.68-1.26-4.08-1.83.13-.17.27-.33.4-.51,5.63-7.51,9.41-16.82,11.03-26.95.95-5.93,5.93-10.37,11.93-10.37h.16c-.27,13.57-5.67,26.29-15.29,35.92Z"
/>
</svg>
  </button>

  <button className="menu-icon-button">
  <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 116.68 105.69"
      width="2rem" 
      height="2rem"
      className="custom-icon"
    >
      <path 
        fill="#aaaaaa" 
        strokeWidth="0" 
        d="M116.67,31.42s0-.1-.01-.15c0,0,0-.01,0-.02-.01-.05-.03-.1-.05-.14h0s-.06-.09-.09-.13c0,0,0,0,0,0L88.19.23s-.02-.02-.02-.03c0,0-.01-.02-.02-.02,0,0,0,0,0,0-.01-.01-.03-.03-.04-.04,0,0-.02-.01-.03-.02-.02-.01-.04-.02-.06-.03,0,0-.01,0-.02-.01-.06-.03-.12-.04-.18-.05,0,0,0,0-.01,0-.02,0-.05,0-.08,0h-.03s-.04,0-.07,0c0,0-.02,0-.04,0,0,0-.02,0-.04,0,0,0,0,0-.01,0,0,0-.02,0-.04,0-.02,0-.03.02-.05.02,0,0,0,0-.01,0l-29.06,12.41L29.28.05s0,0-.01,0c-.01,0-.03,0-.05-.02-.01,0-.03,0-.04,0,0,0,0,0,0,0-.01,0-.03,0-.04,0,0,0-.02,0-.04,0-.02,0-.04,0-.06,0h-.03s-.06,0-.09,0h0c-.06.01-.12.03-.18.05,0,0-.01,0-.02,0-.02.01-.04.02-.06.04,0,0-.02.01-.03.02-.01.01-.03.03-.05.04,0,0,0,0,0,0,0,0,0,.01-.02.02,0,0-.01.02-.02.03L.19,30.96s0,0,0,0c-.03.04-.07.08-.09.13H.08s-.04.1-.05.15c0,0,0,.01,0,.02,0,.05-.01.1-.02.15v.03s0,.1.02.15H.02s0,.02,0,.03c0,.02,0,.04.02.05l11.54,31.86h0s.01.03.02.04c.01.04.03.07.05.11,0,.02.02.03.03.04.02.03.04.05.07.07,0,0,0,0,0,.01l46.09,41.68s0,0,0,0c0,0,.01,0,.02.01s0,0,.01,0c0,0,.02.02,.04.03,0,0,0,0,.02.01,0,0,0,0,0,0,0,0,0,0,.01,0,0,0,0,0,.01,0,0,0,.01,0,.02,0,.01,0,.03.01,.05.02,0,0,0,0,.02,0,0,0,0,0,.02,0,0,0,0,0,.01,0,.02,0,.04,0,.06.01,0,0,.01,0,.02,0,0,0,0,0,.02,0h.01s.06,0,.08,0h0s.06,0,.09,0h.01s0,0,.01,0c0,0,.01,0,.02,0,.02,0,.04,0,.06-.01,0,0,0,0,.01,0,0,0,.01,0,.02,0,0,0,.01,0,.02,0,.02,0,.03-.02,.05-.02,0,0,.01,0,.02,0,0,0,0,0,.01,0,0,0,0,0,.01,0,0,0,0,0,0,0,0,0,.02,0,.02-.02.01,0,.03-.01,.04-.02,0,0,0,0,.01,0s0,0,.02-.01t0,0l46.09-41.68s0,0,0-.01c.02-.02.05-.05.07-.07,0-.01.02-.03.03-.04.02-.03.04-.07.05-.11,0-.01.01-.03.02-.03h0s11.54-31.87,11.54-31.87c0-.02.01-.03.02-.05,0,0,0-.01,0-.02h0c0-.06.01-.11.02-.16,0,0,0-.02,0-.03ZM28.69,2.1l13.2,43.39L1.95,31.14,28.69,2.1ZM13.46,63.45l29.06-15.77,14.52,55.19L13.46,63.45ZM57.63,99.51l-1.9-7.21-12-45.62,13.9-30.22v83.04ZM86.55,1.96l-12.99,42.68-10.41-22.63-3.86-8.4L86.55,1.96ZM104.05,62.29l-28.62-15.53,39.37-14.14-10.75,29.67ZM59.05,16.47v83.04l1.9-7.21,12-45.62-13.9-30.22ZM1.89,32.61l10.75,29.67,28.62-15.53L1.89,32.61ZM87.99,2.1l-13.21,43.39,39.95-14.34L87.99,2.1ZM30.12,1.96l13,42.68,10.41-22.63,3.86-8.4L30.12,1.96ZM74.15,47.68l-14.52,55.19,43.58-39.41-29.07-15.77Z"
      />
    </svg>
  </button>
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