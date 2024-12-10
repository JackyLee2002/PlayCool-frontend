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
export const vote = async (songId) => {
    try {
        const response = await axiosInstance.post('/songs/vote', { songId });
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export default axiosInstance;