import { motion } from 'framer-motion';
import styles from './Features.module.css';

const Features = () => {
  const features = [
    {
      icon: "fa-solid fa-bolt",
      title: "Instant Cheque Issuing",
      description: "Create and send digital cheques in seconds with our streamlined interface."
    },
    {
      icon: "fa-solid fa-shield-halved",
      title: "Secure Encrypted Transfers",
      description: "Bank-grade encryption ensures your payments are always protected and private."
    },
    {
      icon: "fa-solid fa-chart-line",
      title: "Track Payment Status",
      description: "Real-time tracking and notifications for all your digital cheque transactions."
    },
    {
      icon: "fa-solid fa-clock",
      title: "24/7 Processing",
      description: "Send and receive payments any time, anywhere, without banking hour restrictions."
    },
    {
      icon: "fa-solid fa-users",
      title: "Team Management",
      description: "Manage multiple users and set permissions for your business accounts."
    },
    {
      icon: "fa-solid fa-mobile-screen-button",
      title: "Mobile Optimized",
      description: "Full functionality across all devices with our responsive design."
    }
  ];

  return (
    <section className={styles.features} id="features">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>Why Choose eCheque?</h2>
          <p className={styles.subtitle}>
            Powerful features designed for modern businesses and professionals
          </p>
        </motion.div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={styles.featureCard}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.iconWrapper}>
                <i className={feature.icon}></i>
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
