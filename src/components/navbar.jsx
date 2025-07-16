import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/admin-nav.css";

const menuItems = [
  { label: "Dashboard", icon: "fa-solid fa-gauge" },
  { label: "Cheques", icon: "fa-solid fa-money-check" },
  { label: "Transactions", icon: "fa-solid fa-right-left" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  const handleNav = (label) => {
    setIsOpen(false);
    if (label === "Logout") {
      // add logout logic here
      navigate("/admin/login");
    } else {
      navigate(`/admin/${label.toLowerCase()}`);
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-header">
        <h3>Echeque</h3>
        <i
          className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"} hamburger`}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Desktop Sidebar */}
      <div className="navbar-interface-admin">
        <h3 className="brand-name">Echeque</h3>

        <div className="nav-group">
          {menuItems.map(({ label, icon }) => (
            <div
              key={label}
              className={`nav-item ${
                currentPath.includes(label.toLowerCase()) ? "active" : ""
              }`}
              onClick={() => handleNav(label)}
            >
              <i className={icon}></i>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="logout-btn" onClick={() => handleNav("Logout")}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span>Logout</span>
        </div>
      </div>

      {/* Mobile Slide-in Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="nav-group">
              {menuItems.map(({ label, icon }) => (
                <div
                  key={label}
                  className="nav-item"
                  onClick={() => handleNav(label)}
                >
                  <i className={icon}></i>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="logout-btn" onClick={() => handleNav("Logout")}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span>Logout</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
