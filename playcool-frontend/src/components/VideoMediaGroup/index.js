import React from 'react';
import VideoMediaCard from '../VideoMediaCard'; // Ensure this path is correct
import styles from './VideoMediaGroup.module.css';

const VideoCardGroup = () => {
    const videoData = [
        {
            videoSrc: 'https://youtu.be/oYeIMKbNc5A?si=0d1lJX58qMhz9dxW',
            title: 'Yellow',
            likes: 'Live in Tokyo',
            views: '2023 Nov',
        },
        {
            videoSrc: 'https://youtu.be/Fpn1imb9qZg?si=Ur41kJQZ1ziFaDF6',
            title: 'A Sky Full Of Stars',
            likes: 'Live at River Plate',
            views: '2023 Apr',
        },
        {
            videoSrc: 'https://youtu.be/oYeIMKbNc5A?si=0d1lJX58qMhz9dxW',
            title: 'Viva La Vida ',
            likes: 'Live In São Paulo',
            views: '2018 Oct',
        },
        {
            videoSrc: 'https://youtu.be/oYeIMKbNc5A?si=0d1lJX58qMhz9dxW',
            title: 'Paradise',
            likes: 'Live from Paris',
            views: '2012 Nov',
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