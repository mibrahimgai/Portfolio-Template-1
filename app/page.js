import Link from 'next/link';
import styles from './page.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import ScrollReveal from '@/components/ScrollReveal';

import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

async function getProperties() {
  try {
    const client = await clientPromise;
    const db = client.db("realestate_db");
    const properties = await db.collection("properties").find({}).toArray();
    // Serialize ObjectId
    return properties.map(p => ({ ...p, id: p._id.toString(), _id: p._id.toString() }));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function Home() {
  const properties = await getProperties();
  const featuredProperties = properties.filter(p => p.featured).slice(0, 3); // Show top 3 filtered

  return (
    <div className={styles.main}>
      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroContent}>
          <ScrollReveal delay={0.2}>
            <h1 className={styles.heroTitle}>GHULAM ABBAS IMRAN</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <p className={styles.heroSubtitle}>FAISALABAD REAL ESTATE</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Properties */}
      <section className={styles.featuredSection} id="properties">
        <div className="container">
          <ScrollReveal>
            {/* <div className={styles.sectionHeader}>
              <h2>FEATURED PROPERTIES</h2>
            </div> */}
            <div className={styles.grid}>
              {featuredProperties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
            <div className={styles.browseContainer}>
              <Link href="/properties" className={styles.browseButton}>
                Browse all properties <span>&gt;</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.aboutSection} id="about">
        <div className="container">
          <ScrollReveal delay={0.2}>
            <div className={styles.about}>
              <div className={styles.aboutImage}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about-placeholder.png" alt="Ghulam Abbas Imran" />
              </div>
              <div className={styles.aboutContent}>
                <h2>GHULAM ABBAS IMRAN</h2>
                <br />
                <div style={{ lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p>
                    I am <strong>Ghulam Abbas Imran</strong>, a professional property broker with nearly <strong>10 years of experience</strong> in the real estate market and a proven track record of <strong>50+ successful property deals</strong>. I help clients buy, sell, and rent properties with confidence by offering expert market knowledge, strong negotiation skills, and complete end-to-end support.
                  </p>
                  <p>
                    Whether you are looking to purchase the right property, sell at the best market value, or rent out your property to reliable tenants, I manage the entire process smoothly and transparently. My focus is always on securing the <strong>best possible deal</strong> for my clients.
                  </p>
                  <p>
                    Built on trust, honesty, and results, my services come with <strong>very low commission charges</strong>, making professional real estate support affordable without compromising on quality.
                  </p>
                  <p>
                    If you want an experienced broker who puts your interests first and delivers real results, I am here to help.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
