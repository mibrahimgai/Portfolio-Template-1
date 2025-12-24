import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer} id="contact">
            <div className={`${styles.content} container`}>
                <div className={styles.history}>
                    <h3>HISTORY OF FAISALABAD</h3>
                    <p>
                        Formerly Lyallpur, Faisalabad is the third-most-populous city in Pakistan, and the second-largest in the eastern province of Punjab. Historically one of the first planned cities within British India, it has long since developed into a cosmopolitan metropolis.
                    </p>
                </div>

                <div className={styles.links}>
                    <Link href="/faisalabad">Faisalabad</Link>
                    <Link href="/properties">Properties</Link>
                    <Link href="/communities">Communities</Link>
                    <Link href="/private">Private Access</Link>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo-new.png" alt="Logo" style={{ height: '40px', opacity: 0.8 }} />
                </div>
                <p className={styles.copyright}>
                    © {new Date().getFullYear()} GHULAM ABBAS IMRAN | ALL RIGHTS RESERVED.
                </p>
            </div>
        </footer>
    );
}
