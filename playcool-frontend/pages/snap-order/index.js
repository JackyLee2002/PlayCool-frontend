import React, {useContext, useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';
import OrderDetail from "@/src/components/OrderDetail";
import {AuthContext} from "@/src/context/AuthContext";
import {fetchSnapTicket} from "@/src/components/api";
import {router} from "next/client";

const SnapOrder = ({orderId}) => {
    const [url, setURL] = useState("");
    const {token} = useContext(AuthContext);
    const [order, setOrder] = useState({});
    useEffect(() => {
        if (typeof window !== undefined) {
            setURL(window.location.href);
        }
    }, []);

    const snapTicket = async () => {
        // Implement the logic to snap a ticket here
        console.log("Ticket snapped!");
        const response = await fetchSnapTicket(orderId, token);
        setOrder(response);
        // navigate to the pay page
        await router.push(`/pay-order/${orderId}`);
    };

    return (
        <div style={{minHeight: '77vh', display: 'flex', flexDirection: 'column'}}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px',
                    border: '1px solid lightgray',
                    borderRadius: '10px',
                    width: '1200px', // Set a fixed width
                    height: '550px', // Set a fixed height
                    margin: 'auto' // Center horizontally
                }}
            >
                <Typography variant="h3" sx={{marginBottom: '20px'}}>
                    Share with you friends
                    {token}
                </Typography>

                <OrderDetail order={{"order":1}}/>
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
                            <Typography variant="h5" sx={{marginRight: '10px'}}>
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
                        onClick={snapTicket}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            borderRadius: '20px',
                            border: '1px solid lightgray',
                            backgroundColor: '#3337BF',
                            color: 'white',
                            width: '200px'
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