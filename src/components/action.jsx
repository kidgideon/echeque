import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db} from "../../config/firebase"; // Adjust path to your firebase config
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { toast } from "react-sonner";
import Styles from "../styles/home.module.css";

const Action = () => {
  const [chequeNo, setChequeNo] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  1349753816

  const handleCashCheque = async () => {
    if (!chequeNo.trim()) {
      toast.error("Please enter a cheque number");
      return;
    }

    setLoading(true);
    try {
      const docRef = doc(db, "cheques", chequeNo.trim());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        navigate(`/echeque/${chequeNo.trim()}`);
      } else {
        toast.error("Invalid cheque number");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Styles.actionInterface}>
      <div className={Styles.textArea}>
        <h1 className={Styles.boldText}>
          Swift and Secure{" "}
          <span className={Styles.gradientText}>payment</span>{" "}
          <span className={Styles.gradientTextTwo}>processor</span>
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
            <input
              style={{ backgroundColor: "#e6ffeeff" }}
              type="text"
              placeholder=" "
              required
              value={chequeNo}
              onChange={(e) => setChequeNo(e.target.value)}
            />
            <label>Cheque No</label>
          </div>

          <div className={Styles.formGroup}>
            <input
              style={{ backgroundColor: "#e6ffeeff" }}
              type="text"
              placeholder=" "
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <label>Full Name</label>
          </div>

          <button
            className={Styles.btnPrimary}
            onClick={handleCashCheque}
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i> Verifying...
              </>
            ) : (
              "Cash a Cheque"
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Action;
