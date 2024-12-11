import React from 'react';
import { Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography } from '@mui/material';

const RankingPreview = ({ rankings }) => {
    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <Typography variant="h6" component="div" sx={{ textAlign: 'center', mb: 2 }}>
                Top 50 - US
            </Typography>
            <List>
                {rankings.map((item, index) => (
                    <ListItem key={index} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                        <ListItemAvatar>
                            <Avatar src={item.coverImage} alt={item.title} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.title}
                            secondary={item.artist}
                            primaryTypographyProps={{ fontWeight: 'bold' }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default RankingPreview;