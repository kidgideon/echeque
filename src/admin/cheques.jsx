import { useEffect, useState } from "react";
import { db, storage } from "../../config/firebase";
import {
  collection,
  getDocs,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-sonner";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import "../styles/cheques.css";

const Cheques = () => {
  const [cheques, setCheques] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    sendersName: "",
    description: "",
    recieverName: "",
    amount: "",
  });
  const [bankName, setBankName] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [logoFile, setLogoFile] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/svg+xml",
    ];

    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, WEBP or SVG files are allowed.");
      return;
    }

    setLogoFile(file);
  };

  const generateChequeId = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString(); // 10 digits
  };

  const createCheque = async () => {
    const { sendersName, description, recieverName, amount } = form;
    if (
      !sendersName ||
      !description ||
      !recieverName ||
      !amount ||
      !bankName ||
      !currency ||
      !logoFile
    ) {
      toast.error("All fields including logo and bank details are required.");
      return;
    }

    setLoading(true);
    try {
      const chequeId = generateChequeId();
      const storageRef = ref(storage, `bankLogos/${chequeId}`);
      await uploadBytes(storageRef, logoFile);
      const logoUrl = await getDownloadURL(storageRef);

      await setDoc(doc(db, "cheques", chequeId), {
        chequeId,
        createdAt: serverTimestamp(),
        description,
        amount: parseFloat(amount),
        status: "uncashed",
        process: "cheque is issued and uncashed",
        sendersName,
        recieverName,
        recieversDetails: { fullname: "" },
        amountSent: false,
        link: `echeques/${chequeId}`,
        transactionID: 0,
        bankName,
        currency,
        bankLogo: logoUrl,
      });

      toast.success("Cheque created.");
      setForm({
        sendersName: "",
        description: "",
        recieverName: "",
        amount: "",
      });
      setBankName("");
      setCurrency("usd");
      setLogoFile(null);
      fetchCheques();
    } catch (error) {
      toast.error("Failed to create cheque.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCheques = async () => {
    const querySnapshot = await getDocs(collection(db, "cheques"));
    const fetched = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCheques(fetched);
  };

  useEffect(() => {
    fetchCheques();
  }, []);

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="area">
        {/* FORM */}
        <div className="cheque-creation-form">
          <div className="cheque-form">
            <i className="fa-solid fa-money-check-dollar"></i>
            <h2>Create Cheque</h2>

            <input
              type="text"
              placeholder="Sender's name"
              name="sendersName"
              value={form.sendersName}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Receiver's full name"
              name="recieverName"
              value={form.recieverName}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Amount"
              name="amount"
              value={form.amount}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Bank name"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            />
 <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
            />
            <select className="selectValue_Value" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="ngn">NGN</option>
              <option value="gbp">GBP</option>
            </select>

            <button onClick={createCheque} disabled={loading}>
              {loading ? "Creating..." : "Create Cheque"}
            </button>
          </div>
        </div>

        {/* EXISTING */}
        <div className="cheques-existing-cheques">
          {cheques.length > 0 ? (
            cheques.map((cheque) => (
              <div
                key={cheque.chequeId}
                className="cheque-box"
                onClick={() => navigate(`/admin/manage-cheque/${cheque.chequeId}`)}
              >
                <i className="fa-solid fa-money-bills lead-icon"></i>
                <p className="cheque-amount-cheque">
                  {cheque.currency?.toUpperCase()} {cheque.amount}
                </p>
                <p className="cheque-amount-owner">{cheque.recieverName}'s cheque</p>
              </div>
            ))
          ) : (
            <div className="no-cheques-created">
              <i className="fa-solid fa-circle-xmark"></i>
              No cheques created
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cheques;
