import React from "react";
import { motion } from "framer-motion";
import './sponsors.css'

import nucor from '../../assets/nucor-logo.png';
import sandia from '../../assets/Sandia-resized.png';
import wellsFargo from '../../assets/wells-fargo-logo.png';

const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.5, ease: "easeOut" },
    },
};

function Sponsors () {
    return( 
        <div className="sponsors">
            <motion.h1
                className="sponsors-h1"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                viewport={{once: true, amount: 0.5}}>
                Sponsors
            </motion.h1>
            <div className="img-container">
                <img src={nucor} alt="Nucor Logo" />
                <img src={sandia} alt="Sandia Logo" style={{backgroundColor: 'white'}}/>
                <img src={wellsFargo} alt="Wells Fargo Logo" />
            </div>
                
        </div>
    );
}

export default Sponsors;