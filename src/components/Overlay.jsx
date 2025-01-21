import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './overlay.css';

function Overlay() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="overlay-entry">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="overlay"
          >
            <div id="overlay-text">
              <div className="logo-container">
                {['B', 'l', 'o', 'o', 'm'].map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.2,
                      ease: 'easeOut',
                    }}
                    className="logo-letter"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              <div id="tagline">Train your mind</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Overlay;
