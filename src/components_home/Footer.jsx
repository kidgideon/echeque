
import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3 className={styles.logo}>eCheque</h3>
            <p className={styles.tagline}>
              Revolutionizing digital payments with secure, instant cheque processing.
            </p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Product</h4>
              <a href="#features" className={styles.link}>Features</a>
              <a href="#how-it-works" className={styles.link}>How It Works</a>
              <a href="#pricing" className={styles.link}>Pricing</a>
              <a href="#security" className={styles.link}>Security</a>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Company</h4>
              <a href="#about" className={styles.link}>About Us</a>
              <a href="#careers" className={styles.link}>Careers</a>
              <a href="#blog" className={styles.link}>Blog</a>
              <a href="#press" className={styles.link}>Press</a>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Support</h4>
              <a href="#help" className={styles.link}>Help Center</a>
              <a href="#contact" className={styles.link}>Contact</a>
              <a href="#status" className={styles.link}>Status</a>
              <a href="#api" className={styles.link}>API Docs</a>
            </div>
          </div>

          <div className={styles.contact}>
            <h4 className={styles.columnTitle}>Contact Info</h4>
            <div className={styles.contactItem}>
              <i className="fa-solid fa-envelope"></i>
              <span>support@echeque.com</span>
            </div>
            <div className={styles.contactItem}>
              <i className="fa-solid fa-phone"></i>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className={styles.contactItem}>
              <i className="fa-solid fa-location-dot"></i>
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.legal}>
            <a href="#privacy" className={styles.legalLink}>Privacy Policy</a>
            <a href="#terms" className={styles.legalLink}>Terms of Service</a>
            <a href="#cookies" className={styles.legalLink}>Cookie Policy</a>
          </div>
          <p className={styles.copyright}>
            © 2024 eCheque. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
