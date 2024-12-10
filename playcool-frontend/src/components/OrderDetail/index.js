import {Card, CardContent, CardMedia, Typography, Box} from "@mui/material";

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
                    width: "100%",
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
                    sx={{width: 150}}
                />
                <CardContent sx={{textAlign: "center"}}>
                    <Typography variant="h4" component="h2" sx={{fontWeight: "bold"}}>
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
                    width: "100%",

                    p: 3,
                    ml: "1250px"
                }}
            >
                <Typography variant="body2" component="p" sx={{fontSize: "16px", paddingBottom: "3px"}}>
                    <strong>Time:</strong> June 04, Mon. 08:00 pm
                </Typography>
                <Typography variant="body2" component="p" sx={{fontSize: "16px", paddingBottom: "3px"}}>
                    <strong>Seat:</strong> Section 1, Row D, Seat 106
                </Typography>
                <Typography variant="body2" component="p" sx={{fontSize: "16px", paddingBottom: "3px"}}>
                    <strong>Price:</strong> $399.00
                </Typography>
            </Box>
        </Card>
    );
};

export default OrderDetail;