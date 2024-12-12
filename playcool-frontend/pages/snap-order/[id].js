import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, IconButton } from '@mui/material';
import OrderDetail from "@/src/components/OrderDetail";
import { AuthContext } from "@/src/context/AuthContext";
import { fetchOrder, fetchSnapTicket } from "@/src/components/api";
import { useRouter } from "next/router";
import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import QRCode from "react-qr-code";
import QrCodeIcon from '@mui/icons-material/QrCode';

const SnapOrder = () => {
    const [url, setURL] = useState("");
    const { token } = useContext(AuthContext);
    const [order, setOrder] = useState({});
    const router = useRouter();
    const [seatNumber, setSeatNumber] = useState("");
    const [targetDate, setTargetDate] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!router.query.id) {
            return;
        }
        if (router.query.id) {
            setURL(`${window.location.origin}/snap-help-order/${router.query.id}`);
        }
        fetchOrderData(router.query.id);
    }, [router]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchOrderData = async (id) => {
        if (id && token) {
            const response = await fetchOrder(id, token);
            setOrder(response);
            if (response.concertDate) {
                const concertDate = new Date(response.concertDate);
                concertDate.setDate(concertDate.getDate() - 31);
                setTargetDate(concertDate);
            }
        }
    };
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

    const snapTicket = async () => {
        const response = await fetchSnapTicket(router.query.id,token);
        setOrder(response);
    };

    const success = async () => {
        await router.push(`/pay-order/${router.query.id}`);
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

        return (
            <div style={{minHeight: '77vh', display: 'flex', flexDirection: 'column'}}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '20px',
                        borderRadius: '10px',
                        width: '1200px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)',
                        backgroundColor: 'rgba(50,50, 50, 0.1)',
                        height: '635px',
                        margin: 'auto',
                        marginTop: '50px',
                        marginBottom: '50px'
                    }}
                >
                    <Typography variant="h4" sx={{marginBottom: '20px', color: 'white', fontWeight : 'bold',  textShadow: '0 10px 10px rgba(0, 0, 0, 0.5)'}}>
                        SHARE WITH YOUR FREINDS
                    </Typography>

                {targetDate && (
                    <FlipClockCountdown
                        to={targetDate}
                        hideOnComplete={false}
                        className="flip-clock"
                        labels={['Days', 'Hours', 'Minutes', 'Seconds']}
                        labelStyle={{ fontSize: '14px' }}
                        digitBlockStyle={{ width: 50, height: 60, fontSize: 40, fontWeight: 'bold', color: new Date(targetDate) - new Date() <= 24 * 60 * 60 * 1000 ? 'red' : 'white' }}
                    />
                )}

                <OrderDetail props={order} />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        marginTop: '20px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            marginTop: '20px'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '10px'
                            }}
                        >
                            <Typography variant="h5" sx={{ color: 'white', fontWeight : 'bold',  textShadow: '0 10px 10px rgba(0, 0, 0, 0.5)' , padding: '0px', marginRight: '10px' }}>
                                Shareable Link:
                            </Typography>

                            <input
                                type="text"
                                value={url}
                                readOnly
                                style={{
                                    padding: '5px',
                                    border: '1px solid lightgray',
                                    borderRadius: '5px',
                                    flex: 1,
                                    width: '300px'
                                }}
                            />
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(url);
                                    const button = document.getElementById("copyButton");
                                    button.innerText = "✔";
                                    button.style.backgroundColor = "green";
                                    setTimeout(() => {
                                        button.innerText = "Copy";
                                        button.style.backgroundColor = "#3337BF";
                                    }, 2000);
                                }}
                                id="copyButton"
                                style={{
                                    marginLeft: '10px',
                                    padding: '5px 20px',
                                    cursor: 'pointer',
                                    borderRadius: '10px',

                                    backgroundColor: '#3337BF',
                                    color: 'white',
                                }}
                            >
                                Copy
                            </button>
                            <IconButton
                                onClick={handleOpen}
                                sx={{
                                    marginLeft: '10px',
                                    padding: '5px',
                                    cursor: 'pointer',
                                    borderRadius: '20px',
                                    border: '1px solid lightgray',
                                    backgroundColor: '#3337BF',
                                    color: 'white',
                                }}
                            >
                                <QrCodeIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
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
                            (order.seatNumber === null && seatNumber === "") ? snapTicket() : success()
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
                        }}
                    >
                        {(order.seatNumber === null && seatNumber === "") ? "Snap Ticket" : "Success"}
                    </Button>
                </Box>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="qr-code-modal"
                aria-describedby="qr-code-modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(px)',
                }}
            >
                <Box
                    className={"bg-gradient-to-tr from-indigo-100 via-blue-250 via-20% to-blue-500"}
                    sx={{
                        position: 'relative',
                        width: 330,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: '12px',
                        animation: 'fadeIn 5s',
                    }}
                >
                    <Typography id="qr-code-modal" variant="h6" component="h2" sx={{ mb: 2 }}>
                        Scan to help Snap up Ticket
                    </Typography>
                    <QRCode value={url} size={150}  />
                    <Button onClick={handleClose} sx={{ mt: 2 }}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default SnapOrder;