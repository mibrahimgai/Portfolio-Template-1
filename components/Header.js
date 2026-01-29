'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.logo}>
                <Link href="/">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo-new.png" alt="Ghulam Abbas Imran" style={{ height: '50px' }} />
                </Link>
            </div>

            <button
                className={styles.hamburger}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
                <div className={`${styles.bar} ${isMenuOpen ? styles.barOpen : ''}`}></div>
                <div className={`${styles.bar} ${isMenuOpen ? styles.barOpen : ''}`}></div>
                <div className={`${styles.bar} ${isMenuOpen ? styles.barOpen : ''}`}></div>
            </button>

            <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
                <div className={styles.dropdownContainer}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}>
                    <Link href="/properties" onClick={() => setIsMenuOpen(false)}>PROPERTIES</Link>
                    {isDropdownOpen && (
                        <div className={styles.dropdown}>
                            <Link href="/properties?status=current" className={styles.dropdownLink} onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}>Current Listings</Link>
                            <Link href="/properties?status=sale" className={styles.dropdownLink} onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}>For Sale</Link>
                            <Link href="/properties?status=rental" className={styles.dropdownLink} onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}>Rental</Link>
                            <Link href="/properties?status=sold" className={styles.dropdownLink} onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}>Sold Properties</Link>
                        </div>
                    )}
                </div>
                <Link href="/communities" onClick={() => setIsMenuOpen(false)}>COMMUNITIES</Link>
                <Link href="/faisalabad" onClick={() => setIsMenuOpen(false)}>FAISALABAD</Link>
                <Link href="/#about" onClick={() => setIsMenuOpen(false)}>ABOUT</Link>
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>CONTACT</Link>
                <Link href="/private" onClick={() => setIsMenuOpen(false)}>PRIVATE</Link>
            </nav>

            {isMenuOpen && <div className={styles.overlay} onClick={() => setIsMenuOpen(false)}></div>}
        </header>
    );
}
