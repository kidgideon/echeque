import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import {db} from "../../config/firebase"
import "../styles/analysis.css";

const Analysis = () => {
  const [chequeCount, setChequeCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [pendingTransactions, setPendingTransactions] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all cheques
        const chequesSnapshot = await getDocs(collection(db, "cheques"));
        const cheques = chequesSnapshot.docs.map(doc => doc.data());

        setChequeCount(cheques.length);

        const total = cheques.reduce((sum, cheque) => {
          const amt = Number(cheque.amount);
          return sum + (isNaN(amt) ? 0 : amt);
        }, 0);
        setTotalAmount(total);

        // Fetch all transactions
        const txSnapshot = await getDocs(collection(db, "transactions"));
        const transactions = txSnapshot.docs.map(doc => doc.data());

        const pending = transactions.filter(tx => tx.status === "pending").length;
        setPendingTransactions(pending);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="analysis-component">
      <div className="top-area-anal">
        <p>Work Statistics</p>
      </div>

      <div className="boxes-analysis">
        <div className="box-transactions">
          <i className="fa-solid fa-money-check-dollar"></i>
          <h1>{chequeCount}</h1>
          <p>Cheques Created</p>
        </div>

        <div className="box-transactions">
          <i className="fa-solid fa-wallet"></i>
          <h1>${totalAmount.toLocaleString()}</h1>
          <p>Total Amount Spent</p>
        </div>

        <div className="box-transactions">
          <i className="fa-solid fa-sack-dollar"></i>
          <h1>{pendingTransactions}</h1>
          <p>Pending Transactions</p>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
