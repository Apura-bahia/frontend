import styles from "../editorial/Editorial.module.css";

const EditorialSkeleton = () => {
    return (
        <section className={styles.section}>
            <style>
              {`
                @keyframes shimmer {
                  0% { background-position: -1000px 0; }
                  100% { background-position: 1000px 0; }
                }
                .skeleton-box {
                  animation: shimmer 2s infinite linear;
                  background: linear-gradient(to right, #f0f0f0 4%, #e0e0e0 25%, #f0f0f0 36%);
                  background-size: 1000px 100%;
                  border-radius: 8px;
                }
                .skeleton-header { height: 40px; width: 30%; margin-bottom: 1rem; }
                .skeleton-main-img { height: 400px; width: 100%; border-radius: 12px; }
                .skeleton-card-img { height: 200px; width: 100%; border-radius: 8px; }
                .skeleton-text { height: 20px; border-radius: 4px; margin-top: 0.8rem; }
                .skeleton-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1rem;}
              `}
            </style>

            <div className={styles.divisor__margin}>
                <div className="skeleton-box skeleton-header"></div>
                
                <div className={styles.divisor__contents}>
                    {/* DESTAQUE PRINCIPAL */}
                    <div style={{ flex: 1 }}>
                        <div className="skeleton-box skeleton-main-img"></div>
                        <div className="skeleton-box skeleton-text" style={{ width: '90%' }}></div>
                        <div className="skeleton-box skeleton-text" style={{ width: '60%' }}></div>
                    </div>

                    {/* GRID SECUNDÁRIO */}
                    <div className="skeleton-grid">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item}>
                                <div className="skeleton-box skeleton-card-img"></div>
                                <div className="skeleton-box skeleton-text" style={{ width: '80%' }}></div>
                                <div className="skeleton-box skeleton-text" style={{ width: '50%' }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditorialSkeleton;