import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Basic Password Match Validation
    if (password !== confirmPassword) {
      setIsSuccess(false);
      setMessage("Passwords do not match!");
      return;
    }

    setMessage("Creating citizen account...");
    setIsSuccess(true);

    /* PRESENTATION MODE: Simulating database storage.
       Automatically defaulting role to 2 (Citizen).
    */
    setTimeout(() => {
      setMessage("Registration Successful! Redirecting to login...");
      
      const dummyUser = { username, email, role: 2 }; // Locked to Citizen role
      localStorage.setItem("registeredUser", JSON.stringify(dummyUser));

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }, 1000);

    /* POST-PRESENTATION: Backend API integration
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, role: 2 })
    };
    fetch("http://localhost:3000/register", reqOptions)
      .then(resp => {
        if (resp.ok) {
          setIsSuccess(true);
          setMessage("Registration Successful!");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          throw new Error("Registration failed.");
        }
      })
      .catch(err => {
        setIsSuccess(false);
        setMessage(err.message);
      });
    */
  };

  return (
    <div className="container p-1">
      <div className="text-center mb-4">
        <h3 className="fw-bold text-dark m-0">Citizen Registration</h3>
        <p className="text-muted small">Create an account to report regional grievances</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="mb-3">
          <label className="form-label small fw-bold">Username:</label>
          <input 
            type="text" 
            className="form-control"
            placeholder="Enter username"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </div>

        {/* Email Address */}
        <div className="mb-3">
          <label className="form-label small fw-bold">Email Address:</label>
          <input 
            type="email" 
            className="form-control"
            placeholder="name@example.com"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label small fw-bold">Password:</label>
          <input 
            type="password" 
            className="form-control"
            placeholder="Create password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label className="form-label small fw-bold">Confirm Password:</label>
          <input 
            type="password" 
            className="form-control"
            placeholder="Repeat password"
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success w-100 fw-bold mt-2">
          Register Account
        </button>

        {/* Redirect Link */}
        <div className="text-center mt-3">
          <span className="small text-muted">Already have an account? </span>
          <Link to="/login" className="small text-success fw-bold text-decoration-none">
            Login here
          </Link>
        </div>

        <hr className="text-muted my-3" />

        {/* Business Logic Disclaimer for Faculty */}
        <div className="p-2 bg-light border rounded text-center">
          <p className="text-muted mb-0" style={{ fontSize: '11px', lineHeight: '1.4' }}>
            <strong>Notice:</strong> Only public citizens can register online. Official staff, department officers, and NGO accounts must be generated and authorized internally by the System Administrator.
          </p>
        </div>
      </form>

      {/* Feedback Alert status */}
      {message && (
        <div className={`alert mt-3 small py-2 text-center ${isSuccess ? "alert-success" : "alert-danger"}`}>
          {message}
        </div>
      )}
    </div>
  );
}