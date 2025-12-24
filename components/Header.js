'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
            <nav className={styles.nav}>
                <div className={styles.dropdownContainer}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}>
                    <Link href="/properties">PROPERTIES</Link>
                    {isDropdownOpen && (
                        <div className={styles.dropdown}>
                            <Link href="/properties?status=current" className={styles.dropdownLink} onClick={() => setIsDropdownOpen(false)}>Current Listings</Link>
                            <Link href="/properties?status=sale" className={styles.dropdownLink} onClick={() => setIsDropdownOpen(false)}>For Sale</Link>
                            <Link href="/properties?status=rental" className={styles.dropdownLink} onClick={() => setIsDropdownOpen(false)}>Rental</Link>
                            <Link href="/properties?status=sold" className={styles.dropdownLink} onClick={() => setIsDropdownOpen(false)}>Sold Properties</Link>
                        </div>
                    )}
                </div>
                <Link href="/communities">COMMUNITIES</Link>
                <Link href="/faisalabad">FAISALABAD</Link>
                <Link href="/#about">ABOUT</Link>
                <Link href="/contact">CONTACT</Link>
                <Link href="/private">PRIVATE</Link>
            </nav>
        </header>
    );
}
