import styles from './SouvenirSection.module.css';
import SouvenirItem from "../SouvenirItem";
import OtherSouvenirItem from "../OtherSouvenirItem";
const SouvenirSection = () => {
    return (
        <div className={styles.SouvenirSection}   >
            <SouvenirItem gltfPath="/coldplay_glasses_3/scene.gltf" />

            <OtherSouvenirItem imagePath="/owwfront.png" />
            <SouvenirItem gltfPath="/coldplay_glasses/scene.gltf" />
            <OtherSouvenirItem imagePath="/coldPlayHat.png" />
            <OtherSouvenirItem imagePath="/moonPoster.png" />
            <SouvenirItem gltfPath="/coldplay_glasses_5/scene.gltf" />


        </div>
    );
};

export default SouvenirSection;