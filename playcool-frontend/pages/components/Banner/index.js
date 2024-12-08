import React from 'react';
import Image from 'next/image';
import './Banner.css';
import bannerBg from '../../statics/BannerBG.png';
import fourGuy from '../../statics/4guy.png';
import concertTitle from '../../statics/ColdPlayConcertTitle.png';

const Banner = () => {
    return (
        <div className="banner">
            <Image src={bannerBg} alt="Banner Background" layout="fill" objectFit="cover" />
            <div className="content">
                <Image src={fourGuy} alt="4 Guys" className="fourGuy" />
                <Image src={concertTitle} alt="ColdPlay Concert Title" className="concertTitle" />
            </div>
        </div>
    );
};

export default Banner;