import Styles from "../styles/home.module.css";

const Footer = () => {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.footerContent}>
        <div className={Styles.footerSection}>
          <h3>Legal & Compliance</h3>
          <p>
            swiftChq Inc. is a third-party digital payment facilitator 
          </p>
        </div>

        <div className={Styles.footerSection}>
          <h3>Risk Disclosure</h3>
          <p>
            All digital cheque transactions carry inherent financial and
            identity risks. swiftChq Inc. disclaims liability for fraudulent
            cheques, user impersonation, or loss of funds resulting from
            third-party interactions. Verification of payee identity remains the
            responsibility of the recipient.
          </p>
          <p>
            Digital cheques are not legal tender and do not represent bank
            drafts unless cleared through a licensed partner bank.
          </p>
        </div>

        <div className={Styles.footerSection}>
          <h3>Regulatory Notice</h3>
          <p>
            swiftChq Inc. operates in accordance with the regulatory frameworks
            of its host jurisdictions. Where applicable, user activities are
            subject to financial oversight under virtual asset service provider
            (VASP) laws and anti-fraud enforcement bodies.
          </p>
          <p>
            Our systems include fraud detection, transaction monitoring, and
            audit trails in line with data protection and financial integrity
            standards.
          </p>
        </div>

        <div className={Styles.footerSection}>
          <h3>Contact & Complaints</h3>
          <p>
            For legal inquiries, compliance reports, or user complaints, please
            reach out to our compliance team via our official email address{" "}
            <a style={{color: "white"}} href="mailto:support@swiftcheque.cc">
              support@swiftcheque.cc
            </a>.
          </p>
          <p>
            We are committed to fair resolution practices and cooperate fully
            with financial regulators and law enforcement agencies.
          </p>
        </div>
      </div>

      <div className={Styles.footerBottom}>
        <p>
          © {new Date().getFullYear()} swiftChq Inc. — All rights reserved. |
          Powered by innovation, governed by compliance.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
