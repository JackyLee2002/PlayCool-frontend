import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import coldPlaySquare from '../../../pages/statics/coldPlaySquare.png';
import Image from 'next/image';
const TicketCard = () => {
  return (

      <Card orientation="horizontal" variant="outlined" sx={{ width: '50vw', display: 'flex', alignItems: 'stretch' }}>
          <CardOverflow
              variant="soft"
              className="cardLeft"
              sx={{
                  backgroundColor: '#16378A',
                  color: 'white',
                  px: 0.2,
                  writingMode: 'horizontal-rl',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'xs',
                  fontWeight: 'xl',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  borderLeft: '1px solid',
                  borderColor: 'divider',
                  marginRight: 0, // Remove right margin
              }}
          >
              03 June
              Sun
              19:45
          </CardOverflow>
          <CardOverflow sx={{ marginLeft: 0 }}> {/* Remove left margin */}
              <AspectRatio ratio="1" sx={{ width: 130 }}>
                  <Image src={coldPlaySquare} alt="coldPlaySquare" />
              </AspectRatio>
          </CardOverflow>
          <CardContent sx={{ padding: 0}}>
              <Typography textColor="success.plainColor" sx={{ fontWeight: 'md' }}>
                  Cold Play : 2025 First Tour
              </Typography>
              <Typography sx={{ fontWeight: "bold"}}level="body-sm"> Zayed Sports City, Abu Dhabi, United Arab Emirates, United Arab Emirates</Typography>
              <Typography level="body-sm">Section 1, Row D, Seat 105:</Typography>
              <Typography level="body-sm">Price $399.00</Typography>
          </CardContent>
      </Card>
  );
};

export default TicketCard;