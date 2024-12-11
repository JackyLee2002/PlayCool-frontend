import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const VideoMediaCard = ({ videoSrc, title, likes, views }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div style={styles.container}>
            {isClient && (
                <>
                    <div style={styles.videoWrapper}>
                        <ReactPlayer
                            url={videoSrc}
                            playing
                            controls
                            width="100%"
                            height="100%"
                            style={styles.video}
                        />
                    </div>
                    <div style={styles.info}>
                        <h2 style={styles.title}>{title}</h2>
                        <p style={styles.details}>
                            {likes} likes • {views} views
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '20px',
        overflow: 'hidden',
        padding: '20px',
    },
    videoWrapper: {
        width: '100%',
        height: '60%',
        borderRadius: '15px',
        overflow: 'hidden',
    },
    video: {
        borderRadius: '15px',
    },
    info: {
        width: '100%',
        textAlign: 'center',
        padding: '10px',
        color: 'white',
    },
    title: {
        margin: '10px 0',
        fontSize: '24px',
        fontWeight: 'bold',
    },
    details: {
        fontSize: '16px',
        color: 'white',
    },
};

export default VideoMediaCard;



