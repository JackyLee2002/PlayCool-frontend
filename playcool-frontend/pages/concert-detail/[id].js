import React, { useEffect, useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import {fetchAvailableSeats, fetchConcert} from "@/src/components/api";
import {useRouter} from "next/router";

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
                {/* 展示演唱会图片 */}
                {/*<Image src={concert.concertImage} />*/}
                <Typography variant="h4" gutterBottom>
                    {concert.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {concert.venue.city}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Date: {concert.date} Time: {concert.time}
                </Typography>
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
