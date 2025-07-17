import Styles from "../styles/home.module.css";

const Partners = () => {
  const partners = [
    { name: "Chase Bank", years: "+5 years Partnership", icon: "fa-building-columns" },
    { name: "Bank of America", years: "+3 years Partnership", icon: "fa-university" },
    { name: "Wells Fargo", years: "+4 years Partnership", icon: "fa-vault" },
    { name: "Revolut", years: "+2 years Partnership", icon: "fa-mobile-screen-button" },
    { name: "Capital One", years: "+6 years Partnership", icon: "fa-landmark" },
    { name: "American Express", years: "+5 years Partnership", icon: "fa-cc-amex" },
    { name: "CitiBank", years: "+3 years Partnership", icon: "fa-city" },
    { name: "Ally Bank", years: "+2 years Partnership", icon: "fa-piggy-bank" },
    { name: "SoFi", years: "+4 years Partnership", icon: "fa-wallet" },
    { name: "Square", years: "+6 years Partnership", icon: "fa-square" },
    { name: "Venmo", years: "+3 years Partnership", icon: "fa-cc-visa" },
    { name: "Plaid", years: "+1 year Partnership", icon: "fa-code-branch" },
  ];

  return (
    <section className={Styles.partnersSection}>
      <h2 className={Styles.sectionTitle}>Our Trusted Partners</h2>
      <div className={Styles.partnersContainer}>
        {partners.map((partner, idx) => (
          <div className={Styles.partnerCard} key={idx}>
            <i className={`fa-solid ${partner.icon} ${Styles.partnerIcon}`}></i>
            <p className={Styles.partnerName}>{partner.name}</p>
            <p className={Styles.partnerYears}>{partner.years}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partners;
