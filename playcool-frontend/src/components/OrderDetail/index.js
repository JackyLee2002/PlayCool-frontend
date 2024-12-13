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
    <div style={{ margin: "0 auto" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          width: { xs: "100%", md: "fit-content" },
          boxShadow: "0",
          backgroundColor: "transparent",
          color: "white",
          height: { xs: "auto", md: "200px" },
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
          sx={{ width: { xs: "100%", md: 250 } }}
        />
        <Box
          sx={{
            display: "flex",
            marginLeft: { xs: "0", md: "90px" },
            flexDirection: "column",
            width: "100%",
            marginTop: { xs: "10px", md: "30px" },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              padding: "0px",
              marginLeft: { xs: "0", md: "44px" },
            }}
          >
            <Typography
              noWrap
              variant="h4"
              component="h2"
              sx={{ fontWeight: "bold" }}
            >
              {props.concertName}
            </Typography>
            <Typography variant="body2" component="p">
              {props.venueName}
            </Typography>
          </CardContent>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              width: "100%",
              p: 3,
              mb: "20px",
              ml: { xs: "0", md: "20px" },
            }}
          >
            <Typography variant="body2" component="p" sx={{ fontSize: "16px" }}>
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
        </Box>
      </Card>
    </div>
  );
};

export default OrderDetail;
