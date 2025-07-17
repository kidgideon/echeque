import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-sonner";
import Login from "./admin/login";
import Signup from "./admin/signup";
import Dashboard from "./admin/dashboard";
import Cheques from "./admin/cheques";
import Transactions from "./admin/transactions";
import ManageCheque from "./admin/manage";
import EchequeInterface from "./pages/echeque";
import CashCheque from "./pages/cash";
import Home from "./pages/home";
import ProtectedRoute from "../config/protector";

const App = () => {
  return (
    <Router>
      <Toaster richColors position="top-right" expand={true} />

      <Routes>
        {/* Unprotected */}
        <Route path="/" element={<Home />} />
        <Route path="admin/login" element={<Login />} />
        <Route path="admin/signup" element={<Signup />} />
        <Route path="echeque/:chequeId" element={<EchequeInterface />} />
        <Route path="cash-cheque/:chequeId" element={<CashCheque />} />

        {/* Protected */}
        <Route
          path="admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/cheques"
          element={
            <ProtectedRoute>
              <Cheques />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/manage-cheque/:chequeId"
          element={
            <ProtectedRoute>
              <ManageCheque />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
