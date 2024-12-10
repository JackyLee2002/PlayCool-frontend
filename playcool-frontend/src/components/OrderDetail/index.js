import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const OrderDetail = () => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "auto",
          boxShadow: "0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "auto",
        }}
      >
        <CardMedia
          component="img"
          alt="Concert"
          height="140"
          image={
            "https://www.coldplay.com/wp/wp-content/uploads/2024/10/FM.webp"
          }
          title="Concert"
          sx={{ width: 150 }}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: "bold" }}>
            Music of the Spheres World
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Zayed Sports City, Abu Dhabi, United Arab Emirates
          </Typography>
        </CardContent>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "auto",
          p: 2,
        }}
      >
        <Typography variant="body2" component="p">
          Time: June 04, Mon. 08:00 pm
        </Typography>
        <Typography variant="body2" component="p">
          Seat: Section 1, Row D, Seat 106
        </Typography>
        <Typography variant="body2" component="p">
          Price: $399.00
        </Typography>
      </Box>
    </Card>
  );
};

export default OrderDetail;
