import React, {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import QRCode from "react-qr-code";
import {fetchOrder} from "@/src/components/api";
import {AuthContext} from "@/src/context/AuthContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Box, CardHeader, Typography} from '@mui/material';
import Image from "next/image";
import Divider from "@mui/material/Divider";

const OrderDetail = () => {
    const router = useRouter();
    const [order, setOrder] = useState(null);
    const {token} = useContext(AuthContext);
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

        console.log("fetching");

        fetchOrder(router.query.id, token).then((data) => {
            setOrder(data);
        });
    }, [token, router.query.id]);

    const orderStatusIcon = (status) => {
        switch (status) {
            case "PENDING":
                return <span style={{color: "orange"}}>⏳ Pending</span>;
            case "USED":
                return <span style={{color: "green"}}>✔️ Used</span>;
            case "REFUNDED":
                return <span style={{color: "red"}}>❌ Refunded</span>;
            case "UNUSED":
                return <span style={{color: "blue"}}>🔵 Unused</span>;
            default:
                return status;
        }
    };

    // const saveImage = () => {
    //     const cardElement = document.querySelector("div.MuiCard-root");
    //     html2canvas(cardElement).then((canvas) => {
    //         const link = document.createElement("a");
    //         link.href = canvas.toDataURL("image/png");
    //         link.download = "order_detail.png";
    //         link.click();
    //     });
    // };


    return (
        <>
            {order ? (

                <Card sx={{width: 600, margin: '0 auto', padding: '20px'}}>
                    <CardHeader
                        title="Order Detail"
                        // subheader="12排12座 12排13座"
                        sx={{textAlign: 'center'}}
                    />
                    <CardContent>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            {order.concertImage && hostUrl && (
                                <>
                                    <Image
                                        width={"300"}
                                        height={"200"}
                                        src={hostUrl + order.concertImage.toString()}
                                        alt="Concert"
                                    />
                                </>
                            )}
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="flex-start" marginLeft="100px"
                             marginTop="20px">
                            <Typography variant="body1">
                                <strong>Concert Name:</strong> {order.concertName}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Venue Name:</strong> {order.venueName}
                            </Typography>

                            <Typography variant="body1">
                                <strong>Area Name:</strong> {order.areaName}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Seat Number:</strong> {order.seatNumber}
                            </Typography>
                            <Divider style={{margin: '10px 0'}}/>
                            {/*<Typography variant="body1">*/}
                            {/*    <strong>Payment Status:</strong> {order.paymentStatus}*/}
                            {/*</Typography>*/}
                            <Typography variant="body1">
                                <strong>Payment Status:</strong> {order.paymentStatus === "COMPLETED" ? (
                                <span style={{color: "green"}}>✔️ Completed</span>
                            ) : order.paymentStatus === "PENDING" ? (
                                <span style={{color: "orange"}}>⏳ Pending</span>
                            ) : (
                                order.paymentStatus
                            )}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Order Status:</strong>
                                {orderStatusIcon(order.orderStatus)}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Created At:</strong> {new Date(order.createdAt).toLocaleString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                            })}
                            </Typography>
                            {order.paymentStatus === "COMPLETED" && (
                                <Typography variant="body1">
                                    <strong>Paid Time:</strong> {new Date(order.updatedAt).toLocaleString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric'
                                })}
                                </Typography>
                            )}

                            <Typography variant="body1" sx={{display: "flex", alignItems: "center"}}>
                                <strong>Price:</strong>
                                {order.paymentMethod === "WX" ? (
                                    <img src="/wxpay.png" alt="WechatPay"
                                         style={{
                                             width: '24px',
                                             height: '24px',
                                             marginRight: '10px',
                                             marginLeft: '10px'
                                         }}/>
                                ) : (
                                    <Image src="/alipay.png" alt="Alipay" width={24} height={24}
                                           style={{marginRight: '10px', marginLeft: '10px'}}/>
                                )}${order.price}

                            </Typography>
                            <Divider style={{margin: '10px 0'}}/>
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Typography variant="h6" gutterBottom>
                                Physical Ticket Exchange Code
                            </Typography>
                            <Box sx={{marginTop: 2, marginBottom: 2}}>
                                <QRCode value={JSON.stringify(order)} size={200}/>
                            </Box>
                        </Box>
                    </CardContent>

                </Card>
            ) : (
                "Order not found"
            )}
        </>
    );
};

export default OrderDetail;