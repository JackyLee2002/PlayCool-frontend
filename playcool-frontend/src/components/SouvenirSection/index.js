import styles from './SouvenirSection.module.css';
import SouvenirItem from "../SouvenirItem";

const SouvenirSection = () => {
    return (
        <div className={styles.SouvenirSection}   >

            <SouvenirItem gltfPath="/coldplay_glasses/scene.gltf" />
            <SouvenirItem gltfPath="/coldplay_glasses_2/scene.gltf" />
            <SouvenirItem gltfPath="/coldplay_glasses_3/scene.gltf" />


        </div>
    );
};

export default SouvenirSection;