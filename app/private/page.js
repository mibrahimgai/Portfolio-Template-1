'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function PrivatePage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('properties'); // 'properties' or 'communities'

    // Data
    const [properties, setProperties] = useState([]);
    const [communities, setCommunities] = useState([]);

    // Property Form
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        status: 'FOR SALE',
        address: '',
        city: 'Faisalabad',
        community: '',
        sizeValue: '',
        sizeUnit: 'Marla',
        imagesCombined: '', // Changed from single 'image' to combined string
        featured: false,
        description: ''
    });

    // Community Form
    const [communityData, setCommunityData] = useState({
        name: '',
        image: ''
    });

    const checkAuth = () => {
        if (password === 'Ibrahim414') {
            setIsAuthenticated(true);
            refreshData();
        } else {
            alert('Incorrect Password');
        }
    };

    const refreshData = () => {
        fetch('/api/properties', { cache: 'no-store' }).then(res => res.json()).then(setProperties);
        fetch('/api/communities', { cache: 'no-store' }).then(res => res.json()).then(setCommunities);
    };

    // Property Actions
    const handlePropSubmit = async (e) => {
        e.preventDefault();

        // Process images
        let imagesArray = [];
        if (formData.imagesCombined) {
            imagesArray = formData.imagesCombined.split(',').map(url => url.trim()).filter(url => url !== '');
        }

        // Fallback if empty
        if (imagesArray.length === 0) {
            imagesArray = ['https://placehold.co/800x600/101010/FFF?text=New+Listing'];
        }

        const dataToSend = {
            ...formData,
            images: imagesArray,
            // Remove temporary field
        };
        delete dataToSend.imagesCombined;

        await fetch('/api/properties', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        });

        refreshData();
        refreshData();
        setFormData({ ...formData, title: '', price: '', address: '', sizeValue: '', imagesCombined: '', featured: false, description: '' });
        alert('Property Added');
    };

    const handlePropDelete = async (id) => {
        if (!confirm('Delete Property?')) return;
        await fetch(`/api/properties?id=${id}`, { method: 'DELETE' });
        refreshData();
    };

    const toggleFeatured = async (prop) => {
        const updated = { ...prop, featured: !prop.featured };
        const res = await fetch('/api/properties', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated)
        });

        if (res.ok) {
            refreshData();
        } else {
            console.error("Failed to update featured status");
            alert("Failed to update status. Check console.");
        }
    };

    // Community Actions
    const handleCommSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            ...communityData,
            image: communityData.image || 'https://placehold.co/800x600/333/FFF?text=Community'
        };

        await fetch('/api/communities', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        });

        refreshData();
        setCommunityData({ name: '', image: '' });
        alert('Community Added');
    };

    const handleCommDelete = async (id) => {
        if (!confirm('Delete Community?')) return;
        await fetch(`/api/communities?id=${id}`, { method: 'DELETE' });
        refreshData();
    };

    if (!isAuthenticated) {
        return (
            <>
                <Header />
                <div className={styles.container}>
                    <div className={styles.loginBox}>
                        <h2 style={{ marginBottom: '1rem' }}>Private Access</h2>
                        <input type="password" placeholder="Enter Code" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className={styles.button} onClick={checkAuth}>ENTER</button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.dashboardHeader}>
                    <h1>Admin Dashboard</h1>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className={styles.button} style={{ background: activeTab === 'properties' ? '#fff' : '#333', color: activeTab === 'properties' ? '#000' : '#fff' }} onClick={() => setActiveTab('properties')}>PROPERTIES</button>
                        <button className={styles.button} style={{ background: activeTab === 'communities' ? '#fff' : '#333', color: activeTab === 'communities' ? '#000' : '#fff' }} onClick={() => setActiveTab('communities')}>COMMUNITIES</button>
                        <button className={styles.button} style={{ width: 'auto' }} onClick={() => setIsAuthenticated(false)}>LOGOUT</button>
                    </div>
                </div>

                {activeTab === 'properties' ? (
                    <>
                        <form className={styles.form} onSubmit={handlePropSubmit}>
                            <h3>Add New Property</h3>
                            <input className={styles.input} placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                            <input type="number" className={styles.input} placeholder="Price (PKR)" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                            <input className={styles.input} placeholder="Address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} required />

                            <textarea
                                className={styles.input}
                                style={{ width: '100%', height: '80px', fontFamily: 'inherit' }}
                                placeholder="Description"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input type="number" className={styles.input} placeholder="Size" value={formData.sizeValue} onChange={e => setFormData({ ...formData, sizeValue: e.target.value })} required />
                                <select className={styles.input} value={formData.sizeUnit} onChange={e => setFormData({ ...formData, sizeUnit: e.target.value })}>
                                    <option value="Marla">Marla</option>
                                    <option value="Kanal">Kanal</option>
                                </select>
                            </div>

                            <select className={styles.input} value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                <option value="FOR SALE">FOR SALE</option>
                                <option value="RENTAL">RENTAL</option>
                                <option value="SOLD">SOLD</option>
                            </select>

                            <select className={styles.input} value={formData.community} onChange={e => setFormData({ ...formData, community: e.target.value })}>
                                <option value="">Select Community</option>
                                {communities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                            </select>

                            <div className={styles.formFull}>
                                <label style={{ color: '#888', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>Images (Comma separated URLs)</label>
                                <textarea
                                    className={styles.input}
                                    style={{ width: '100%', height: '100px', fontFamily: 'monospace' }}
                                    placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                                    value={formData.imagesCombined}
                                    onChange={e => setFormData({ ...formData, imagesCombined: e.target.value })}
                                />
                            </div>

                            <div className={styles.formFull} style={{ color: '#fff' }}>
                                <label>
                                    <input type="checkbox" checked={formData.featured} onChange={e => setFormData({ ...formData, featured: e.target.checked })} /> Show on Homepage (Featured)
                                </label>
                            </div>

                            <button type="submit" className={`${styles.button} ${styles.formFull}`}>ADD PROPERTY</button>
                        </form>

                        <div className={styles.propertyList}>
                            <h3>Listings</h3>
                            {properties.map(p => (
                                <div key={p.id} className={styles.propertyItem}>
                                    <div className={styles.propertyInfo}>
                                        <h4>{p.title} {p.featured && <span style={{ color: 'gold', fontSize: '0.8rem' }}>★ FEATURED</span>}</h4>
                                        <p>{p.sizeValue} {p.sizeUnit} | {p.community}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button className={styles.button} style={{ width: 'auto', padding: '0.5rem' }} onClick={() => toggleFeatured(p)}>{p.featured ? 'Unfeature' : 'Feature'}</button>
                                        <button className={styles.deleteBtn} onClick={() => handlePropDelete(p.id)}>REMOVE</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <form className={styles.form} onSubmit={handleCommSubmit}>
                            <h3>Add Community</h3>
                            <input className={`${styles.input} ${styles.formFull}`} placeholder="Community Name" value={communityData.name} onChange={e => setCommunityData({ ...communityData, name: e.target.value })} required />
                            <input className={`${styles.input} ${styles.formFull}`} placeholder="Image URL" value={communityData.image} onChange={e => setCommunityData({ ...communityData, image: e.target.value })} />
                            <button type="submit" className={`${styles.button} ${styles.formFull}`}>ADD COMMUNITY</button>
                        </form>

                        <div className={styles.propertyList}>
                            <h3>Communities</h3>
                            {communities.map(c => (
                                <div key={c.id} className={styles.propertyItem}>
                                    <h4>{c.name}</h4>
                                    <button className={styles.deleteBtn} onClick={() => handleCommDelete(c.id)}>REMOVE</button>
                                </div>
                            ))}
                        </div>
                    </>
                )}

            </div>
            <Footer />
        </>
    );
}
