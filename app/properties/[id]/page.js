import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import styles from './page.module.css';
import ImageSlider from '@/components/ImageSlider';
import ScrollReveal from '@/components/ScrollReveal';

export const dynamic = 'force-dynamic';

async function getProperty(id) {
    try {
        const client = await clientPromise;
        const db = client.db("realestate_db");

        // Check if valid ObjectId
        if (!ObjectId.isValid(id)) {
            // Fallback for non-mongo IDs (if any legacy) or return null
            return null;
        }

        const property = await db.collection("properties").findOne({ _id: new ObjectId(id) });
        if (property) {
            return {
                ...property,
                id: property._id.toString(),
                _id: property._id.toString(),
                // Ensure numeric fields are strings if needed by UI or keep as is
                price: property.price?.toString() || '0'
            };
        }
        return null;
    } catch (e) {
        console.error("Error fetching property:", e);
        return null;
    }
}

export default async function PropertyDetails({ params }) {
    const { id } = await params;
    const property = await getProperty(id);

    if (!property) {
        return (
            <div className={styles.notFound}>
                <h1>Property Not Found</h1>
                <Link href="/properties" className={styles.backLink}>Back to Listings</Link>
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
            <main className={styles.container}>

                {/* Hero Section */}
                <section className={styles.heroSection}>
                    <ImageSlider images={images} alt={property.title} />
                </section>

                <div className={styles.contentWrapper}>

                    {/* Property Header Info */}
                    <ScrollReveal>
                        <header className={styles.propertyHeader}>
                            <h1 className={styles.title}>{property.title}</h1>
                            <div className={styles.locationInfo}>
                                <span className={styles.address}>{property.address}, {property.city}</span>
                                <span className={styles.divider}>|</span>
                                <span className={styles.community}>{property.community}</span>
                            </div>
                            <div className={styles.priceTag}>
                                <span className={styles.currency}>PKR</span> {parseInt(property.price).toLocaleString()}
                                {property.status === 'RENTAL' && <span className={styles.rentalSuffix}> /mo</span>}
                            </div>
                            <div className={styles.statusBadge}>{property.status}</div>
                        </header>
                    </ScrollReveal>

                    {/* Specs / Details Grid */}
                    <ScrollReveal delay={0.2}>
                        <div className={styles.specsGrid}>
                            <div className={styles.specItem}>
                                <span className={styles.specLabel}>Size</span>
                                <span className={styles.specValue}>{property.sizeValue} {property.sizeUnit}</span>
                            </div>
                            <div className={styles.specItem}>
                                <span className={styles.specLabel}>Type</span>
                                <span className={styles.specValue}>{property.status}</span>
                            </div>
                            <div className={styles.specItem}>
                                <span className={styles.specLabel}>City</span>
                                <span className={styles.specValue}>{property.city}</span>
                            </div>
                            <div className={styles.specItem}>
                                <span className={styles.specLabel}>ID</span>
                                <span className={styles.specValue}>{property.id}</span>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Description Section */}
                    <ScrollReveal delay={0.4}>
                        <section className={styles.descriptionSection}>
                            <h2 className={styles.sectionTitle}>About this Property</h2>
                            <p className={styles.descriptionText}>{property.description}</p>
                        </section>
                    </ScrollReveal>

                    {/* Gallery Grid */}
                    <ScrollReveal delay={0.6}>
                        <section className={styles.gallerySection}>
                            <h2 className={styles.sectionTitle}>Gallery</h2>
                            <div className={styles.galleryGrid}>
                                {images.map((img, index) => (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`${property.title} - Image ${index + 1}`}
                                        className={styles.galleryImage}
                                    />
                                ))}
                            </div>
                        </section>
                    </ScrollReveal>

                    {/* Sticky/Prominent Contact CTA */}
                    <ScrollReveal delay={0.8}>
                        <section className={styles.contactSection}>
                            <div className={styles.contactCard}>
                                <h3>Interested in {property.title}?</h3>
                                <p>Contact us to schedule a private viewing.</p>
                                <Link
                                    href={`/contact?subject=Viewing Request&property=${encodeURIComponent(property.title)}`}
                                    className={styles.contactButton}
                                >
                                    Request a Viewing
                                </Link>
                            </div>
                        </section>
                    </ScrollReveal>

                </div>
            </main>
            <Footer />
        </>
    );
}
