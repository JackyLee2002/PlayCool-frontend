import React, {useContext, useState} from 'react';
import {Box, Typography} from '@mui/material';
import OrderDetail from "@/src/components/OrderDetail";
import {AuthContext} from "@/src/context/AuthContext";
import {fetchPayOrder} from "@/src/components/api";
import {router} from "next/client";

const PayOrder = ({orderId}) => {
    const [payment, setPayment] = useState("WX");
    const {token} = useContext(AuthContext);

    const payOrder = async () => {
        // Implement the logic to pay the order here
        console.log("Order paid!");
        const response = await fetchPayOrder(orderId, token, payment);
        console.log(response);
        // navigate to the order-list page
         await router.push(`/order-list`);
    }
    console.log(payment)
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
                    Pay Order
                    {token}
                </Typography>
                <OrderDetail/> {/* 在这里嵌入 OrderDetail 组件展示具体订单详情内容 */}

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row', // 修改为横向排列
                        alignItems: 'center',
                        marginTop: '20px'
                    }}
                >
                    <Typography variant="h6" sx={{marginRight: '20px'}}>
                        Please Select Payment Method:
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            cursor: 'pointer',
                            marginRight: '20px',
                            borderColor: payment === 'WX' ? 'blue' : 'lightgray', // 选中时边框颜色变化
                            opacity: payment === 'WX' ? 1 : 0.5 // Highlight selected icon
                        }}
                        onClick={() => setPayment('WX')}
                    >
                        <input
                            type="checkbox"
                            checked={payment === 'WX'}
                            onChange={() => setPayment('WX')}
                            style={{ marginRight: '10px' }}
                        />
                        <img src="/wxpay.png" alt="WX Icon" style={{width: '26px', height: '26px'}}/>
                        <Typography variant="body1">WechatPay</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            cursor: 'pointer',
                            borderColor: payment === 'Ali' ? 'blue' : 'lightgray', // 选中时边框颜色变化
                            opacity: payment === 'Ali' ? 1 : 0.5 // Highlight selected icon
                        }}
                        onClick={() => setPayment('Ali')}
                    >
                        <input
                            type="checkbox"
                            checked={payment === 'Ali'}
                            onChange={() => setPayment('Ali')}
                            style={{ marginRight: '10px' }}
                        />
                        <img src="/alipay.png" alt="Ali Icon" style={{width: '22px', height: '22px'}}/>
                        <Typography variant="body1">AliPay</Typography>
                    </Box>
                </Box>
                <Box
                    onClick={payOrder}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column', // 修改为纵向排列
                        alignItems: 'center',
                        marginTop: '20px'
                    }}
                >
                    <button
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
                        Pay Order
                    </button>
                </Box>
            </Box>

        </div>
    );
};

export default PayOrder;