import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import styles from './page.module.css';
import ImageSlider from '@/components/ImageSlider';
import ScrollReveal from '@/components/ScrollReveal';

export const dynamic = 'force-dynamic';

async function getProperty(id) {
    const filePath = path.join(process.cwd(), 'data', 'properties.json');
    try {
        const jsonData = await fs.readFile(filePath, 'utf8');
        const properties = JSON.parse(jsonData);
        return properties.find(p => p.id === id);
    } catch (e) {
        return null;
    }
}

export default async function PropertyDetails({ params }) {
    const { id } = await params;
    const property = await getProperty(id);

    if (!property) {
        return (
            <div style={{ padding: '10rem', textAlign: 'center' }}>
                <h1>Property Not Found</h1>
                <Link href="/properties">Back to Listings</Link>
            </div>
        );
    }

    // Ensure images array exists
    const images = property.images && property.images.length > 0
        ? property.images
        : ['https://placehold.co/800x600/111/FFF?text=No+Image'];

    return (
        <>
            <Header />
            <div className={styles.container}>

                {/* Main Hero Image - Full Width */}
                <div className={styles.heroImageContainer}>
                    <ImageSlider images={images} alt={property.title} />
                </div>

                <div className={styles.contentWrapper}>

                    {/* Header */}
                    <ScrollReveal>
                        <div className={styles.detailsHeader}>
                            <h1>{property.title}</h1>
                            <p>{property.address}, {property.city}</p>
                        </div>
                    </ScrollReveal>

                    {/* Details Strip */}
                    <ScrollReveal delay={0.2}>
                        <div className={styles.detailsStrip}>
                            <div className={styles.detailItem}>
                                <label>Price</label>
                                <span>Rs. {parseInt(property.price).toLocaleString()}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <label>Status</label>
                                <span>{property.status}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <label>Size</label>
                                <span>{property.sizeValue} {property.sizeUnit}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <label>Community</label>
                                <span>{property.community}</span>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Description */}
                    <ScrollReveal delay={0.4}>
                        <div className={styles.description}>
                            <p>{property.description}</p>
                        </div>
                    </ScrollReveal>

                    {/* Gallery Section */}
                    <ScrollReveal delay={0.6}>
                        <div className={styles.gallery}>
                            <h2>Gallery</h2>
                            <div className={styles.galleryGrid}>
                                {images.map((img, index) => (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img key={index} src={img} alt={`View ${index + 1}`} className={styles.galleryImage} />
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Contact Section */}
                    <ScrollReveal delay={0.8}>
                        <div className={styles.contactSection}>
                            <h3 style={{ marginBottom: '2rem', fontWeight: '300', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Interested in this property?</h3>
                            <Link href="/contact" className={styles.contactButton}>
                                Schedule a Viewing
                            </Link>
                        </div>
                    </ScrollReveal>

                </div>
            </div>
            <Footer />
        </>
    );
}
