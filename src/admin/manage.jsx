import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
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

  // Fetch cheque and its transaction
  const fetchData = async () => {
    try {
      const chequeRef = doc(db, "cheques", chequeId);
      const chDoc = await getDoc(chequeRef);
      if (!chDoc.exists()) throw new Error("Cheque not found");
      setCheque({ id: chDoc.id, ...chDoc.data() });
      setProcessInput(chDoc.data().process || "");

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

  // Update process text
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

  // Approve / Decline
  const handleAction = async (isApprove) => {
    if (!txn) return;
    setLoadingAction(true);
    try {
      const txnRef = doc(db, "transactions", txn.id);
      const chequeRef = doc(db, "cheques", chequeId);

      await updateDoc(txnRef, {
        status: isApprove ? "success" : "declined",
      });

      await updateDoc(chequeRef, {
        status: isApprove ? "cashed" : "uncashed",
        process: isApprove
          ? `Cheque was paid to ${cheque.recieversDetails.fullname}`
          : "cheque is issued and uncashed",
        amountSent: isApprove,
      });

      toast.success(isApprove ? "Approved" : "Declined");
      fetchData();
    } catch {
      toast.error("Action failed");
    } finally {
      setLoadingAction(false);
    }
  };

  if (!cheque) return <p>Loading...</p>;

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="area ">
        <h2>
          <i className="fa-solid fa-money-check-dollar"></i> Manage Cheque
        </h2>

        {/* Cheque Info */}
        <div className="cheque-info">
          <p><strong>Cheque ID:</strong> {cheque.chequeId}</p>
          <p><strong>Sender:</strong> {cheque.sendersName}</p>
          <p><strong>Receiver:</strong> {cheque.recieverName}</p>
          <p><strong>Amount:</strong> ${cheque.amount}</p>
          <p><strong>Status:</strong> {cheque.status}</p>
          <p><strong>Created:</strong> {cheque.createdAt?.toDate().toLocaleString()}</p>
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
        <div className="receiver-details">
          <h3>Receiver Details</h3>
          {cheque.recieversDetails &&
            Object.entries(cheque.recieversDetails).map(([key, val]) => (
              <p key={key}><strong>{key}:</strong> {val}</p>
            ))}
        </div>
        
        {/* Transaction Section */}
        {txn ? (
          <div className="txn-actions">
            <h3>Transaction ID: {txn.transactionId}</h3>
            <p>Status: <span className={`txn-status ${txn.status}`}>{txn.status}</span></p>
            {txn.status === "pending" && (
              <div className="action-buttons">
                <button onClick={() => handleAction(true)} disabled={loadingAction}>
                  Approve
                </button>
                <button className="decline" onClick={() => handleAction(false)} disabled={loadingAction}>
                  Decline
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="no-transaction">No transaction exists for this cheque.</p>
        )}
      </div>
    </div>
  );
};

export default ManageCheque;
