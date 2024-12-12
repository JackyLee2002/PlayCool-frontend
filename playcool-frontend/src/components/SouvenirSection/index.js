import styles from './SouvenirSection.module.css';
import SouvenirItem from "../SouvenirItem";
import OtherSouvenirItem from "../OtherSouvenirItem";
const SouvenirSection = () => {
    return (
        <div className={styles.SouvenirSection}   >
            <SouvenirItem gltfPath="/coldplay_glasses_3/scene.gltf" />

            <OtherSouvenirItem imagePath="/owwfront.png" site=""/>
            <SouvenirItem gltfPath="/coldplay_glasses/scene.gltf" site="https://usstore.coldplay.com/products/coldplay-tour-hat" />
            <OtherSouvenirItem imagePath="/coldPlayHat.png" site="https://usstore.coldplay.com/products/coldplay-tour-hat" />
            <OtherSouvenirItem imagePath="/moonPoster.png" site="https://usstore.coldplay.com/products/moon-music-full-moon-edition-poster" />
            <SouvenirItem gltfPath="/coldplay_glasses_5/scene.gltf" site="https://usstore.coldplay.com/products/coldplay-tour-hat" />


        </div>
    );
};

export default SouvenirSection;