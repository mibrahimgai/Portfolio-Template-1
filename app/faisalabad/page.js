import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export const metadata = {
    title: "Faisalabad | Ghulam Abbas Imran",
};

export default function Faisalabad() {
    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', color: '#333' }}>
            <Header />
            <main className={styles.container}>
                <div className={styles.headerGroup}>
                    <div className={styles.titleRow}>
                        {/* Location Icon */}
                        <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <h1 className={styles.title}>Faisalabad</h1>
                        <span className={styles.subtitle}>Faisalabad, PK</span>
                    </div>
                </div>

                <div className={styles.image}>
                    <img src="/faisalabad-aerial.jpg" alt="Faisalabad Clock Tower Aerial View" />
                </div>

                <div className={styles.content}>
                    <h2 className={styles.sectionTitle}>The History of Faisalabad, Pakistan</h2>

                    <p>
                        Faisalabad is one of Pakistan’s most significant cities due to its historical development, economic contribution, and role in agriculture and industry. Its growth from a small colonial settlement into a major urban and industrial center reflects broader patterns in the economic and social history of Punjab and Pakistan.
                    </p>
                    <p>
                        Faisalabad was founded in 1892 during British colonial rule and was originally named Lyallpur, after Sir James Broadwood Lyall, the Lieutenant Governor of the Punjab. The city was established as part of the Lower Chenab Canal irrigation project, which transformed previously barren land into fertile agricultural territory. The British designed Lyallpur as a planned city, with its center marked by a clock tower from which eight main bazaars radiated outward. This design, inspired by the Union Jack, facilitated administration, trade, and movement and remains a defining feature of the city today. The success of the canal system attracted settlers from different parts of Punjab, leading to rapid agricultural expansion and population growth.
                    </p>
                    <p>
                        After the partition of the Indian subcontinent in 1947, Lyallpur underwent significant demographic and social changes. A large number of Muslim refugees migrated to the city from India, while non-Muslim residents moved in the opposite direction. This migration accelerated urban expansion and increased demand for housing, employment, and infrastructure. In 1977, the city was renamed Faisalabad in honor of King Faisal bin Abdulaziz of Saudi Arabia, reflecting Pakistan’s diplomatic and political ties with the Muslim world.
                    </p>
                    <p>
                        Faisalabad holds a central position in Pakistan’s economy, particularly in the industrial sector. It is widely known as the “Manchester of Pakistan” because of its extensive textile industry, which includes spinning, weaving, dyeing, garment manufacturing, and textile exports. The city produces a substantial share of Pakistan’s textile goods and contributes significantly to national export earnings. In addition to textiles, Faisalabad hosts industries related to chemicals, fertilizers, pharmaceuticals, food processing, and engineering goods, making it one of the country’s most important industrial centers.
                    </p>
                    <p>
                        Agriculture also plays a vital role in Faisalabad’s importance. Located in the fertile plains of central Punjab, the region benefits from an extensive canal irrigation network. Major crops such as wheat, cotton, sugarcane, rice, and vegetables are produced in the surrounding areas. This strong agricultural base not only supports the local population but also supplies raw materials to the city’s industries, creating a close link between agriculture and manufacturing.
                    </p>
                    <p>
                        Faisalabad is also a major center of education and research. The University of Agriculture Faisalabad, established in 1961, is one of the leading agricultural institutions in South Asia and has played a key role in improving farming practices, crop yields, and agricultural research across Pakistan. Alongside it, the city hosts several engineering, medical, and general universities, contributing to the development of skilled human resources.
                    </p>
                    <p>
                        In summary, Faisalabad’s importance lies in its historical role as a planned colonial city, its transformation after independence, and its continued economic strength in agriculture and industry. Its contributions to employment, exports, education, and urban development make it a cornerstone of Pakistan’s economic and social structure.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
