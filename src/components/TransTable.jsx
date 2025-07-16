import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-sonner";
import { useNavigate } from "react-router-dom";
import "../styles/trans.css";

const TransactionsTable = ({ status }) => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      let ref = collection(db, "transactions");

      let q =
        status === "all"
          ? ref
          : query(ref, where("status", "==", status.toLowerCase()));

      const snapshot = await getDocs(q);
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTransactions(result);
    } catch (err) {
      toast.error("Failed to fetch transactions.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (txn) => {
    try {
      const chequeRef = doc(db, "cheques", txn.chequeId);
      const txnRef = doc(db, "transactions", txn.id);

      await updateDoc(txnRef, { status: "success" });
      await updateDoc(chequeRef, {
        status: "cashed",
        process: `cheque was paid to ${txn.recieversDetails?.fullname || "recipient"}`,
        amountSent: true,
      });

      toast.success("Transaction approved.");
      fetchTransactions();
    } catch (err) {
      toast.error("Failed to approve transaction.");
    }
  };

  const handleDecline = async (txn) => {
    try {
      const chequeRef = doc(db, "cheques", txn.chequeId);
      const txnRef = doc(db, "transactions", txn.id);

      await updateDoc(txnRef, { status: "declined" });
      await updateDoc(chequeRef, {
        status: "uncashed",
        process: "cheque is issued and uncashed",
        amountSent: false,
      });

      toast.success("Transaction declined.");
      fetchTransactions();
    } catch (err) {
      toast.error("Failed to decline transaction.");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [status]);

  const filteredTxns =
    status === "all" && filter !== "all"
      ? transactions.filter((txn) => txn.status === filter)
      : transactions;

  return (
    <div className="transactions-table-interface">
      <h2 className="table-title">
        {status.charAt(0).toUpperCase() + status.slice(1)} Transactions
      </h2>

      {status === "all" && (
        <div className="sort-options">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("pending")}>Pending</button>
          <button onClick={() => setFilter("success")}>Success</button>
          <button onClick={() => setFilter("declined")}>Declined</button>
        </div>
      )}

      <div className="table-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Recipient</th>
              <th>Type</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTxns.map((txn) => (
              <tr
                key={txn.id}
                className="txn-row"
                onClick={() => navigate(`/admin/manage-cheque/${txn.chequeId}`)}
              >
                <td>{txn.recieversDetails?.fullname || "Unknown"}</td>
                <td>{txn.type}</td>
                <td className={`status ${txn.status}`}>{txn.status}</td>
                <td>{new Date(txn.date?.seconds * 1000).toLocaleDateString()}</td>
                <td>
                  {txn.status === "pending" && (
                    <div className="action-btns">
                      <button onClick={(e) => { e.stopPropagation(); handleApprove(txn); }}>Approve</button>
                      <button className="decline" onClick={(e) => { e.stopPropagation(); handleDecline(txn); }}>Decline</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {!filteredTxns.length && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
