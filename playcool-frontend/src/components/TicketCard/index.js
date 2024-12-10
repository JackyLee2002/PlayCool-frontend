import * as React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import coldPlaySquare from '../../../pages/statics/coldPlaySquare.png';
import Image from 'next/image';

const TicketCard = () => {
    return (
        <Card variant="outlined" sx={{ minWidth: '50vw', height: '150px', display: 'flex', alignItems: 'stretch' }}>
            <Box
                sx={{
                    backgroundColor: '#16378A',
                    color: 'white',
                    px: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'xs',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                    marginRight: 0,
                    writingMode: 'vertical-rl',
                }}
            >
                03 June<br />
                Sun<br />
                19:45
            </Box>
            <Box sx={{ marginLeft: 0, margin: 0, padding: 0 }}>
                <Box sx={{ width: 150, height: '100%', position: 'relative' }}>
                    <Image src={coldPlaySquare} alt="coldPlaySquare" layout="fill" objectFit="cover" />
                </Box>
            </Box>
            <CardContent sx={{ padding: 0 }}>
                <Typography color="success.main" sx={{ fontWeight: 'medium' }}>
                    Cold Play : 2025 First Tour
                </Typography>
                <Typography sx={{ fontWeight: 'bold' }} variant="body2">
                    Zayed Sports City, Abu Dhabi, United Arab Emirates
                </Typography>
                <Typography variant="body2">Section 1, Row D, Seat 105:</Typography>
                <Typography variant="body2">Price $399.00</Typography>
            </CardContent>
        </Card>
    );
};

export default TicketCard;