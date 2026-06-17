import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginComp() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlesubmit = (e) => {
        e.preventDefault();
        
        const reqoptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        };

        fetch("http://localhost:3000/login", reqoptions)
            .then(resp => {
                if (resp.status === 200) {
                    setMessage("Login Successful!");
                    return resp.json();
                } else {
                    throw new Error("Invalid Username or Password");
                }
            })
            .then(data => {
                if (data && data.user) {
                    // Update Redux Store
                    dispatch(loginSuccess({ user: data.user, token: data.token }));

                    // Route user securely based on their numeric role
                    if (data.user.role === 1) navigate("/admin");
                    else if (data.user.role === 2) navigate("/user");
                    else if (data.user.role === 3) navigate("/officer");
                    else if (data.user.role === 4) navigate("/ngo");
                    else navigate("/");
                }
            })
            .catch(err => {
                setMessage(err.message || "Incorrect password or username");
                console.error("Authentication Error:", err);
            });
    };

    return (
        <div className="container mt-5" style={{ maxWidthed: "400px" }}>
            <div className="card shadow p-4">
                <h3 className="text-center mb-4">Login Form</h3>
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username:</label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={username} 
                            onChange={(e) => setusername(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input 
                            type="password" 
                            className="form-control"
                            value={password} 
                            onChange={(e) => setpassword(e.target.value)} 
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full w-100">Login</button>
                </form>

                {message && (
                    <div className={`alert mt-3 ${message.includes("Successful") ? "alert-success" : "alert-danger"}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}