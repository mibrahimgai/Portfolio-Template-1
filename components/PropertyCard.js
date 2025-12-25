'use client';

import Link from 'next/link';
import styles from './PropertyCard.module.css';

import { motion } from 'framer-motion';

export default function PropertyCard({ property, index = 0 }) {
    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
        >
            <Link href={`/properties/${property.id}`}>
                <div className={styles.imageContainer}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={property.images && property.images.length > 0 ? property.images[0] : 'https://placehold.co/800x600'}
                        alt={property.title}
                        className={styles.image}
                    />
                </div>
            </Link>
            <div className={styles.statusBar}>
                {property.status}
            </div>
            <div className={styles.details}>
                <h3 className={styles.address}>{property.address}</h3>
                <span className={styles.city}>{property.city}</span>
                <span className={styles.price}>
                    PKR {Number(property.price).toLocaleString()}
                    {property.status === 'RENTAL' && ' /mo'}
                </span>
            </div>
        </motion.div>
    );
}
