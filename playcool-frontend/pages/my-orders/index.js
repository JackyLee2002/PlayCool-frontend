import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../src/context/AuthContext";
import { useRouter } from "next/router";
import { fetchOrders } from "../../src/components/api";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export default function MyOrders() {
  const { user, token, loading } = useContext(AuthContext);
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  // on load, first check if the user is authenticated using the context
  // if the user is not authenticated, redirect to the home page
  // if the user is authenticated, fetch the user's orders
  // if the user has no orders, display a message

  // if the user has orders, display the orders
  // each order should have a link to the order details page
  // the order details page should display the order details

  useEffect(() => {
    if (!token || token == null) {
      return;
    }
    fetchOrders(token).then((data) => {
      setOrders(data);
    });
  }, [token]);

  return (
    <div style={{ minHeight: "80vh" }}>
      {/* center this text in the middle and make it white and h3 */}
      <Typography variant="h5" sx={{ textAlign: "center" }}>
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
            <CardContent sx={{ display: "flex", flexDirection: "row" }}>
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
              <CardContent sx={{ width: 500 }}>
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
                  color={order.finished ? "error.main" : "primary.main"}
                >
                  Status: {order.finished ? "Finished" : "Upcoming"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginTop: 1 }}
                >
                  {order.description && order.description.length > 100
                    ? `${order.description.substring(0, 100)}...`
                    : order.description}
                </Typography>
              </CardContent>
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
                onClick={() => router.push(`/order-detail/${order.orderId}`)}
              >
                <Typography sx={{ color: "white" }}>
                  View Details &rarr;
                </Typography>
              </Button>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
