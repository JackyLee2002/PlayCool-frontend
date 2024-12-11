import React, { useContext, useEffect, useState } from 'react';
import {Box, Button, Typography} from '@mui/material';
import OrderDetail from "@/src/components/OrderDetail";
import { AuthContext } from "@/src/context/AuthContext";
import {fetchNoAuthSnapTicket, fetchOrder, fetchSnapTicket} from "@/src/components/api";
import { useRouter } from "next/router";
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

const SnapOrder = () => {
    const [url, setURL] = useState("");
    const { token } = useContext(AuthContext);
    const [order, setOrder] = useState({});
    const router = useRouter();
    const [targetDate, setTargetDate] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());

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
                concertDate.setDate(concertDate.getDate()-31);
                setTargetDate(concertDate);
            }
        }
    };

    const snapTicket = async () => {
        const response = await fetchNoAuthSnapTicket(router.query.id)
        setOrder(response);
    };

    const success = async () => {
        await router.push(`/pay-order/${router.query.id}`);
    }

    return (
        <div style={{ minHeight: '77vh', display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px',
                    border: '1px solid lightgray',
                    borderRadius: '10px',
                    width: '1200px',
                    margin: 'auto'
                }}
            >
                <Typography variant="h3" sx={{ marginBottom: '20px' }}>
                    Share With Your Friends
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
                            <Typography variant="h5" sx={{ marginRight: '10px' }}>
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
                                    borderRadius: '20px',
                                    border: '1px solid lightgray',
                                    backgroundColor: '#3337BF',
                                    color: 'white',
                                }}
                            >
                                Copy
                            </button>
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
                            order.seatNumber === null ? snapTicket() : success()
                        }}
                        disabled={!targetDate || currentDate < targetDate}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            borderRadius: '20px',
                            border: '1px solid lightgray',
                            backgroundColor: targetDate && currentDate >= targetDate ? '#3337BF' : 'gray',
                            color: 'white',
                            width: '200px',
                        }}
                    >
                        {order.seatNumber === null ? "Snap Ticket" : "Success"}
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default SnapOrder;