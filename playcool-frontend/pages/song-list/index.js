import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Modal, Pagination } from '@mui/material';
import { getSongList, vote, checkVote, getVotedSongIdList } from '../api/songService';
import styles from './song-list.module.css';
import { AuthContext } from '@/src/context/AuthContext';
import Image from 'next/image';
import Login from '@/src/components/Login';

export default function SongList() {
    const [songs, setSongs] = useState([]);
    const [canVote, setCanVote] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [votedSongIdList, setVotedSongIdList] = useState([]);
    const { token } = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const [songsPerPage] = useState(5);

    const fetchSongs = async () => {
        const songList = await getSongList();
        setSongs(songList);
    };

    const fetchVotedSongIdList = async () => {
        const votedSongIdList = await getVotedSongIdList(token);
        setVotedSongIdList(votedSongIdList || []);
    }

    useEffect(() => {
        fetchSongs();
        document.body.style.cssText = 'overflow-x: hidden';
        if (token && token !== null) {
            checkCanVote();
            setIsLoginOpen(false);
            fetchVotedSongIdList();
        }
    }, [token]);

    const checkCanVote = async () => {
        const voted = await checkVote(token);
        setCanVote(voted);
    };

    const handleVote = async (songId) => {
        if (!token || token === null) {
            setIsLoginOpen(true);
            return;
        }
        await vote(songId, token);
        fetchSongs();
        checkCanVote();
        fetchVotedSongIdList();
    };

    const handleClose = () => {
        setIsLoginOpen(false);
    };

    const getImageSrc = (songName) => {
        try {
            return require(`../statics/${songName}.png`);
        } catch (err) {
            return require(`../statics/Other.png`);
        }
    };

    const getBackgroundColor = (rank) => {
        switch (rank) {
            case 1:
                return '#FFD700';
            case 2:
                return '#FFC700';
            case 3:
                return '#FFB700';
            case 4:
                return '#FFA500';
            case 5:
                return '#FF8C00';
            case 6:
                return '#FF7F50';
            default:
                return '#FFFFFF';
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const indexOfLastSong = page * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

    return (
        <div id={"mainDiv"} className={styles.songListContainer}>
            <h1 className={styles.title}>Vote For Your Favorite Song !</h1>
            <Box display="flex" flexDirection="column" gap={2} sx={{ width: '50vw', marginLeft: '25%' }}>
                {currentSongs.map((song, index) => (
                    <Box key={song.id}>
                        <Card
                            className={styles.songCard}
                            sx={{ backgroundColor: getBackgroundColor(index + 1) }}
                        >
                            <CardContent className={styles.songCardContent}>
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
                                            <Typography>
                                                album: {song.album}
                                            </Typography>
                                        )}
                                        {song.releaseDate && (
                                            <Typography>
                                                release date: {song.releaseDate}
                                            </Typography>
                                        )}
                                        <Typography>
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
                                disabled={canVote || votedSongIdList.includes(song.id)}
                            >
                                Vote
                            </Button>
                        </Card>
                    </Box>
                ))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                    count={Math.ceil(songs.length / songsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    sx={{
                        backgroundColor: "rgba(255, 255, 0, 0.8)", // 更鲜艳的背景颜色
                        borderRadius: "8px",
                        padding: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        '& .MuiPaginationItem-root': {
                            color: "black", // 分页项的字体颜色
                        },
                    }}
                />
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