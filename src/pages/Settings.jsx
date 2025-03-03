import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Settings = () => {
    const {user, loading} = useAuth()
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/auth/status`, { withCredentials: true })
            .then(response => {
                if (response.data.success) {
                    setIsConnected(true);
                }
            })
            .catch(error => console.error("Error checking auth status:", error));
    }, []);

    const connectGoogle = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    };

    if(!user) return <p>loading...</p>

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <button
                onClick={connectGoogle}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                {isConnected ? "Google Account Connected" : "Connect Google Account"}
            </button>
            <br /> 
            <br />
            {
                isConnected === true && <Link to='/dashboard' className="flex items-center text-indigo-700 border border-indigo-600 py-2 px-6 gap-2 rounded inline-flex items-center">
                <span>
                   Go To Todo's
                </span>
                <svg className=" w-6 h-6 ml-2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
            </Link>
            }
        </div>
    );
};

export default Settings;
