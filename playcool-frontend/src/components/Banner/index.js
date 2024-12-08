import React from 'react';
import Image from 'next/image';
import './Banner.css';
import bannerBg from '../../../pages/statics/BannerBG.png';
import fourGuy from '../../../pages/statics/4guy.png';
import concertTitle from '../../../pages/statics/ColdPlayConcertTitle.png';
import yearTitle from '../../../pages/statics/2025.png';

const Banner = () => {
    return (
        <div className="banner">
            <Image src={bannerBg} alt="Banner Background" layout="fill" objectFit="cover" />
            <div className="content">
                <Image  src={fourGuy} alt="4 Guys" className="fourGuy" width={400} height={430} />
                <Image src={concertTitle} alt="ColdPlay Concert Title" className="concertTitle" />
                <Image src={yearTitle} alt="2025" className="yearTitle" />
            </div>
        </div>
    );
};

export default Banner;