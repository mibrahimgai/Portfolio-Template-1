'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // Correct import for App Router
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import styles from './page.module.css';

// Client component wrapper to handle search params
import { Suspense } from 'react';

function PropertiesContent() {
    const searchParams = useSearchParams();
    const initialCommunity = searchParams.get('community') || '';
    const initialStatus = searchParams.get('status') || 'all';

    const [properties, setProperties] = useState([]);
    const [communities, setCommunities] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);

    // Filters
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [filterCommunity, setFilterCommunity] = useState(initialCommunity);
    const [filterStatus, setFilterStatus] = useState(initialStatus);

    useEffect(() => {
        fetch('/api/properties').then(res => res.json()).then(setProperties);
        fetch('/api/communities').then(res => res.json()).then(setCommunities);
    }, []);

    useEffect(() => {
        setFilterCommunity(searchParams.get('community') || 'All');
        const statusParam = searchParams.get('status');
        if (statusParam) setFilterStatus(statusParam);
        else setFilterStatus('all');
    }, [searchParams]);

    useEffect(() => {
        let result = properties;

        // Filter by Status
        if (filterStatus && filterStatus !== 'all') {
            if (filterStatus === 'current') {
                result = result.filter(p => p.status !== 'SOLD');
            } else if (filterStatus === 'sale') {
                result = result.filter(p => p.status === 'FOR SALE');
            } else if (filterStatus === 'rental') {
                result = result.filter(p => p.status === 'RENTAL');
            } else if (filterStatus === 'sold') {
                result = result.filter(p => p.status === 'SOLD');
            }
        }

        // Filter by Price Range
        if (priceMin) {
            result = result.filter(p => parseFloat(p.price) >= parseFloat(priceMin));
        }
        if (priceMax) {
            result = result.filter(p => parseFloat(p.price) <= parseFloat(priceMax));
        }

        // Filter by Community
        if (filterCommunity && filterCommunity !== 'All') {
            result = result.filter(p => p.community === filterCommunity);
        }

        setFilteredProperties(result);
    }, [properties, priceMin, priceMax, filterCommunity, filterStatus]);

    return (

        <div className={styles.mainWrapper}>
            {/* Hero Section with Search */}
            <div className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <div className={styles.filters}>
                        <div className={styles.filterGroup}>
                            <select className={styles.select} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                <option value="current">Current Listings</option>
                                <option value="sale">For Sale</option>
                                <option value="rental">For Rent</option>
                                <option value="sold">Sold</option>
                                <option value="all">All</option>
                            </select>
                        </div>

                        <div className={styles.filterGroup}>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="Min Price"
                                value={priceMin}
                                onChange={(e) => setPriceMin(e.target.value)}
                            />
                        </div>

                        <div className={styles.filterGroup}>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="Max Price"
                                value={priceMax}
                                onChange={(e) => setPriceMax(e.target.value)}
                            />
                        </div>

                        <div className={styles.filterGroup}>
                            <select className={styles.select} value={filterCommunity} onChange={(e) => setFilterCommunity(e.target.value)}>
                                <option value="All">All Communities</option>
                                {communities.map(c => (
                                    <option key={c.id} value={c.name}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Property Grid Section */}
            <div className={styles.listingSection}>
                <div className="container">
                    <div className={styles.grid}>
                        {filteredProperties.length > 0 ? (
                            filteredProperties.map((p, index) => (
                                <PropertyCard key={p.id} property={p} index={index} />
                            ))
                        ) : (
                            <div className={styles.noResults}>No properties found matching your criteria.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Properties() {
    return (
        <>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <PropertiesContent />
            </Suspense>
            <Footer />
        </>
    );
}
