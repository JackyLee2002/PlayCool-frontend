import React, { useEffect, useState } from 'react';
import {Card, CardContent, Typography, Button, Grid, Box} from '@mui/material';
import NavBar from '../../src/components/NavBar';
import {getSongList, vote} from '../api/songService';
import styles from './song-list.module.css';

export default function SongList() {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const fetchSongs = async () => {
            const songList = await getSongList();
            setSongs(songList);
        };
        fetchSongs();
    }, []);

    return (
        //
        <div>
            <NavBar />
            <h1 className={styles.title}>Vote Your Favorite Song !</h1>
            <Box display="flex" flexDirection="column" gap={2} sx={{"width" : "50vw" , "margin-left" : "30%"}}>
                {songs.map((song) => (
                    <Box key={song.id} >
                        <Card className ={styles.songCard}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {song.name}
                                </Typography>
                                <Typography color="text.secondary">
                                    {song.album || ''}
                                </Typography>
                                <Typography color="text.secondary">
                                    {song.releaseDate || ''}
                                </Typography>
                                <Typography variant="body2">
                                    Votes: {song.votes}
                                </Typography>
                            </CardContent>
                            <Button variant="contained" color="primary" sx={{ alignSelf: 'center' }} onClick={() => vote(song.id)}>
                                Vote
                            </Button>
                        </Card>
                    </Box>
                ))}
            </Box>
        </div>
    );
}