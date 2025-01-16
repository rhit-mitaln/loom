import { useState, useEffect } from 'react';
import './home.css';
import WeekProgress from '../../components/week';
import Overlay from '../../components/Overlay';
import { motion } from 'framer-motion';

function Home() {
  const [quote, setQuote] = useState('Loading quote...');
  const [author, setAuthor] = useState('');
  const [fontSize, setFontSize] = useState('3.5rem');
  
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

  const adjustFontSize = (charCount) => {
    const maxFontSize = 3;
    const minFontSize = 1.5;
    const maxChars = 100;
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
            Loom
          </div>
        </div>
        <div id='home-top-bottom'>
          <div id='home-top-quote'>
            It’s not stress that kills us, it is our reaction to it. 
          </div>
          <div id='home-top-author'>
          - Hans Selye
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

export default Home;

