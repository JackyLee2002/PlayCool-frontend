import {useEffect, useContext, useState} from "react";
import {AuthContext} from "../../src/context/AuthContext";
import {useRouter} from "next/router";
import {fetchOrders} from "../../src/components/api";
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Pagination,
    Box,
} from "@mui/material";
import AlarmIcon from '@mui/icons-material/Alarm';

export default function MyOrders() {
    const {user, token, loading} = useContext(AuthContext);
    const router = useRouter();

    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (!token || token == null) {
            return;
        }
        fetchOrders(token, page - 1, 10).then((data) => {
            setOrders(data.content);
            setTotalPages(data.totalPages);
        });
    }, [token, page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box sx={{minHeight: "80vh",maxWidth: "60%", marginLeft: "20%", marginTop:1}}>
            <Typography variant="h5" sx={{marginTop: "30px", textAlign: "center", color: 'white', fontWeight : 'bold',  textShadow: '0 10px 10px rgba(0, 0, 0, 0.5)'}}>
                My Orders
            </Typography>
            {orders &&
                orders.length > 0 &&
                orders.map((order) => (
                    <Card
                        key={order.orderId}
                        className="concert-card"
                        sx={{
                            marginTop: "10px",
                            marginBottom: "10px",
                            margin: "20px",
                            borderRadius: "12px",
                        }}
                    >
                        <CardContent sx={{display: "flex", flexDirection: "row"}}>
                            <CardMedia
                                component="img"
                                height="140"
                                sx={{
                                    width: "auto",
                                    height: "auto",
                                    maxHeight: 200,
                                    maxWidth: 200,
                                }}
                                image={order.concertImage}
                                alt={order.title}
                            />
                            <CardContent sx={{width: 500}}>
                                <Typography variant="h5" component="div">
                                    {order.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Venue: {order.venueName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Date: {new Date(order.concertDate).toLocaleString()}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color={new Date() > new Date(order.concertDate) ? "error.main" : "primary.main"}
                                >
                                    Status: {new Date() > new Date(order.concertDate) ? "Finished" : "Upcoming"}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{marginTop: 1}}
                                >
                                    {order.description && order.description.length > 100
                                        ? `${order.description.substring(0, 100)}...`
                                        : order.description}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    Created Time: {new Date(order.createdAt).toLocaleString()}
                                </Typography>
                                {order.paymentStatus === "COMPLETED"  && <Typography variant="body2" color="text.secondary">
                                    Paid Time: {new Date(order.updatedAt).toLocaleString()}
                                </Typography> }
                            </CardContent>
                            {
                                !(new Date() > new Date(order.concertDate) && order.seatNumber === null) ?
                                <Button
                                    variant="outlined"
                                    sx={{
                                        marginLeft: "auto",
                                        alignSelf: "flex-end",
                                        backgroundColor: "#3337BF",
                                        color: "deepblue",
                                        fontSize: "1rem",
                                        padding: "10px 20px",
                                        borderRadius: "12px",
                                    }}
                                    disabled={new Date() > new Date(order.concertDate) && order.seatNumber === null}
                                    hidden={new Date() > new Date(order.concertDate) && order.seatNumber === null}
                                    onClick={() => {
                                        if(order.paymentStatus === "COMPLETED"){
                                            router.push(`/order-detail/${order.orderId}`)
                                        }else {
                                            if(order.paymentStatus === "NONPAYMENT" && new Date() > new Date(order.concertDate).setDate(new Date(order.concertDate).getDate() - 30)){
                                                router.push(`/pay-order/${order.orderId}`)
                                            }else{
                                                router.push(`/snap-order/${order.orderId}`)
                                            }
                                        }

                                    }}

                                >
                                    <Typography sx={{color: "white"}}>
                                        {
                                            order.paymentStatus === "COMPLETED" ? <>View Ticket &rarr;</>  : order.paymentStatus === "NONPAYMENT" ? <>Pay &rarr;</> :  new Date() > new Date(order.concertDate).setDate(new Date(order.concertDate).getDate() - 30) ? <>Snap <AlarmIcon /></> :  <>Snap &rarr;</>
                                        }

                                    </Typography>
                                </Button> :
                                    <Typography  sx={{
                                        marginLeft: "auto",
                                        alignSelf: "flex-end",
                                        color: "red",
                                        fontSize: "1rem",
                                    }}>
                                        No Ticket
                                    </Typography>
                            }

                        </CardContent>
                    </Card>
                ))}
            <Box sx={{display: "flex", justifyContent: "center", mt: 4}}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Box>
    );
}
