import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-sonner";
import { motion, AnimatePresence } from "framer-motion";

import "../styles/login.css";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [showResetPopup, setShowResetPopup] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast.error("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Logged in successfully.");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setResetLoading(true);
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Password reset email sent.");
      setShowResetPopup(false);
      setResetEmail("");
    } catch (err) {
      toast.error(err.message || "Failed to send reset email.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <>
      <div className="admin-login-interface">
        <h2 className="platform-logo-inword">
          <i className="fa-solid fa-money-check-dollar logo-logo-logo"></i> Echeque
        </h2>

        <div className="form">
          <i className="fa-solid fa-money-check-dollar logo-logo"></i>

          <div className="password-wrapper">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <i
              className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={toggleShowPassword}
            />
          </div>

          <p className="link-text" onClick={() => setShowResetPopup(true)}>
            Forgot password?
          </p>

          <button
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p onClick={() => navigate("/admin/signup")} className="link-text">
            Create account
          </p>
        </div>
      </div>

      {/* 🔒 Password Reset Popup */}
      <AnimatePresence>
        {showResetPopup && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="reset-modal"
              initial={{ y: "-50%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-50%", opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
            >
              <h3>Reset Password</h3>
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
              <div className="modal-buttons">
                <button
                  className="login-btn"
                  onClick={handlePasswordReset}
                  disabled={resetLoading}
                >
                  {resetLoading ? "Sending..." : "Send Reset Link"}
                </button>
                <button className="cancel-btn" onClick={() => setShowResetPopup(false)}>
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Login;
