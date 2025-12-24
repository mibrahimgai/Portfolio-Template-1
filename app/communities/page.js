import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

async function getCommunities() {
    const filePath = path.join(process.cwd(), 'data', 'communities.json');
    try {
        const jsonData = await fs.readFile(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (e) {
        return [];
    }
}

export default async function Communities() {
    const communities = await getCommunities();

    return (
        <>
            <Header />
            <div className={styles.mainWrapper}>
                <div className={`${styles.container} container`}>
                    <h1 className={styles.title}>FAISALABAD COMMUNITIES</h1>

                    <div className={styles.grid}>
                        {communities.map(community => (
                            <Link key={community.id} href={`/properties?community=${encodeURIComponent(community.name)}`}>
                                <div className={styles.card}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={community.image} alt={community.name} className={styles.image} />
                                    <div className={styles.overlay}>
                                        <h3 className={styles.name}>{community.name}</h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
