import Styles from "../styles/home.module.css";

const Footer = () => {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.footerContent}>
        <div className={Styles.footerSection}>
          <h3>Legal & Compliance</h3>
          <p>
            swiftChq Inc. is a third-party digital payment facilitator and is
            not a bank. All funds are processed through trusted licensed partners. 
            Use of our platform is subject to compliance with all local, state, and federal laws.
          </p>
          <p>
            By using this service, you agree to our <a href="#">Terms of Service</a>, 
            <a href="#"> Privacy Policy</a>, and <a href="#">AML Policy</a>.
          </p>
        </div>

        <div className={Styles.footerSection}>
          <h3>Risk Disclosure</h3>
          <p>
            All cheque-based payments carry inherent risks. swiftChq Inc. does not
            guarantee the legitimacy of third-party payers. Users are advised to
            conduct due diligence before accepting any digital cheque.
          </p>
        </div>

        <div className={Styles.footerSection}>
          <h3>Contact & Regulatory</h3>
          <p>
            For complaints or inquiries, contact us at <a href="mailto:compliance@echeque.com">compliance@echeque.com</a>.
          </p>
          <p>
            Registered as a virtual financial service provider under applicable regulatory jurisdictions.
          </p>
        </div>
      </div>

      <div className={Styles.footerBottom}>
        <p>© {new Date().getFullYear()} swiftChq Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
