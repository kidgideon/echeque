import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import PaperCheque from "../components/paperCheque";
import "../styles/echeque.css";
import Navbar from "../components/userNav";
import Footer from "../components/footer";

const EchequeInterface = () => {
  const { chequeId } = useParams();
  const navigate = useNavigate();

  const [cheque, setCheque] = useState(null);
  const [loadingProcess, setLoadingProcess] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    const fetchCheque = async () => {
      setLoadingProcess(true);
      try {
        const ref = doc(db, "cheques", chequeId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setCheque(snap.data());
        }
      } catch (err) {
        console.error("Error fetching cheque:", err);
      } finally {
        setLoadingProcess(false);
      }
    };

    if (chequeId) fetchCheque();
  }, [chequeId]);

  const handleCashClick = () => {
    setButtonLoading(true);
    setTimeout(() => {
      navigate(`/cash-cheque/${chequeId}`);
    }, 800); // simulate delay
  };

  const isCashed = cheque?.status === "cashed";

  return (
    <div className="container-cheque-area">
<Navbar/>
      <div className="process-area-cheque">
        <i className="fa-solid fa-comments"></i>
        {loadingProcess ? (
          <>
            <i className="fa-solid fa-spinner fa-spin"></i>
          </>
        ) : (
          cheque?.process || "No process info"
        )}
      </div>

      <PaperCheque chequeId={chequeId} />

      <button
        className="cash-cheque-btn"
        disabled={isCashed || buttonLoading || loadingProcess}
        onClick={handleCashClick}
      >
        {buttonLoading ? (
          <>
            <i className="fa-solid fa-spinner fa-spin"></i> Preparing cheque...
          </>
        ) : isCashed ? (
          "Cheque already cashed"
        ) : (
          "Cash cheque"
        )}
      </button>

      <Footer/>
    </div>
  );
};

export default EchequeInterface;
