import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import styles from "./ConcertHomePageSection.module.css";
import { useRouter } from "next/router";
import { fetchConcerts } from "@/src/components/api";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const ConcertHomePageSection = () => {
    const [concerts, setConcerts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchConcerts().then((data) => {
            setConcerts(data);
        });
    }, []);

    const latestConcert = concerts[0]; // Assuming the latest concert is the first in the array
    const isConcertUpcoming = latestConcert && new Date(latestConcert.dateTime) > new Date();

    const handleConcertClick = (concert) => {
        router.push(`/concert-detail/${concert.concertId}`);
    };

    return (
        <Box className={styles.ConcertHomePageSection}>
            <div className={styles.stars}>
                {[...Array(900)].map((_, i) => (
                    <div key={i} className={styles.star} style={{
                        top: `${Math.random() * 200}%`,
                        left: `${Math.random() * 200}%`,
                        animationDuration: `${Math.random() * 2 + 1}s`
                    }}></div>
                ))}
            </div>
            <Typography sx={{mr: isConcertUpcoming ? "5%": "0%", fontSize: "2rem", textShadow: "4px 6px 4px #000"}} className={styles.sectionTitle} variant="h4" component="h1" gutterBottom textAlign="center">
                {isConcertUpcoming ? "UPCOMING CONCERT ON SALE" : "NO UPCOMING CONCERTS"}
            </Typography>
            {isConcertUpcoming && (
                <Card
                    className={styles.ConcertHomePageCard}
                    key={latestConcert.concertId}
                    onClick={() => handleConcertClick(latestConcert)}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        borderRadius: 2,
                        overflow: "hidden",
                        marginBottom: 2,
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "darkblue",
                            color: "white",
                            padding: 2,
                            borderTopLeftRadius: 8,
                            borderBottomLeftRadius: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: 100,
                            height: "160px",
                            width: "120px",
                        }}
                    >
                        <EventIcon/>
                        <Typography variant="body2" sx={{mt: "5px", mb: "5px"}}>
                            {new Date(latestConcert.dateTime).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                            {new Date(latestConcert.dateTime).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </Typography>
                    </Box>
                    <CardMedia
                        component="img"
                        height="140"
                        sx={{
                            width: "auto",
                            height: "auto",
                            maxHeight: 200,
                            maxWidth: 200,
                        }}
                        image={latestConcert.concertImage}
                        alt={latestConcert.title}
                    />
                    <CardContent sx={{flex: 1}}>
                        <Typography variant="h5" component="div">
                            {latestConcert.title}
                        </Typography>
                        <Box sx={{display: "flex", alignItems: "center", marginTop: 1}}>
                            <LocationOnIcon/>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{marginLeft: 1}}
                            >
                                {latestConcert.venue.city}
                            </Typography>
                        </Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{marginLeft: 4}}
                        >
                            {latestConcert.venue.name}
                        </Typography>
                        <Box sx={{display: "flex", alignItems: "center", marginTop: 1}}>
                            <ConfirmationNumberIcon/>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{marginLeft: 1}}
                            >
                                <Typography
                                    variant="body2"
                                    color={
                                        new Date(latestConcert.dateTime) < new Date()
                                            ? "red"
                                            : latestConcert.availableSeats <= 0
                                                ? "text.secondary"
                                                : "green"
                                    }
                                >
                                    {new Date(latestConcert.dateTime) < new Date()
                                        ? "Event Passed"
                                        : latestConcert.availableSeats <= 0
                                            ? "Sold Out!"
                                            : latestConcert.availableSeats === 1
                                                ? "1 Ticket Available!"
                                                : latestConcert.availableSeats + " Tickets Available!"}
                                </Typography>
                            </Typography>
                        </Box>
                    </CardContent>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/concert-detail/${latestConcert.concertId}`);
                        }}
                        disabled={new Date(latestConcert.dateTime) < new Date()}
                        sx={{
                            marginRight: 2,
                            marginBottom: 2,
                            alignSelf: "flex-end",
                            borderColor: "#3337BF",
                            color: "#3337BF",
                            fontSize: "1rem",
                            padding: "5px 10px",
                            borderRadius: "10px",
                            "&:hover": {
                                borderColor: "lightpurple",
                                backgroundColor: "rgba(0, 0, 119, 0.1)",
                            },
                        }}
                    >
                        {new Date(latestConcert.dateTime) < new Date() ? "Passed" : "PRE-SALE!"}
                    </Button>
                </Card>
            )}
        </Box>
    );
};

export default ConcertHomePageSection;