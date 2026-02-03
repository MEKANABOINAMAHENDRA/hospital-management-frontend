import React, { useEffect, useState } from "react";
import { getMyBills } from "../../api/patientApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8080";

const MyBills = () => {
  const navigate = useNavigate();
  const [bills, setBills] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    try {
      const res = await getMyBills();
      setBills(res.data || []);
    } catch (err) {
      setError("Unable to load bills");
    }
  };

  const showInfo = (mode) => {
    alert(
      `${mode} payment is not supported online.\n\nPlease pay at hospital billing counter.`
    );
  };

  const payByCash = async (billId) => {
    if (!window.confirm("Confirm cash payment at hospital counter?")) return;

    try {
      await axios.patch(
        `${API_URL}/bill/${billId}/pay/CASH`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Payment recorded successfully");
      loadBills();
    } catch (err) {
      alert("Payment failed");
    }
  };

  return (
    <div style={pageStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h2>My Bills</h2>
        <button style={backBtn} onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {bills.length === 0 ? (
        <p>No bills found</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Bill ID</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Pay</th>
              <th style={thStyle}>Payment Mode</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((b) => (
              <tr key={b.billId}>
                <td style={tdStyle}>{b.billId}</td>

                {/* ✅ DATE FIX */}
                <td style={tdStyle}>
                  {b.billDate
                    ? new Date(b.billDate).toLocaleDateString()
                    : "-"}
                </td>

                <td style={tdStyle}>₹ {b.amount}</td>

                <td style={tdStyle}>
                  <span style={statusBadge(b.paymentStatus)}>
                    {b.paymentStatus}
                  </span>
                </td>

                <td style={tdStyle}>
                  {b.paymentStatus === "PENDING" ? (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button style={upiBtn} onClick={() => showInfo("UPI")}>
                        UPI
                      </button>
                      <button style={cardBtn} onClick={() => showInfo("CARD")}>
                        Card
                      </button>
                      <button
                        style={cashBtn}
                        onClick={() => payByCash(b.billId)}
                      >
                        Cash
                      </button>
                    </div>
                  ) : (
                    <span style={paidText}>—</span>
                  )}
                </td>

                <td style={tdStyle}>
                  {b.paymentMode ? b.paymentMode : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBills;

/* ================= STYLES ================= */

const pageStyle = {
  padding: "30px",
  background: "#f4f6f8",
  minHeight: "100vh",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const backBtn = {
  padding: "8px 14px",
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  background: "#fff",
  borderCollapse: "collapse",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const thStyle = {
  padding: "12px",
  background: "#1976d2",
  color: "#fff",
  textAlign: "left",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

const statusBadge = (status) => ({
  padding: "4px 12px",
  borderRadius: "12px",
  color: "#fff",
  fontWeight: "bold",
  background: status === "PAID" ? "#4caf50" : "#f44336",
});

const upiBtn = {
  padding: "6px 10px",
  background: "#673ab7",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const cardBtn = {
  padding: "6px 10px",
  background: "#009688",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const cashBtn = {
  padding: "6px 10px",
  background: "#ff9800",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const paidText = {
  color: "#4caf50",
  fontWeight: "bold",
};
