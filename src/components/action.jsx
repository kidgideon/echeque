import { motion } from "framer-motion";
import Styles from "../styles/home.module.css";

const Action = () => {
  return (
    <div className={Styles.actionInterface}>
      <div className={Styles.textArea}>
        <h1 className={Styles.boldText}>
          The future of{" "}
          <span className={Styles.gradientText}>payment</span>{" "}
          <span className={Styles.gradientTextTwo}>processing</span>
        </h1>
        <p className={Styles.mildText}>
          Revolutionary online payment gateway that processes payments through secure
          digital cheques. Experience seamless, fast, and secure transactions like never
          before.
        </p>
      </div>

      <div className={Styles.formArea}>
        <motion.div
          className={Styles.form}
          animate={{ y: [10, -8, 10] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        >
          <div className={Styles.iconBackground}>
            <i className="fa-solid fa-money-check"></i>
          </div>

          <div className={Styles.formGroup}>
            <input type="text" placeholder=" " required />
            <label>Cheque No</label>
          </div>

          <div className={Styles.formGroup}>
            <input type="text" placeholder=" " required />
            <label>Full Name</label>
          </div>

          <button className={Styles.btnPrimary}>Cash a Cheque</button>
        </motion.div>
      </div>
    </div>
  );
};

export default Action;
