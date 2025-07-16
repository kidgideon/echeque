
import React from 'react';
import { motion } from 'framer-motion';
import styles from './HowItWorks.module.css';

const HowItWorks = () => {
  const steps = [
    {
      icon: "fa-solid fa-user-plus",
      title: "Create",
      description: "Sign up and create your digital cheque in our secure platform"
    },
    {
      icon: "fa-solid fa-paper-plane",
      title: "Send",
      description: "Send your cheque instantly to any recipient via email or phone"
    },
    {
      icon: "fa-solid fa-money-bill-wave",
      title: "Get Paid",
      description: "Recipient receives and cashes the cheque securely within minutes"
    }
  ];

  return (
    <section className={styles.howItWorks} id="how-it-works">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>How It Works</h2>
          <p className={styles.subtitle}>
            Get started with eCheque in three simple steps
          </p>
        </motion.div>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div key={index} className={styles.stepWrapper}>
              <motion.div
                className={styles.step}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={styles.stepNumber}>{index + 1}</div>
                <div className={styles.iconWrapper}>
                  <i className={step.icon}></i>
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </motion.div>
              {index < steps.length - 1 && (
                <div className={styles.connector}>
                  <div className={styles.arrow}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
