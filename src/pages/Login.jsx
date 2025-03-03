import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const { signInUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [token, setToken] = useState("");
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const location = useLocation(); // Added to fix missing location

    const handleLogin = async () => {
        try {
            const userCredential = await signInUser(email, password);
            console.log(userCredential.user);

            // Send request to backend for OTP
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { email, password });

            if (res.data?.success) {
                setStep(2);
                toast.success("OTP sent to your email");
            } else {
                toast.error(res.data?.error || "Login failed");
            }
        } catch (error) {
            toast.error(error.response?.data?.error || "Login error");
        }
    };

    const verifyOTP = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/verify-email`, { email, otp });

            if (res.data?.success) {
                setStep(3);
                toast.success("OTP verified. Now enter your 2FA code.");
            } else {
                toast.error(res.data?.error || "Invalid OTP");
            }
        } catch (error) {
            toast.error(error.response?.data?.error || "OTP verification failed");
        }
    };

    const verify2FA = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/verify-2fa`, { email, token });
            console.log(res);

            if (res.data?.token) {
                localStorage.setItem("authToken", res.data.token);
                toast.success("Login successful!");
                navigate(location?.state || "/settings");
            } else {
                toast.error(res.data?.error || "2FA verification failed");
            }
        } catch (error) {
            toast.error(error.response?.data?.error || "2FA verification error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-6 bg-white shadow-md rounded">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

                {step === 1 && (
                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        <button
                            onClick={handleLogin}
                            className="w-full bg-blue-500 text-white py-2 rounded"
                        >
                            Login
                        </button>
                        <p>Don't Have Account? <Link to='/register' className="text-blue-400"> Register</Link></p>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        <button
                            onClick={verifyOTP}
                            className="w-full bg-green-500 text-white py-2 rounded"
                        >
                            Verify OTP
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Enter 2FA Code"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        <button
                            onClick={verify2FA}
                            className="w-full bg-purple-500 text-white py-2 rounded"
                        >
                            Verify 2FA
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
