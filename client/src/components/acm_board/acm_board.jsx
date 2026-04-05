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
];

const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.5, ease: "easeOut" },
    },
};

// Use a dynamic function for variants
const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (index) => {
        // Math.floor(index / 4) groups them: indices 0-3 = row 0; indices 4-7 = row 1
        const rowIndex = Math.floor(index / 4);
        return {
            opacity: 1,
            y: 0,
            transition: {
                // 1.6s buffer for the title, plus 0.4s for every subsequent row
                delay: 0.8 + (rowIndex * 0.1),
                duration: 1.2,
                ease: "easeOut"
            }
        };
    }
};

function ACMBoard() {
    return (
        <div className="board-container">
            <motion.h1
                className="board-title"
                variants={titleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                Introducing <br />ACM General Executive Board
            </motion.h1>

            {/* No need for framer-motion on the grid container anymore */}
            <div className="board-grid">
                {boardMembers.map((member, index) => (
                    <motion.div
                        key={index}
                        className="member-card"
                        custom={index} // Pass the index so the variant knows which card it is
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <div className="diamond-shape">
                            <img src={member.image} alt={member.name} />
                        </div>
                        <div className="member-info">
                            <p className="member-name">{member.name}</p>
                            <p className="member-position">{member.position}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default ACMBoard;