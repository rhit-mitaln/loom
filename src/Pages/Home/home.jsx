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
    <div>
      <Overlay />
      <div className="gradient-container"></div>
      <div className="app-content">
        <div id="main">
          <motion.div
            id="top"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.5, duration: 0.5 }}
          >
            <div id="title">Loom</div>
            <div id="profile">Pic</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.7, duration: 0.5 }}
          >
            <div
              id="quote"
              style={{ fontSize: fontSize }}
            >
              {quote}
            </div>
            <div id="author">- {author}</div>
          </motion.div>

          <motion.div
            id="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.9, duration: 0.5 }}
          >
            <div id="questionText">
              <div id="ques">Let's train your mind</div>
              <div id="subQues">Start by taking your daily assessment or browse meditations.</div>
            </div>
            <div id="starting">
              <button id="assessment">Take Daily Assessment</button>
              <button id="meditations">Browse Meditations</button>
            </div>
          </motion.div>

          <motion.div
            id="week"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5, duration: 0.5 }}
          >
            <WeekProgress />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;

