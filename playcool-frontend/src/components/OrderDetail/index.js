import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const OrderDetail = ({ props }) => {
  const [hostUrl, setHostUrl] = useState("");
  useEffect(() => {
    if (window) {
      setHostUrl(window.location.protocol + "//" + window.location.host);
    }
  }, []);

  let imageUrl = props?.concertImage;
  if (imageUrl && !imageUrl.includes("http")) {
    imageUrl = `${hostUrl}/${imageUrl}`;
  }

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "auto",
        boxShadow: "0",
          backgroundColor: "transparent",
          color: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <CardMedia
          component="img"
          alt="Concert"
          height="140"
          image={
            imageUrl ||
            "https://www.coldplay.com/wp/wp-content/uploads/2024/10/FM.webp"
          }
          title="Concert"
          sx={{ width: 150 }}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: "bold" }}>
            {props.concertName}
          </Typography>
          <Typography variant="body2" component="p">
            {props.venueName}
          </Typography>
        </CardContent>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",

          p: 3,
          ml: "1250px",
        }}
      >
        <Typography
          variant="body2"
          component="p"
          sx={{ fontSize: "16px", paddingBottom: "3px" }}
        >
          <strong>Time:</strong> {props.concertDate}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          sx={{ fontSize: "16px", paddingBottom: "3px" }}
        >
          <strong>Area:</strong> {props.areaName}
        </Typography>
        {props.seatNumber ? (
          <Typography
            variant="body2"
            component="p"
            sx={{ fontSize: "16px", paddingBottom: "3px" }}
          >
            <strong>SeatNumber:</strong> {props.seatNumber}
          </Typography>
        ) : null}
        <Typography
          variant="body2"
          component="p"
          sx={{ fontSize: "16px", paddingBottom: "3px" }}
        >
          <strong>Price:</strong> ${props.price}
        </Typography>
      </Box>
    </Card>
  );
};

export default OrderDetail;
