import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, LinearProgress } from '@mui/material';
import { getSongList, getAllVotes } from '../../../pages/api/songService';
import Image from "next/image";
import styles from './SongRating.module.css'; // Import the CSS module

const SongRating = () => {
    const [songs, setSongs] = useState([]);
    const [totalVotes, setTotalVotes] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const songList = await getSongList();
            const allVotes = await getAllVotes();
            setSongs(songList.slice(0, 5));
            setTotalVotes(allVotes);
        };
        fetchData();
    }, []);

    const getImageSrc = (songName) => {
        try {
            return require(`../../../pages/statics/${songName}.png`);
        } catch (err) {
            return require(`../../../pages/statics/Other.png`);
        }
    };

    return (
        <Card className={styles['floating-card']} sx={{ width: '45%', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(0, 0, 139, 0.1)', margin: '80px 0 20px 0' }}>
            <CardContent>
                <Typography
                    variant="h4"
                    component="div"
                    gutterBottom
                    align="center"
                    sx={{
                        color: 'white',
                        fontSize: '50px',
                        fontWeight: 'bold',
                        marginBottom: '30px'
                    }}
                >
                    Top 5 Hot Songs
                </Typography>
                {songs.map((song, index) => (
                    <Box key={song.id} sx={{ marginBottom: 5, position: 'relative', minHeight: 80 }}>
                        <LinearProgress
                            variant="determinate"
                            value={(song.votes / totalVotes) * 100}
                            sx={{ height: 80, borderRadius: 2, backgroundColor: 'orange' }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: 'flex',
                                alignItems: 'center',
                                padding: 2,
                                color: 'white',
                            }}
                        >
                            <Image src={getImageSrc(song.name)} alt={song.name} style={{ width: 60, height: 60, borderRadius: '50%', marginRight: 16 }} />
                            <Box>
                                <Typography component="div" sx={{ color: 'white' }}>
                                    {index + 1}. {song.name}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </CardContent>
        </Card>
    );
};

export default SongRating;