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
import useMediaQuery from '@mui/material/useMediaQuery';

const SnapHelpOrder = () => {
    const [order, setOrder] = useState({});
    const router = useRouter();
    const [targetDate, setTargetDate] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [seatNumber, setSeatNumber] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const isMobile = useMediaQuery('(max-width:600px)');

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
        <div style={{ minHeight: '77vh', display: 'flex', flexDirection: 'column', width: "100vw" }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: { xs: '10px', sm: '20px' },
                    border: '1px solid lightgray',
                    borderRadius: '10px',
                    width: { xs: '90%', sm: '80%', md: '60%', lg: '50%', xl: '1200px' },
                    margin: 'auto',
                }}
            >
                <Typography variant="h4" sx={{marginBottom: '20px'}}>
                    Help <strong>{order.userName}</strong> Snap The Ticket
                </Typography>

                {targetDate && (
                    <FlipClockCountdown
                        to={targetDate}
                        hideOnComplete={false}
                        className="flip-clock"
                        labels={['Days', 'Hours', 'Minutes', 'Seconds']}
                        labelStyle={{ fontSize: isMobile ? '10px' : '14px' }}
                        digitBlockStyle={{
                            width: isMobile ? 30 : 50,
                            height: isMobile ? 40 : 60,
                            fontSize: isMobile ? '20px' : '40px',
                            fontWeight: 'bold',
                            color: new Date(targetDate) - new Date() <= 24 * 60 * 60 * 1000 ? 'red' : 'white'
                        }}
                    />
                )}
                <OrderDetail props={order} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: 'center',
                        marginTop: '20px'
                    }}
                >
                    <Button
                        onClick={() => {
                            (order.seatNumber === null && seatNumber === "") ? snapTicket() : success();
                        }}
                        disabled={!targetDate || currentDate < targetDate}
                        sx={{
                            marginTop: '20px',
                            padding: { xs: '8px 16px', sm: '10px 20px' },
                            cursor: 'pointer',
                            borderRadius: '20px',
                            border: '1px solid lightgray',
                            backgroundColor: targetDate && currentDate >= targetDate ? '#3337BF' : 'gray',
                            color: 'white',
                            width: { xs: '100%', sm: '200px' }, // Full width on small screens
                        }}
                    >
                        {(order.seatNumber === null && seatNumber === "") ? "Snap Ticket" : "Snap Success!"}
                    </Button>
                </Box>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Snackbar at the top center
                >
                    <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </MuiAlert>
                </Snackbar>
            </Box>
        </div>
    );
};

export default SnapHelpOrder;
