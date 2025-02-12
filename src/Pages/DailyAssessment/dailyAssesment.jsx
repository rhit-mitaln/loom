import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import '/Users/nakulmital/pulse/src/Pages/DailyAssessment/dailyAssesment.css';

const DailyAssesment = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
      }

    return (
        <>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
            
            >
            <div id="dailyAssesment">
                <div id="top-dailyAssesment">
                    <div id="DailyAssesment-goback-button" onClick={handleHomeClick}>go back</div>
                </div>
                <div id="middle-dailyAssesment">
                    <div id="title-top-dailyAssesment">
                        Welcome to your
                    </div>
                    <div id="title-dailyAssesment">
                        Daily Assesment
                    </div>
                    <div id="title-top-dailyAssesment">
                        Click the button below whenever you are ready to start.
                    </div>
                </div>
                <div id="bottom-dailyAssesment">

                </div>
            </div>
        </motion.div>
        </>
    )
};

export default DailyAssesment;