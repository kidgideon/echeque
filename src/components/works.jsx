import { motion } from "framer-motion";
import Styles from "../styles/home.module.css";

const Works = () => {
  const workItems = [
    {
      icon: "fa-money-check",
      title: "Request a Cheque",
      subtitle: "Contact an admin to receive a digital cheque."
    },
    {
      icon: "fa-link",
      title: "Access the Cheque Link",
      subtitle: "Click the link to view your assigned cheque."
    },
    {
      icon: "fa-money-bill-transfer",
      title: "Choose Withdrawal Method",
      subtitle: "Provide detailed info about your preferred payment option."
    },
    {
      icon: "fa-person-circle-check",
      title: "Get Credited",
      subtitle: "Receive funds after verification and approval."
    }
  ];

  return (
    <div className={Styles.worksInterface}>
      <h1 className={Styles.TitleText}>How It Works</h1>
      <div className={Styles.howBlock}>
        {workItems.map((item, index) => (
          <motion.div
            className={Styles.workBlock}
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <i className={`fa-solid ${item.icon}`}></i>
            <p className={Styles.mainText}>{item.title}</p>
            <p className={Styles.subText}>{item.subtitle}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Works;
