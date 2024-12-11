import React from 'react';
import VideoMediaCard from '../VideoMediaCard'; // Ensure this path is correct
import styles from './VideoMediaGroup.module.css';

const VideoCardGroup = () => {
    const videoData = [
        {
            videoSrc: 'https://youtu.be/oYeIMKbNc5A?si=0d1lJX58qMhz9dxW',
            title: 'Card 1',
            likes: '287,586',
            views: '1,234,567',
        },
        {
            videoSrc: 'https://youtu.be/oYeIMKbNc5A?si=0d1lJX58qMhz9dxW',
            title: 'Card 2',
            likes: '150,234',
            views: '987,654',
        },
        {
            videoSrc: 'https://youtu.be/oYeIMKbNc5A?si=0d1lJX58qMhz9dxW',
            title: 'Card 3',
            likes: '300,123',
            views: '2,345,678',
        },
        {
            videoSrc: 'https://youtu.be/oYeIMKbNc5A?si=0d1lJX58qMhz9dxW',
            title: 'Card 4',
            likes: '400,789',
            views: '3,456,789',
        },
    ];

    return (
        <div className={styles.groupContainer}>
            {videoData.map((video, index) => (
                <div key={index} className={`${styles.cardWrapper} ${styles[`card${index + 1}`]}`}>
                    <VideoMediaCard
                        videoSrc={video.videoSrc}
                        title={video.title}
                        likes={video.likes}
                        views={video.views}
                    />
                </div>
            ))}
        </div>
    );
};

export default VideoCardGroup;