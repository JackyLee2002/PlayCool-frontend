import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import NavBar from '../../src/components/NavBar';
import { getSongList, vote, isVoted } from '../api/songService';
import styles from './song-list.module.css';
import { AuthContext } from '@/src/context/AuthContext';
import Image from 'next/image';
import Banner from "@/src/components/Banner";

export default function SongList() {
    const [songs, setSongs] = useState([]);
    const [hasVoted, setHasVoted] = useState(false);
    const { token } = useContext(AuthContext);

    const fetchSongs = async () => {
        const songList = await getSongList();
        setSongs(songList);
    };

    useEffect(() => {
        fetchSongs();
        checkIfVoted();
    }, []);

    const checkIfVoted = async () => {
        const voted = await isVoted(token);
        setHasVoted(voted);
    };

    const handleVote = async (songId) => {
        await vote(songId, token);
        fetchSongs();
        checkIfVoted();
    };

    const getImageSrc = (songName) => {
        try {
            return require(`../statics/${songName}.png`);
        } catch (err) {
            return null;
        }
    };

    return (
        <div>
            <h1 className={styles.title}>Vote For Your Favorite Song !</h1>
            <Box display="flex" flexDirection="column" gap={2} sx={{ width: '50vw', marginLeft: '25%' }}>
                {songs.map((song) => (
                    <Box key={song.id}>
                        <Card className={styles.songCard}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {getImageSrc(song.name) && (
                                        <Box sx={{ width: '200px', height: '200px', position: 'relative' }}>
                                            <Image src={getImageSrc(song.name)} alt={song.name} layout="fill" objectFit="contain" />
                                        </Box>
                                    )}
                                    <Box sx={{ marginLeft: 2 }}>
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
                                    </Box>
                                </Box>
                            </CardContent>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ alignSelf: 'center' }}
                                onClick={() => handleVote(song.id)}
                                disabled={hasVoted}
                            >
                                Vote
                            </Button>
                        </Card>
                    </Box>
                ))}
            </Box>
        </div>
    );
}