import React from 'react';
import NavBar from '../../src/components/NavBar';
import TicketCard from '../../src/components/TicketCard';
import styles from './testing.module.css';

const testing = () => {
    return (
        <div>
            <div className={styles.middle}>
                <TicketCard/>
            </div>

            {/* Add your tickets content here */}
        </div>
    );
};

export default testing;