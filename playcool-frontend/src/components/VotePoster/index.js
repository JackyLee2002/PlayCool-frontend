import Image from "next/image";
import ConcertLive from "../../../pages/statics/ConcertLive.png";
import styles from './VotePoster.module.css';
import Poster from "../../../pages/statics/Poster.png";

const VotePoster = () => {
    return (
        <div className={styles.imageContainer}>
            <Image src={Poster} alt={"Concert Live"} className={styles.fullWidthImage}/>
            <button className={styles.topRightButton}>Vote Now</button>
        </div>
    );
}
export default VotePoster;