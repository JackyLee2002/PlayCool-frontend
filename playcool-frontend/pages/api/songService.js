import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
    headers: { 'Content-Type': 'application/json' }
});

export const getSongList = async () => {
    try {
        const response = await axiosInstance.get('/songs');
        return response.data;
    } catch (err) {
        console.error(err);
    }
};
export const vote = async (songId, token) => {
    try {
        const response = await axiosInstance.post('/songs/vote', { songId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.error(err);
    }
};


export const isVoted = async (token) => {
    try {
        const response = await axiosInstance.get(`/songs/is-voted`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const getVotedSongId = async (token) => {
    try {
        const response = await axiosInstance.get(`/songs/voted-song`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export default axiosInstance;