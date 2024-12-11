import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import OrderDetail from "@/src/components/OrderDetail";
import { AuthContext } from "@/src/context/AuthContext";
import { fetchOrder, fetchSnapTicket } from "@/src/components/api";
import { useRouter } from "next/router";

const SnapOrder = () => {
    const [url, setURL] = useState("");
    const { token } = useContext(AuthContext);
    const [order, setOrder] = useState({});
    const router = useRouter();
    const [countdown, setCountdown] = useState("");

    useEffect(() => {
        if (!router.query.id) {
            return;
        }
        if (router.query.id) {
            setURL(`${window.location.origin}/snap-order-help/${router.query.id}`);
        }
        fetchOrderData(router.query.id);
    }, [router]);

    const fetchOrderData = async (id) => {
        if (id && token) {
            const response = await fetchOrder(id, token);
            setOrder(response);
            if (response.concertDate) {
                startCountdown(response.concertDate);
            }
        }
    };

    const snapTicket = async () => {
        await fetchSnapTicket(router.query.id, token);
        await router.push(`/pay-order/${router.query.id}`);
    };

    const startCountdown = (concertDate) => {
        const targetDate = new Date(concertDate);
        targetDate.setDate(targetDate.getDate() + 30);

        const updateCountdown = () => {
            const now = new Date();
            const timeDifference = targetDate - now;

            if (timeDifference <= 0) {
                setCountdown("抢票倒计时结束!");
            } else {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                const countdownText = `${days}days${hours}hours${minutes}minutes${seconds}seconds`;
                if (timeDifference <= 5 * 60 * 1000) { // last 5 minutes
                    setCountdown(<span style={{ color: 'red' }}>{countdownText}</span>);
                } else {
                    setCountdown(countdownText);
                }
            }
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    };

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
                    Share with you friends
                </Typography>

                <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                    Countdown:{countdown}
                </Typography>

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
                    <button
                        onClick={() => {
                            if (countdown === "抢票倒计时结束!") {
                                snapTicket();
                            } else {
                                alert("未到抢票时间");
                            }
                        }}
                        disabled={countdown !== "抢票倒计时结束!"}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            borderRadius: '20px',
                            border: '1px solid lightgray',
                            backgroundColor: countdown === "抢票倒计时结束!" ? '#3337BF' : 'gray',
                            color: 'white',
                            width: '200px',

                        }}
                    >
                        Snap Ticket
                    </button>
                </Box>
            </Box>
        </div>
    );
};

export default SnapOrder;