import React from 'react';
import Image from 'next/image';
<<<<<<< HEAD
import './Banner.css';
=======
import styles from './Banner.module.css';
import './Banner.module.css'
>>>>>>> homepage
import bannerBg from '../../../pages/statics/BannerBG.png';
import fourGuy from '../../../pages/statics/4guy.png';
import concertTitle from '../../../pages/statics/ColdPlayConcertTitle.png';
import yearTitle from '../../../pages/statics/2025.png';

const Banner = () => {
    return (

        <div className={styles.banner}>
            <Image src={bannerBg} alt="Banner Background" layout="fill" objectFit="cover" />
            <div className={styles.content}>
                <Image  src={fourGuy} alt="4 Guys" className={styles.fourGuy} width={400} height={430} />
                <Image src={concertTitle} alt="ColdPlay Concert Title" className={styles.concertTitle} />
                <Image src={yearTitle} alt="2025" className={styles.yearTitle} />

            </div>
        </div>
    );
};

export default Banner;