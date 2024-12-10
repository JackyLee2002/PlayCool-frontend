import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Modal } from '@mui/material';
import NavBar from '../../src/components/NavBar';
import { getSongList, vote, isVoted } from '../api/songService';
import styles from './song-list.module.css';
import { AuthContext } from '@/src/context/AuthContext';
import Image from 'next/image';
import Login from '@/src/components/Login';

export default function SongList() {
    const [songs, setSongs] = useState([]);
    const [hasVoted, setHasVoted] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { token } = useContext(AuthContext);

    const fetchSongs = async () => {
        const songList = await getSongList();
        setSongs(songList);
    };

    useEffect(() => {
        fetchSongs();
        document.body.style.cssText = 'overflow-x: hidden';
        if (token) {
            checkIfVoted();
            setIsLoginOpen(false);
        }
    }, [token]);

    const checkIfVoted = async () => {
        const voted = await isVoted(token);
        setHasVoted(voted);
    };

    const handleVote = async (songId) => {
        if (!token) {
            setIsLoginOpen(true);
            return;
        }
        await vote(songId, token);
        fetchSongs();
        checkIfVoted();
    };

    const handleClose = () => {
        setIsLoginOpen(false);
    };

    const getImageSrc = (songName) => {
        try {
            return require(`../statics/${songName}.png`);
        } catch (err) {
            return null;
        }
    };

    const getBackgroundColor = (rank) => {
        switch (rank) {
            case 1:
                return '#FF3000';
            case 2:
                return '#FF4500';
            case 3:
                return '#FF6347';
            case 4:
                return '#FF7F50';
            case 5:
                return '#FF8C00';
            case 6:
                return '#FFA07A';
        }
    };

    return (
        <div id={"mainDiv"} className={styles.songListContainer}>
            <h1 className={styles.title}>Vote For Your Favorite Song !</h1>
            <Box display="flex" flexDirection="column" gap={2} sx={{ width: '50vw', marginLeft: '25%' }}>
                {songs.map((song, index) => (
                    <Box key={song.id}>
                        <Card
                            className={styles.songCard}
                            sx={{ backgroundColor: getBackgroundColor(index + 1) }}
                        >
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
                                        {song.album && (
                                            <Typography color="text.secondary">
                                                album: {song.album}
                                            </Typography>
                                        )}
                                        {song.releaseDate && (
                                            <Typography color="text.secondary">
                                                release date: {song.releaseDate}
                                            </Typography>
                                        )}
                                        <Typography variant="body2">
                                            votes: {song.votes}
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
            <Modal open={isLoginOpen} onClose={handleClose}>
                <Box
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
                    onClick={handleClose}
                >
                    <Box onClick={(e) => e.stopPropagation()}>
                        <Login />
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}