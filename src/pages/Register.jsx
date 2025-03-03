import React, { useState} from 'react';
import { useForm } from 'react-hook-form';
import {NavLink} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import axios from 'axios';

const Register = () => {
    const {createUser,updateUserProfile} = useAuth()
    // const navigate = useNavigate()
    
    const [regError, setRegError] = useState('')
    const [successReg, setSuccessReg] = useState('')
    // const [showPassword, setShowPassword] = useState(false)
    const [qrCode, setQrCode] = useState('')
    
    const { register,handleSubmit,formState: { errors },} = useForm()
    const onSubmit = async (data) => {
        const { email, password, image, fullName } = data;

        // Validation checks
        if (!/@gmail\.com$/.test(email)) return toast.error('Provide a valid Gmail address');
        if (password.length < 6) return toast.error('Password must be at least 6 characters');

        try {
            // Step 1: Register user with Firebase (or your auth system)
            await createUser(email, password);
            await updateUserProfile(fullName, image);
            toast.success('Registration successful!');

            // Step 2: Request Google Authenticator QR Code
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/register`, { email, password, fullName, image });
            console.log(res.data);
            if (res.data.qrCodeUrl) {
                setQrCode(res.data.qrCodeUrl);
                toast.success('Scan the QR code in Google Authenticator');
            }

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || 'Registration failed');
        }
    };
    return (
        <div>
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
    <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold">
                    Register
                </h1>
                <div className="w-full flex-1 mt-8">

                    <div className="mx-auto max-w-xs">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <input
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="text" placeholder="Full Name" {...register("fullName", { required: true })}/>
                            {errors.fullName && <span className="text-red-400">This field is required</span>}
                        <input
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="email" placeholder="Email" {...register("email", { required: true })}/>
                            {errors.email && <span className="text-red-400">This field is required</span>}
                        <input
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="text" placeholder="Image URL" {...register("image", { required: true })}/>
                            {errors.image && <span className="text-red-400">This field is required</span>}
                        <input
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                            type="password" placeholder="Password" {...register("password", { required: true })}  />
                {errors.password && <span className="text-red-400">This field is required</span>}
                        <button
                            className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span className="ml-3">
                                Register
                            </span>
                        </button>
                        <p className="text-sm text-center sm:px-6 ">Already have an account?
            <NavLink to='/login' rel="noopener noreferrer" href="#" className="underline text-blue-600"> Login</NavLink>
        </p>
                        {qrCode && (
                                    <div className="mt-4 text-center">
                                        <p className="text-green-600">Scan this QR Code in Google Authenticator:</p>
                                        <img src={qrCode} alt="Google Authenticator QR Code" className="w-40 mx-auto mt-2" />
                                    </div>
                                )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
      
        <div className="flex-1 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                style={{backgroundImage: "url(https://www.marketinghealthinc.com/assets/images/login.gif)"}}>
            </div>
        </div>
    </div>
</div>
     </div>
    );
};

export default Register;