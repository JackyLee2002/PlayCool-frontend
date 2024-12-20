import React, { useEffect, useState } from 'react';
import { Box, Button, Snackbar, Typography } from '@mui/material';
import OrderDetail from "@/src/components/OrderDetail";
import { fetchNoAuthOrder, fetchNoAuthSnapTicket } from "@/src/components/api";
import { useRouter } from "next/router";
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import MuiAlert from '@mui/material/Alert';
import styles from './snap-help-order.module.css';
import { useMediaQuery } from '@mui/material';

const SnapHelpOrder = () => {
    const [order, setOrder] = useState({});
    const router = useRouter();
    const [targetDate, setTargetDate] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [seatNumber, setSeatNumber] = useState("");
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // use media query to change the width of the box
    const matches = useMediaQuery('(min-width:600px)');

    useEffect(() => {
        if (!router.query.id) {
            return;
        }
        fetchOrderData(router.query.id);
    }, [router]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const socket = new SockJS(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ws`);
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/orders', (message) => {
                const updatedOrder = JSON.parse(message.body);
                setSeatNumber(updatedOrder.seatNumber);
                console.log(updatedOrder);
            }, (error) => {
                console.error('WebSocket connection error: ', error);
            });
        });

        return () => {
            stompClient.disconnect();
        };
    }, []);

    const fetchOrderData = async (id) => {
        if (id) {
            const response = await fetchNoAuthOrder(id);
            setOrder(response);
            if (response.concertDate) {
                const concertDate = new Date(response.concertDate);
                concertDate.setDate(concertDate.getDate() - 31);
                setTargetDate(concertDate);
            }
        }
    };

    const snapTicket = async () => {
        try {
            const response = await fetchNoAuthSnapTicket(router.query.id);
            setOrder(response);
            setSnackbarMessage('Ticket snapped successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage('Failed to snap the ticket.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const success = () => {
        setSnackbarMessage('Ticket already snapped.');
        setSnackbarSeverity('warning');
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <div style={{ minHeight: '77vh', display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)',
                    backgroundColor: 'rgba(50,50, 50, 0.1)',
                    borderRadius: '10px',
                    width: '1200px',
                    margin: 'auto',
                    '@media (max-width: 600px)': {
                        width: '100%',
                        padding: '10px',
                    },
                }}
            >
                <Typography variant="h4" sx={{ marginBottom: '20px', color: 'white', fontWeight: 'bold', textShadow: '0 10px 10px rgba(0, 0, 0, 0.5)' }}>
                    HELP <strong>{order.userName}</strong> SNAP THE TICKET
                </Typography>

                {targetDate && (
                    <div className={styles['flip-clock-wrapper']}>
                        <FlipClockCountdown
                            to={targetDate}
                            hideOnComplete={false}
                            className={styles['flip-clock']}
                            labels={['Days', 'Hours', 'Minutes', 'Seconds']}
                            labelStyle={{ fontSize: '14px' }}
                            digitBlockStyle={{
                                width: matches ? 50 : 25 ,
                                height: 60,
                                fontSize: 40,
                                fontWeight: 'bold',
                                color: new Date(targetDate) - new Date() <= 24 * 60 * 60 * 1000 ? 'red' : 'white'
                            }}
                        />
                    </div>
                )}

                <OrderDetail props={order} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '20px'
                    }}
                >
                    <Button
                        onClick={() => {
                            (order.seatNumber === null && seatNumber === "") ? snapTicket() : success();
                        }}
                        disabled={!targetDate || currentDate < targetDate}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            borderRadius: '10px',
                            backgroundColor: targetDate && currentDate >= targetDate ? '#3337BF' : 'gray',
                            color: 'white',
                            width: '200px',
                            '@media (max-width: 600px)': {
                                width: '100%',
                                padding: '10px',
                            },
                        }}
                    >
                        {(order.seatNumber === null && seatNumber === "") ? "Snap Ticket" : "Snap Success!"}
                    </Button>
                </Box>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                    <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </MuiAlert>
                </Snackbar>
            </Box>
        </div>
    );
};

export default SnapHelpOrder;