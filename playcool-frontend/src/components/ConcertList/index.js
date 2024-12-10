import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import styles from './ConcertList.module.css';

// 模拟的音乐会数据
const concerts = [
    {
        date: '03 June SUN',
        time: '18:45',
        location: 'Zayed Sports City, Abu Dhabi, United Arab Emirates',
        venue: 'Royal Albert Hall',
        tickets: 20
    },
    {
        date: '03 June SUN',
        time: '18:45',
        location: 'Zayed Sports City, Abu Dhabi, United Arab Emirates',
        venue: 'Royal Albert Hall',
        tickets: 20
    },
    {
        date: '03 June SUN',
        time: '18:45',
        location: 'Zayed Sports City, Abu Dhabi, United Arab Emirates',
        venue: 'Royal Albert Hall',
        tickets: 20
    }
];

const ConcertList = () => {

    return (
        <Box className={styles.container}>
            <Typography variant="h4" className={styles.title}>
                Choose Date And Time
            </Typography>
            <Typography variant="subtitle1" className={styles.subtitle}>
                All Available Tickets Are here.
            </Typography>
            {concerts.map((concert, index) => (
                <Paper key={index} className={styles.eventItem}>
                    <Box className={styles.dateTime}>
                        <Typography variant="h6">{concert.date}</Typography>
                        <Typography variant="h6">{concert.time}</Typography>
                    </Box>
                    <Box className={styles.location}>
                        <Typography variant="h6">{concert.location}</Typography>
                        <Typography variant="h6">{concert.venue}</Typography>
                    </Box>
                    <Box className={styles.tickets}>
                        <Typography variant="h6">{concert.tickets} Tickets Available!</Typography>
                    </Box>
                    <Button variant="contained" color="primary" className={styles.bookNowButton}>
                        Book Now
                    </Button>
                </Paper>
            ))}
            <Pagination
                className={styles.pagination}
                count={7}
                color="primary"
            />
        </Box>
    );
};

export default ConcertList;