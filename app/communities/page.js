import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import clientPromise from "@/lib/mongodb";
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

async function getCommunities() {
    try {
        const client = await clientPromise;
        const db = client.db("realestate_db");
        const communities = await db.collection("communities").find({}).toArray();
        return communities.map(c => ({
            ...c,
            id: c._id.toString()
        }));
    } catch (e) {
        console.error("Failed to fetch communities", e);
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
