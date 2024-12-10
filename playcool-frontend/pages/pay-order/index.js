import React, {useContext, useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';
import OrderDetail from "@/src/components/OrderDetail";
import {AuthContext} from "@/src/context/AuthContext";
import {fetchSnapTicket} from "@/src/components/api";

const PayOrder = ({orderId}) => {
    const {token} = useContext(AuthContext);


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                border: '1px solid lightgray',
                borderRadius: '10px',
                width: '500', // 可以根据实际情况调整宽度
            }}
        >
            <Typography variant="h3" sx={{marginBottom: '20px'}}>
                Share with you friends
                {token}
            </Typography>

            <OrderDetail/> {/* 在这里嵌入 OrderDetail 组件展示具体订单详情内容 */}
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
    );
};

export default PayOrder;