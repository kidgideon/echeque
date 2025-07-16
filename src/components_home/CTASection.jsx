
import React from 'react';
import { motion } from 'framer-motion';
import styles from './CTASection.module.css';

const CTASection = () => {
  return (
    <section className={styles.cta} id="get-started">
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>
            Join hundreds of professionals switching to secure eCheques today
          </h2>
          
          <p className={styles.description}>
            Transform your payment process with the most advanced digital cheque platform. 
            Trusted by businesses worldwide for secure, instant transactions.
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <i className="fa-solid fa-users"></i>
              <div className={styles.statContent}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Active Users</span>
              </div>
            </div>
            <div className={styles.stat}>
              <i className="fa-solid fa-shield-halved"></i>
              <div className={styles.statContent}>
                <span className={styles.statNumber}>99.9%</span>
                <span className={styles.statLabel}>Secure Transactions</span>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <motion.button 
              className={styles.primaryButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
              <i className="fa-solid fa-arrow-right"></i>
            </motion.button>
            
            <motion.button 
              className={styles.secondaryButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
