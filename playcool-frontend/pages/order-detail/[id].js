import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import QRCode from "react-qr-code";
import { fetchOrder } from "@/src/components/api";
import { AuthContext } from "@/src/context/AuthContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, CardHeader, Typography } from "@mui/material";
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
        return <span style={{ color: "orange" }}> Unused</span>;
      default:
        return status;
    }
  };

  return (
    <div>
      {order ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "0",
              marginTop: "17%",
              marginBottom: "20%",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                zIndex: 1,
                height: "90%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                borderRadius: "20px",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  zIndex: 2,
                  height: "80%",
                  width: "90%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "20px",
                }}
              >
                <Card
                  sx={{
                    width: "50%",
                    padding: "10px",
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    gap: "1px",
                    alignItems: "start",
                    height: "350px",
                    borderRadius: "12px",
                    background: `radial-gradient(circle at right top, transparent 16px, white 0) right top / 100% 50% no-repeat, radial-gradient(circle at right bottom, transparent 16px, white 0) right bottom / 100% 50% no-repeat;`,
                  }}
                >
                  <Box
                    sx={{
                      paddingRight: 0,
                      ml: "25px",
                      mt: "20px",
                      width: "100%",
                    }}
                  >
                    {order.concertImage && hostUrl && (
                      <Image
                        width={"250"}
                        height={"200"}
                        style={{
                          marginTop: "30px",
                          borderRadius: "6px",
                          boxShadow: "5px 2px 10px 1px rgba(0,0,0,0.8)",
                        }}
                        src={hostUrl + order.concertImage.toString()}
                        alt="Concert"
                      />
                    )}
                  </Box>
                  <CardContent
                    sx={{
                      paddingRight: "5px",
                      display: "grid",
                      // gridTemplateColumns: '1fr 1fr',
                      gap: "1px",
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      marginLeft="30px"
                      marginTop="40px"
                    >
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "1.6rem", color: "#545be0" }}
                      >
                        <strong>🎵 {order.concertName} </strong>
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "1.2rem", mt: "2%" }}
                      >
                        <strong>
                          📅 {new Date(order.concertDate).toLocaleDateString()}{" "}
                          {new Date(order.concertDate).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </strong>{" "}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "1.2rem", mt: "2%" }}
                      >
                        <strong>
                          🏠 {order.venueName} {order.areaName}{" "}
                          {order.seatNumber}
                        </strong>
                      </Typography>
                      {/*<Typography variant="body1" sx={{ fontSize: '1.2rem', mt: "5%" }}>*/}
                      {/*    <strong>📦 Order Status:</strong> {orderStatusIcon(order.orderStatus)}*/}
                      {/*</Typography>*/}
                      <Typography
                        variant="body1"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "1.2rem",
                          mt: "2%",
                        }}
                      >
                        <strong>💵 Price:</strong>
                        {order.paymentMethod === "WX" ? (
                          <img
                            src="/wxpay.png"
                            alt="WechatPay"
                            style={{
                              width: "24px",
                              height: "24px",
                              marginRight: "10px",
                              marginLeft: "10px",
                            }}
                          />
                        ) : (
                          <Image
                            src="/alipay.png"
                            alt="Alipay"
                            width={24}
                            height={24}
                            style={{ marginRight: "10px", marginLeft: "10px" }}
                          />
                        )}
                        ${order.price} USD
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "1.2rem", mt: "2%" }}
                      >
                        <strong>📦Status:</strong>{" "}
                        {orderStatusIcon(order.orderStatus)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: "17%",
                    pt: "20px",
                    pb: "20px",
                    pl: "0",
                    pr: "0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "350px",
                    borderRadius: "12px",
                    background: `radial-gradient(circle at left top, transparent 16px, white 0) left top / 100% 50% no-repeat, radial-gradient(circle at left bottom, transparent 16px, white 0) left bottom / 100% 50% no-repeat;`,
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      backgroundColor: "white",
                      width: "100%",
                      height: "80%",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      🎫Ticket Exchange Code
                    </Typography>
                    <Box sx={{ marginTop: 1, marginBottom: 2 }}>
                      <QRCode value={JSON.stringify(order)} size={200} />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            color: "white",
          }}
        >
          <Typography variant="h4">Order not found</Typography>
        </Box>
      )}
    </div>
  );
};

export default OrderDetail;
