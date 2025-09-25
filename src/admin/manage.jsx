import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-sonner";
import Navbar from "../components/navbar";
import "../styles/manage.css";

const ManageCheque = () => {
  const { chequeId } = useParams();
  const [cheque, setCheque] = useState(null);
  const [txn, setTxn] = useState(null);
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [processInput, setProcessInput] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);

  // Fetch cheque and transaction
  const fetchData = async () => {
    try {
      const chequeRef = doc(db, "cheques", chequeId);
      const chDoc = await getDoc(chequeRef);
      if (!chDoc.exists()) throw new Error("Cheque not found");
      const chData = { id: chDoc.id, ...chDoc.data() };
      setCheque(chData);
      setProcessInput(chData.process || "");

      const txnQuery = query(
        collection(db, "transactions"),
        where("chequeId", "==", chequeId)
      );
      const snap = await getDocs(txnQuery);
      if (!snap.empty) {
        const tx = snap.docs[0].data();
        setTxn({ id: snap.docs[0].id, ...tx });
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update process
  const saveProcess = async () => {
    if (!processInput.trim()) return toast.error("Process cannot be empty");
    setLoadingProcess(true);
    try {
      await updateDoc(doc(db, "cheques", chequeId), { process: processInput });
      toast.success("Process updated");
      fetchData();
    } catch {
      toast.error("Failed to update process");
    } finally {
      setLoadingProcess(false);
    }
  };

  // Copy link to clipboard
  const copyChequeLink = () => {
    const link = `${window.location.origin}/echeque/${cheque.chequeId}`;
    navigator.clipboard.writeText(link);
    toast.success("Cheque link copied!");
  };

  if (!cheque) return <p>Loading...</p>;

  // Filter receiver details to only show non-empty values
  const receiverDetails = cheque.receiversDetails
    ? Object.entries(cheque.receiversDetails)
        .filter(([key, val]) => val && val.trim() !== "")
        .slice(0, 4) // ensure only max 4 fields
    : [];

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="area">
        <h2>
          <i className="fa-solid fa-money-check-dollar"></i> Manage Cheque
        </h2>

        {/* Cheque Info */}
        <div className="cheque-info">
          <p><strong>Cheque ID:</strong> {cheque.chequeId}</p>
          <p><strong>Sender:</strong> {cheque.sendersName}</p>
          <p><strong>Receiver:</strong> {cheque.receiverName}</p>
          <p><strong>Amount:</strong> ${cheque.amount}</p>
          <p><strong>Status:</strong> {cheque.status}</p>
          <p><strong>Created:</strong> {cheque.createdAt?.toDate?.()?.toLocaleString()}</p>
          {cheque.password && cheque.password !== "" && (
            <p><strong>Password:</strong> {cheque.password}</p>
          )}
          <p>
            <strong>Cheque Link:</strong>{" "}
            <span className="cheque-link" onClick={copyChequeLink}>
              {window.location.origin}/echeque/{cheque.chequeId} <i className="fa-solid fa-copy"></i>
            </span>
          </p>
        </div>

        {/* Edit Process */}
        <div className="process-box">
          <label htmlFor="process"><strong>Process:</strong></label>
          <input
            id="process"
            value={processInput}
            onChange={(e) => setProcessInput(e.target.value)}
          />
          <button onClick={saveProcess} disabled={loadingProcess}>
            {loadingProcess ? "Saving..." : "Save Process"}
          </button>
        </div>

        {/* Receiver Details */}
        {receiverDetails.length > 0 && (
          <div className="receiver-details">
            <h3>Receiver Details</h3>
            {receiverDetails.map(([key, val]) => (
              <p key={key}><strong>{key}:</strong> {val}</p>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ManageCheque;
