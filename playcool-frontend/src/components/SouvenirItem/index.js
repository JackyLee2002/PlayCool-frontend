import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import styles from './SouvenirItem.module.css';

const Model = ({ gltfPath }) => {
    const { scene } = useGLTF(gltfPath);
    return <primitive object={scene} />;
};

const SouvenirItem = ({ gltfPath }) => {
    return (
        <div className={styles.SouvenirItem}>
            <div className={styles.SouvenirCanvas} style={{ width: '600px', height: '400px' }}>
                <Canvas camera={{ position: [0, 0, 1.4] }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <Suspense fallback={null}>
                        <Model gltfPath={gltfPath} />
                    </Suspense>
                    <OrbitControls enablePan={false} enableZoom={true} />
                </Canvas>
            </div>
            <div className={styles.SouvenirDescription}>
                <h3>Check out more of Coldplay Souvenirs!</h3>
                <p>A perfect souvenir for fans to be worn by Coldplay during their concerts.</p>
            </div>
        </div>
    );
};

export default SouvenirItem;