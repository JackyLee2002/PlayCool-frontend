import React from 'react';
import Image from "next/image";
import playCoolLogo from '../../../pages/statics/playCoolLogo.png';
import './Footer.module.css';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div>
                <Image src={playCoolLogo} alt="PlayCool Logo" width={150} height={50}/>
            </div>
            <div className={styles.info}>
                <div className={styles.infoColumn}>
                    <span className={styles.title}>Our Company</span>
                    <span>About Cold Play</span>
                    <span>Contact Us</span>
                </div>
                <div className={styles.infoColumn}>
                    <span className={styles.title}>Help and Support</span>
                    <span>About Our Team</span>
                    <span>Help Center</span>
                </div>
            </div>
            <div className={styles.footerCopyright}>Copyright © PlayCool 2024</div>
        </footer>
    );
};

export default Footer;