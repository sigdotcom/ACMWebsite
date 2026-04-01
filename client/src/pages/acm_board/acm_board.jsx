import React from 'react';
import { motion } from 'framer-motion';
import ManavMoney from '../../assets/ManavMoney.png';
import EthanChau from '../../assets/ethan_chau.png';
import BenSullins from '../../assets/ben_sullins.png';
import DheerajM from '../../assets/dheeraj_m.png';
import './acm_board.css';

const boardMembers = [
    { name: 'Manav Vinotha', position: 'President', image: ManavMoney },
    { name: 'Ethan Chau', position: 'Vice President', image: EthanChau },
    { name: 'Ben Sullins', position: 'Logistics Officer', image: BenSullins },
    { name: 'Dheeraj M', position: 'Treasurer', image: DheerajM },
    // Add more members here; the code will automatically group them by 4
];

const titleVariants = {
    hidden: { opacity: 0, y: -50, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 1.5, ease: "easeOut" },
    },
};

// Container handles the stagger BETWEEN rows
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 2.5, // Time between Row 1 and Row 2 appearing
            delayChildren: 1.0,   // Wait after title finishes
        },
    },
};

// Row variants handle the "all at once" blur and slide from bottom
const rowVariants = {
    hidden: {
        opacity: 0,
        y: 50,              // Start below
        filter: "blur(15px)", // Match the Title's blur amount
        transition: {
            duration: 1.2,
            ease: "easeOut",
        },
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1.2,
            ease: "easeOut",
        },
    },
};
function ACMBoard() {
    // Logic to split the flat array into chunks of 4 (one row each)
    const rows = [];
    for (let i = 0; i < boardMembers.length; i += 4) {
        rows.push(boardMembers.slice(i, i + 4));
    }

    return (
        <div className="board-container">
            <motion.h1
                className="board-title"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
            >
                Introducing, <br />ACM General Executive Board
            </motion.h1>

            <motion.div
                className="board-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {rows.map((row, rowIndex) => (
                    <motion.div
                        key={rowIndex}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        style={{ display: 'contents' }}
                    >
                        {row.map((member, index) => (
                            <div key={index} className="member-card">
                                <div className="diamond-shape">
                                    <img src={member.image} alt={member.name} />
                                </div>
                                <div className="member-info">
                                    <p className="member-name">{member.name}</p>
                                    <p className="member-position">{member.position}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default ACMBoard;