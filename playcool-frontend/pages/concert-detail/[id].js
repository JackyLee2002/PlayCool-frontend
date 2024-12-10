import React, { useEffect, useState } from 'react';
import {Typography, Button, Box, CardMedia, CardContent, Card} from '@mui/material';
import {fetchAvailableSeats, fetchConcert} from "@/src/components/api";
import {useRouter} from "next/router";
import OrderDetail from "@/src/components/OrderDetail";
import StepperBar from "@/src/components/StepperBar";

const ConcertDetail = () => {
    const route = useRouter();
    const [concert, setConcert] = useState(null);
    const [ticketData, setTicketData] = useState({});

    useEffect(() => {
        console.log(route);
        if (!route.query.id) {
            return;
        }
        const concertId  = route.query.id;
        fetchConcert(concertId).then((data) => {
            setConcert(data);
            fetchAvailableSeats(data.venue.venueId).then((availableSeats) => {
                console.log(availableSeats);
                setTicketData(availableSeats);
            });
        })
    }, [route]);

    if (!concert) {
        return <div>No concert details available.</div>;
    }

    return (
        <div>
            <div>
                <StepperBar index={1}></StepperBar>
                <Card
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "auto",
                        marginTop: 6
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
                                {concert.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {concert.venue.city + ", " + concert.venue.location}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Time: {concert.dateTime}
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
                {/*<Image src={concert.seatsImage} />*/}

                <Box display="flex" flexWrap="wrap" spacing={2}>
                    {ticketData && ticketData.length > 0 && ticketData.map((data) => (
                        <Box key={data.areaName} sx={{ flex: '1 1 25%', padding: 1 }}>
                            {/*<Typography variant="h6">${price}</Typography>*/}
                            <Typography variant="body1">Area: {data.areaName}</Typography>
                            <Typography variant="body1">Remaining: {data.availableSeatsCount}</Typography>
                        </Box>
                    ))}
                </Box>

                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button variant="contained" color="primary">
                        Back
                    </Button>
                    <Button variant="contained" color="primary">
                        Next
                    </Button>
                </Box>
            </div>
        </div>
    );
};

export default ConcertDetail;
