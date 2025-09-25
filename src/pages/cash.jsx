import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../../config/firebase";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-sonner";
import Navbar from "../components/userNav";
import Footer from "../components/footer";
import "../styles/cash.css";

const paymentOptions = [
  { name: "PayPal", icon: "fa-brands fa-paypal" },
  { name: "Stripe", icon: "fa-brands fa-cc-stripe" },
  { name: "Venmo", icon: "fa-brands fa-cc-visa" },
  { name: "Cash App", icon: "fa-solid fa-sack-dollar" },
  { name: "Zelle", icon: "fa-solid fa-building-columns" },
  { name: "Apple Pay", icon: "fa-brands fa-apple-pay" },
  { name: "Google Pay", icon: "fa-brands fa-google-pay" },
  { name: "Wise", icon: "fa-solid fa-globe" },
  { name: "Revolut", icon: "fa-solid fa-credit-card" },
  { name: "Crypto", icon: "fa-brands fa-bitcoin" },
  { name: "Others", icon: "fa-solid fa-plus" },
];

const CashCheque = () => {
  const { chequeId } = useParams();
  const navigate = useNavigate();

  const [chequeData, setChequeData] = useState(null);
  const [step, setStep] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [details, setDetails] = useState({ recipientAddress: "", bankName: "", accountNumber: "" });
  const [fullname, setFullname] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCheque = async () => {
      try {
        const chequeRef = doc(db, "cheques", chequeId);
        const chequeSnap = await getDoc(chequeRef);

        if (!chequeSnap.exists()) {
          toast.error("Cheque does not exist.");
          navigate("/");
          return;
        }

        const data = chequeSnap.data();
        setChequeData(data);

        if (data.status === "cashed") {
          const auth = getAuth();
          await signOut(auth);
          toast.error("This cheque has already been cashed.");
          navigate("/");
        }
      } catch (err) {
        console.error("Error fetching cheque:", err);
        toast.error("Could not verify cheque status.");
        navigate("/");
      }
    };

    fetchCheque();
  }, [chequeId, navigate]);

  const reset = () => {
    setStep(0);
    setSelectedMethod(null);
    setDetails({ recipientAddress: "", bankName: "", accountNumber: "" });
    setFullname("");
    setPasswordInput("");
  };

  const handleDetailsChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!details.recipientAddress.trim()) {
      toast.error("Enter recipient address");
      return;
    }

    if (selectedMethod === "Others" && (!details.bankName.trim() || !details.accountNumber.trim())) {
      toast.error("Fill all bank fields");
      return;
    }

    if (chequeData?.password && chequeData.password !== "") {
      setStep(3);
    } else {
      setStep(2);
    }
  };

  const handlePasswordSubmit = () => {
    if (passwordInput !== chequeData.password) {
      toast.error("Incorrect password");
      return;
    }
    setStep(2);
  };

  const handleFinish = async () => {
    if (!fullname.trim()) {
      toast.error("Full name is required");
      return;
    }

    setLoading(true);
    const transactionID = Math.floor(1000000000 + Math.random() * 9000000000).toString();

    try {
      // Save transaction
      await setDoc(doc(db, "transactions", transactionID), {
        transactionID,
        chequeId,
        status: "pending",
        receiversDetails: { fullname, ...details }, // includes recipientAddress
        type: "cash cheque",
        date: serverTimestamp(),
      });

      // Update cheque with receiver info and cashing status
      await setDoc(
        doc(db, "cheques", chequeId),
        {
          status: "cashed",
          process: "Cheque has been cashed and is waiting for approval",
          transactionID,
          receiverName: fullname,                 // save the full name
          receiversDetails: { ...details, fullname }, // save details consistently
        },
        { merge: true }
      );

      toast.success("Cheque cashed. Awaiting approval.");
      navigate(`/echeque/${chequeId}`);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cash-cheque-page">
      <Navbar />
      <h2>Select Payment Method</h2>
      <div className="payment-methods-grid">
        {paymentOptions.map((opt, i) => (
          <div
            key={i}
            className={`payment-method-card ${selectedMethod === opt.name ? "active" : ""}`}
            onClick={() => {
              setSelectedMethod(opt.name);
              setStep(1);
            }}
          >
            <i className={opt.icon}></i>
            <span>{opt.name}</span>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {/* Step 1: Payment details */}
        {step === 1 && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-box" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <h3>Enter {selectedMethod} Details</h3>
              <input
                type="text"
                name="recipientAddress"
                value={details.recipientAddress}
                placeholder="Recipient address"
                onChange={handleDetailsChange}
              />
              {selectedMethod === "Others" && (
                <>
                  <input
                    type="text"
                    name="bankName"
                    value={details.bankName}
                    placeholder="Bank Name"
                    onChange={handleDetailsChange}
                  />
                  <input
                    type="text"
                    name="accountNumber"
                    value={details.accountNumber}
                    placeholder="Account Number"
                    onChange={handleDetailsChange}
                  />
                </>
              )}
              <div className="modal-buttons">
                <button className="btn-outline" onClick={reset}>
                  Cancel
                </button>
                <button className="btn-black" onClick={handleNext}>
                  Next
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Step 3: Password input (if required) */}
        {step === 3 && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-box" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <h3>Enter Cheque Password</h3>
              <input
                type="password"
                placeholder="Password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              <div className="modal-buttons">
                <button className="btn-outline" onClick={reset}>
                  Cancel
                </button>
                <button className="btn-black" onClick={handlePasswordSubmit}>
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Step 2: Fullname & complete transaction */}
        {step === 2 && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-box" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <h3>Your Full Name</h3>
              <input type="text" placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} />
              <div className="modal-buttons">
                <button className="btn-outline" onClick={reset}>
                  Cancel
                </button>
                <button className="comp-btn" onClick={handleFinish} disabled={loading}>
                  {loading ? "Processing..." : "Complete Transaction"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default CashCheque;
