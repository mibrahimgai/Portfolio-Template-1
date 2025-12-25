'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

function ContactForm() {
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        phone: '',
        message: '',
        newsletter: false
    });
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const property = searchParams.get('property');
        if (property) {
            setFormData(prev => ({
                ...prev,
                message: `I am interested in viewing the property: ${property}. Please contact me to schedule a time.`
            }));
        }
    }, [searchParams]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({
                    firstName: '',
                    lastName: '',
                    company: '',
                    email: '',
                    phone: '',
                    message: '',
                    newsletter: false
                });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.mainWrapper}>
            <Header />

            {/* Hero Section */}
            <div className={styles.heroSection}></div>

            <main className={styles.contentContainer}>
                {/* Profile Card */}
                <div className={styles.profileCard}>
                    <img
                        src="/placeholder-profile.jpg"
                        alt="Profile"
                        className={styles.profileImage}
                        onError={(e) => {
                            e.target.style.display = 'none'; // Hide if no image found, falling back to CSS background
                        }}
                    />
                    <h2 className={styles.profileName}>GHULAM ABBAS IMRAN</h2>
                    <div className={styles.profileInfo}>
                        <p>
                            <a href="tel:+9203008667256">+92 03008667256</a>
                        </p>
                        <p>
                            <a href="mailto:gaimran414@gmail.com">gaimran414@gmail.com</a>
                        </p>

                    </div>
                </div>

                {/* Contact Form */}
                <div className={styles.formContainer}>
                    <form className={styles.form} onSubmit={handleSubmit}>

                        <div className={styles.inputGroup}>
                            <input
                                className={styles.input}
                                type="text"
                                name="firstName"
                                placeholder="FIRST NAME"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                className={styles.input}
                                type="text"
                                name="lastName"
                                placeholder="LAST NAME"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                            <input
                                className={styles.input}
                                type="text"
                                name="company"
                                placeholder="COMPANY/ORGANIZATION"
                                value={formData.company}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                className={styles.input}
                                type="email"
                                name="email"
                                placeholder="EMAIL ADDRESS"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                className={styles.input}
                                type="tel"
                                name="phone"
                                placeholder="PHONE NUMBER"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                            <textarea
                                className={styles.textarea}
                                name="message"
                                placeholder="MESSAGE"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <div className={styles.checkboxGroup}>
                            <input
                                type="checkbox"
                                id="newsletter"
                                name="newsletter"
                                checked={formData.newsletter}
                                onChange={handleChange}
                                className={styles.checkbox}
                            />
                            <label htmlFor="newsletter" className={styles.checkboxLabel}>
                                Yes, add me to the newsletter
                            </label>
                        </div>

                        <button
                            className={styles.submitButton}
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'SEND MESSAGE'}
                        </button>

                        {status === 'success' && (
                            <div className={styles.statusMessage}>
                                Thank you! Your message has been sent.
                            </div>
                        )}

                        {status === 'error' && (
                            <div className={styles.statusMessage}>
                                Something went wrong. Please try again or contact us directly.
                            </div>
                        )}
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function Contact() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ContactForm />
        </Suspense>
    );
}
