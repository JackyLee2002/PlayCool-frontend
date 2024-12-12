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
                            playing = {false}
                            controls
                            width="100%"
                            height="100%"
                            style={styles.video}
                        />
                    </div>
                    <div style={styles.info}>
                        <h2 style={styles.title}>{title}</h2>
                        <p style={styles.details}>
                            {likes}  • {views} 
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

const styles = {
   
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
        color: 'white',
        textShadow: '4px 6px 4px #000',
    },
    title: {
        margin: '10px 0',
        fontSize: '24px',
        fontWeight: 'bold',
        textShadow: '4px 6px 4px #000',
    },
    details: {
        fontSize: '16px',
        color: 'white',
    },
};

export default VideoMediaCard;



