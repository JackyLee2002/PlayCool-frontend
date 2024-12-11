import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import QRCode from "react-qr-code";
import { fetchOrder } from "@/src/components/api";
import { useContext } from "react";
import { AuthContext } from "@/src/context/AuthContext";
import Image from "next/image";

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

    console.log("fetching");

    fetchOrder(router.query.id, token).then((data) => {
      setOrder(data);
    });
  }, [token, router.query.id]);

  return (
    <>
      {order ? (
        <div style={{ minHeight: "80vh", padding: "20px" }}>
          <Typography variant="h5" sx={{ textAlign: "center", mt: "50px" }}>
            Order Details
          </Typography>
          <div style={{ marginTop: "20px" }}>
            <Typography variant="body1">
              <strong>Order ID:</strong> {order.orderId}
            </Typography>
            <Typography variant="body1">
              <strong>Concert Name:</strong> {order.concertName}
            </Typography>
            <Typography variant="body1">
              <strong>Concert Date:</strong> {order.concertDate}
            </Typography>
            <Typography variant="body1">
              <strong>Concert Image:</strong>{" "}
            </Typography>
            {order.concertImage && hostUrl && (
              <>
                <Image
                  width={"200"}
                  height={"200"}
                  src={hostUrl + order.concertImage.toString()}
                  alt="Concert"
                />
              </>
            )}

            <Typography variant="body1">
              <strong>Area Name:</strong> {order.areaName}
            </Typography>
            <Typography variant="body1">
              <strong>Seat Number:</strong> {order.seatNumber}
            </Typography>
            <Typography variant="body1">
              <strong>Venue Name:</strong> {order.venueName}
            </Typography>
            <Typography variant="body1">
              <strong>Price:</strong> {order.price}
            </Typography>
            <Typography variant="body1">
              <strong>Payment Method:</strong> {order.paymentMethod}
            </Typography>
            <Typography variant="body1">
              <strong>Payment Status:</strong> {order.paymentStatus}
            </Typography>
            <Typography variant="body1">
              <strong>Order Status:</strong> {order.orderStatus}
            </Typography>
            <Typography variant="body1">
              <strong>Created At:</strong> {order.createdAt}
            </Typography>
            <Typography variant="body1">
              <strong>Updated At:</strong> {order.updatedAt}
            </Typography>
          </div>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <QRCode value={JSON.stringify(order)} />
          </div>
        </div>
      ) : (
        "Order not found"
      )}
    </>
  );
};

export default OrderDetail;
