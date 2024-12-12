import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from './SouvenirItem.module.css';

const Model = ({ gltfPath }) => {
    const { scene } = useGLTF(gltfPath);
    return <primitive object={scene} />;
};
const SouvenirItem = ({ gltfPath, site }) => {
    const handleBuyClick = () => {
        window.location.href = site;
    };

    return (
        <div className={styles.SouvenirItem}>
            <img
                src="/drag-right-white.gif"
                alt="Drag Right"
                className={styles.dragIcon}
            />
            <div className={styles.SouvenirCanvas} style={{ width: '600px', height: '400px' }}>
                <Canvas camera={{ position: [0, 0, 1.4] }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <Suspense fallback={null}>
                        <Model gltfPath={gltfPath} />
                    </Suspense>
                    <OrbitControls enablePan={false} enableZoom={true} autoRotate={true} autoRotateSpeed={10} />
                </Canvas>
            </div>
            <div className={styles.SouvenirDescription}>
                <h3 className={styles.SouvenirNav} onClick={handleBuyClick}>Click to check it out!</h3>
                <p>Perfect souvenir for fans to be worn.</p>
            </div>
        </div>
    );
};

export default SouvenirItem;