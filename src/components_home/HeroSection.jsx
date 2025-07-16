
import React from 'react';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.container}>
        <div className={styles.content}>
          <motion.div 
            className={styles.textContent}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className={styles.headline}>
              Send and Receive
              <span className={styles.highlight}> Cheques Digitally</span>
              <br />in Seconds
            </h1>
            
            <p className={styles.description}>
              The future of secure payments is here. eCheque revolutionizes traditional banking 
              with instant, encrypted digital cheque processing for businesses and professionals.
            </p>

            <div className={styles.features}>
              <div className={styles.feature}>
                <i className="fa-solid fa-bolt"></i>
                <span>Instant Processing</span>
              </div>
              <div className={styles.feature}>
                <i className="fa-solid fa-shield-halved"></i>
                <span>Bank-Grade Security</span>
              </div>
              <div className={styles.feature}>
                <i className="fa-solid fa-circle-check"></i>
                <span>100% Verified</span>
              </div>
            </div>

            <motion.button 
              className={styles.ctaButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free
            </motion.button>
          </motion.div>

          <motion.div 
            className={styles.heroImage}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className={styles.mockup}>
              <div className={styles.phone}>
                <div className={styles.screen}>
                  <div className={styles.chequePreview}>
                    <div className={styles.chequeHeader}>
                      <span className={styles.chequeTitle}>Digital Cheque</span>
                      <span className={styles.amount}>$2,500.00</span>
                    </div>
                    <div className={styles.chequeDetails}>
                      <div className={styles.detail}>
                        <span>To:</span>
                        <span>John Smith</span>
                      </div>
                      <div className={styles.detail}>
                        <span>From:</span>
                        <span>ABC Corporation</span>
                      </div>
                      <div className={styles.detail}>
                        <span>Status:</span>
                        <span className={styles.verified}>✓ Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
