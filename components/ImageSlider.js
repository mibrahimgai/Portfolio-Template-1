'use client';

import { useState } from 'react';
import styles from './ImageSlider.module.css';

export default function ImageSlider({ images, alt }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const hasMultiple = images && images.length > 1;

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!images || images.length === 0) {
        return <div className={styles.slider} />;
    }

    return (
        <div className={styles.slider}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={images[currentIndex]}
                alt={`${alt} - View ${currentIndex + 1}`}
                className={styles.image}
            />

            {hasMultiple && (
                <>
                    <button className={`${styles.arrow} ${styles.left}`} onClick={prevImage}>
                        &#8249;
                    </button>
                    <button className={`${styles.arrow} ${styles.right}`} onClick={nextImage}>
                        &#8250;
                    </button>
                    <div className={styles.counter}>
                        {currentIndex + 1} / {images.length}
                    </div>
                </>
            )}
        </div>
    );
}
