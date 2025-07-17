import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-sonner";
import "../styles/login.css";

import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSignup = async () => {
    const { fullName, username, email, password } = formData;

    if (!fullName || !username || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName,
        username,
        email,
        createdAt: new Date(),
      });

      toast.success("Account created successfully.");
      navigate("/admin/login");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-interface">
      <h2 className="platform-logo-inword">
        <i className="fa-solid fa-money-check-dollar logo-logo-logo"></i> swiftCheque
      </h2>

      <div className="form">
        <i className="fa-solid fa-money-check-dollar logo-logo"></i>

        <div className="password-wrapper">
          <input
            type="text"
            placeholder="Full name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
        </div>

        <div className="password-wrapper">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>

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

        <button
          className="login-btn"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>

        <p className="link-text" onClick={() => navigate("/admin/login")}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
};

export default Signup;
