import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  // const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault()
    console.log("email is ",email)
    console.log("password is",password)
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-md">
        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Login to your account</p>
        </div>

        {/* Login Form Container */}
        <div className="border border-blue-500 rounded-lg p-8 bg-gray-900">
          {/* Form Heading */}
          <h2 className="text-2xl font-bold text-white mb-8">Log In</h2>

          {/* Form */}
          <form
            className="space-y-6"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            {/* Email Input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Mail size={20} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
                className="w-full bg-transparent border border-red-500 rounded-full pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Lock size={20} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                className="w-full bg-transparent border border-red-500 rounded-full pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition"
              />
              <button
                type="button"
                // onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition"
              >
                {/* {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} */}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-400 hover:text-gray-300 cursor-pointer transition">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-transparent border border-gray-500 rounded cursor-pointer accent-red-500"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <a
                href="#"
                className="text-red-500 hover:text-red-400 transition font-medium"
              >
                Forgot Password
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-full transition duration-200 transform hover:scale-105"
            >
              Log In
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-red-500 hover:text-red-400 transition font-medium"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
