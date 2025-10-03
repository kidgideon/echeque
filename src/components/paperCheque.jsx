import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import "../styles/paper.css";

const PaperCheque = ({ chequeId }) => {
  const [cheque, setCheque] = useState(null);

  useEffect(() => {
    const fetchCheque = async () => {
      try {
        const ref = doc(db, "cheques", chequeId);
        const snap = await getDoc(ref);
        if (snap.exists()) setCheque(snap.data());
      } catch (err) {
        console.error("Failed to fetch cheque:", err);
      }
    };

    if (chequeId) fetchCheque();
  }, [chequeId]);

  if (!cheque) {
    return <p><i className="fa-solid fa-spinner fa-spin"></i></p>;
  }

  const {
    sendersName,
    recieverName,
    description,
    amount,
    createdAt,
    bankName,
    bankLogo,
    currency = "USD" // default fallback
  } = cheque;

  const date = createdAt?.toDate ? new Date(createdAt.toDate()) : new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const amountStr = parseFloat(amount).toFixed(2);
  const dollars = Math.floor(amount);
  const cents = Math.round((amount - dollars) * 100);
  const amountWords = `${numberToWords(dollars)} and ${cents
    .toString()
    .padStart(2, "0")}/100 ${currency.toUpperCase()} Only`;

  return (
    <div className="cheque-wrapper">
      <div className="cheque-container">
        {/* Security header */}
        <div className="security-header">
          THIS CHEQUE CONTAINS MICROPRINTING AND WATERMARK. PROTECTED BY LAW.
        </div>

        {/* Bank Header */}
        <div className="bank-header">
          {bankLogo && (
            <img
              src={bankLogo}
              alt="Bank Logo"
              className="bank-logo"
              onError={(e) => (e.target.style.display = "none")}
            />
          )}
          <div className="bank-name">{bankName || "Bank of swiftCheque"}</div>
        </div>

        {/* Main cheque content */}
        <div className="cheque-content">
          <div className="cheque-header">
            <div className="account-holder">
              <h3 className="holder-name">{sendersName}</h3>
              <p className="address">765 Dolor sit Amet APT B5</p>
              <p className="address">Brooklyn, NY, 12345</p>
            </div>
            <div className="check-info">
              <div className="check-number">CHECK № {chequeId}</div>
              <div className="date-line">
                <span>DATE: </span>
                <span className="handwritten">{formattedDate}</span>
              </div>
            </div>
          </div>

          <div className="pay-section">
            <div className="pay-line">
              <span className="label">PAY TO:</span>
              <span className="payee handwritten">{recieverName}</span>
              <span className="amount-box">
                {currencySymbol(currency)}{" "}
                <span className="amount handwritten">{amountStr}</span>
              </span>
            </div>
            <div className="amount-words-line">
              <span className="amount-words handwritten">{amountWords}</span>
            </div>
          </div>

          <div className="bottom-section">
            <div className="bank-info">
              <p className="bank-label"> swiftCheque Digital Transfer</p>
              <p>Cheque Node</p>
              <p>Payment secured</p>
            </div>
            <div className="memo-signature">
              <div className="memo-line">
                <span className="label">MEMO</span>
                <span className="memo-text handwritten">{description}</span>
              </div>
              <div className="signature-section">
                <div className="signature handwritten">
                  {sendersName?.split(" ")[0]?.charAt(0)}.{" "}
                  {sendersName?.split(" ")[1] || "Sign"}
                </div>
                <div className="signature-label">AUTHORIZED SIGNATURE</div>
              </div>
            </div>
          </div>
        </div>

        {/* MICR line */}
        <div className="micr-line">⊔" {generateRandomMICR()} ⊔"</div>
      </div>
    </div>
  );
};

export default PaperCheque;

// ===== Utility Functions =====
const currencySymbol = (code) => {
  switch (code.toUpperCase()) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "NGN":
      return "₦";
    default:
      return code + " ";
  }
};

const numberToWords = (num) => {
  if (num === 0) return "Zero";

  const ones = [
    "", "One", "Two", "Three", "Four", "Five",
    "Six", "Seven", "Eight", "Nine", "Ten", "Eleven",
    "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen"
  ];
  
  const tens = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty",
    "Sixty", "Seventy", "Eighty", "Ninety"
  ];

  const thousands = ["", "Thousand", "Million", "Billion", "Trillion"];

  const toWords = (n) => {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    if (n < 1000)
      return (
        ones[Math.floor(n / 100)] +
        " Hundred" +
        (n % 100 ? " " + toWords(n % 100) : "")
      );
    return "";
  };

  let word = "";
  let i = 0;
  while (num > 0) {
    const chunk = num % 1000;
    if (chunk) {
      word =
        toWords(chunk) +
        (thousands[i] ? " " + thousands[i] : "") +
        (word ? " " + word : "");
    }
    num = Math.floor(num / 1000);
    i++;
  }

  return word.trim();
};

const generateRandomMICR = () => {
  const part1 = Math.floor(100000000 + Math.random() * 900000000);
  const part2 = Math.floor(1000000000 + Math.random() * 9000000000);
  const part3 = Math.floor(100000000000 + Math.random() * 900000000000);
  return `${part1} ⊔: ${part2}: ${part3}`;
};
