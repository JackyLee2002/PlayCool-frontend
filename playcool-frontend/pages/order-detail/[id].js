import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import QRCode from "react-qr-code";
import { fetchOrder } from "@/src/components/api";
import { AuthContext } from "@/src/context/AuthContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, CardHeader, Typography } from '@mui/material';
import Image from "next/image";
import Divider from "@mui/material/Divider";
import styles from "./OrderDetail.module.css";

const OrderDetail = () => {
    const router = useRouter();
    const [order, setOrder] = useState(null);
    const { token } = useContext(AuthContext);
    const [hostUrl, setHostUrl] = useState("");

    useEffect(() => {
        if (window) {
            setHostUrl(window.location.protocol + "//" + window.location.host + "/");
        }
    }, []);

    useEffect(() => {
        if (!token || token == null || !router.query.id) {
            return;
        }

        fetchOrder(router.query.id, token).then((data) => {
            setOrder(data);
        });
    }, [token, router.query.id]);

    const orderStatusIcon = (status) => {
        switch (status) {
            case "PENDING":
                return <span style={{ color: "orange" }}>⏳ Pending</span>;
            case "USED":
                return <span style={{ color: "green" }}>✔️ Used</span>;
            case "REFUNDED":
                return <span style={{ color: "red" }}>❌ Refunded</span>;
            case "UNUSED":
                return <span style={{ color: "blue" }}>🔵 Unused</span>;
            default:
                return status;
        }
    };

    return (
        <>
            {order ? (
                <Card sx={{
                    width: '80%',
                    margin: '0 auto',
                    marginTop: '100px',
                    marginBottom: '200px',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <CardHeader title="Order Detail" sx={{ fontSize: '2rem' }} />
                    <CardContent sx={{ flex: 0, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Box display="flex" flexDirection="column" alignItems="center" sx={{ paddingRight: '10px' }}>
                            {order.concertImage && hostUrl && (
                                <Image
                                    width={"300"}
                                    height={"200"}
                                    src={hostUrl + order.concertImage.toString()}
                                    alt="Concert"
                                />
                            )}
                        </Box>
                        <CardContent sx={{ flex: 2, paddingRight: '10px' }}>
                            <Box display="flex" flexDirection="column" alignItems="flex-start" marginLeft="50px" marginTop="20px">
                                <Typography variant="body1" sx={{ fontSize: '1.6rem' }}>
                                    <strong>🎵 {order.concertName} </strong>
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                                    <strong>🏠 {order.venueName}</strong>
                                </Typography>

                                <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                                    <strong>💺 Seat Number:</strong>  {order.areaName}{order.seatNumber}
                                </Typography>
                                <Divider style={{ margin: '10px 0' }} />
                                <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                                    <strong>💳 Payment Status:</strong> {order.paymentStatus === "COMPLETED" ? (
                                        <span>✔️ <p>{new Date(order.updatedAt).toLocaleString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                        })}</p></span>
                                    ) : order.paymentStatus === "PENDING" ? (
                                        <span style={{ color: "orange" }}>⏳ Pending</span>
                                    ) : (
                                        order.paymentStatus
                                    )} {order.paymentStatus === "COMPLETED" && (
                                    <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>

                                    </Typography>
                                )}
                                </Typography>

                                <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                                    <strong>📦 Order Status:</strong> {orderStatusIcon(order.orderStatus)}
                                </Typography>
                                {/*<Typography variant="body1" sx={{ fontSize: '1.2rem' }}>*/}
                                {/*    <strong>📅 Created Time:</strong> {new Date(order.createdAt).toLocaleString('en-US', {*/}
                                {/*        month: 'short',*/}
                                {/*        day: 'numeric',*/}
                                {/*        year: 'numeric',*/}
                                {/*        hour: 'numeric',*/}
                                {/*        minute: 'numeric'*/}
                                {/*    })}*/}
                                {/*</Typography>*/}
                                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", fontSize: '1.2rem' }}>
                                    <strong>💵 Price:</strong>
                                    {order.paymentMethod === "WX" ? (
                                        <img src="/wxpay.png" alt="WechatPay" style={{
                                            width: '24px',
                                            height: '24px',
                                            marginRight: '10px',
                                            marginLeft: '10px'
                                        }} />
                                    ) : (
                                        <Image src="/alipay.png" alt="Alipay" width={24} height={24} style={{ marginRight: '10px', marginLeft: '10px' }} />
                                    )}${order.price}
                                </Typography>
                                <Divider style={{ margin: '10px 0' }} />
                            </Box>
                        </CardContent>
                        <CardContent sx={{
                            flex: 2,
                            paddingLeft: '60px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <Typography variant="h6" gutterBottom>
                                🎫Ticket Exchange Code
                            </Typography>
                            <Box sx={{ marginTop: 1, marginBottom: 2 }}>
                                <QRCode value={JSON.stringify(order)} size={200} />
                            </Box>
                        </CardContent>
                    </CardContent>
                </Card>
            ) : (
                "Order not found"
            )}
        </>
    );
};

export default OrderDetail;