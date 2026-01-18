import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = ({ handleLogin }) => {
  // const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-md">
        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-300 text-lg">Login to your account</p>
        </div>

        {/* Login Form Container */}
        <div className="border border-cyan-500/30 rounded-2xl p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm shadow-2xl">
          {/* Form Heading */}
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-8">
            Log In
          </h2>

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
                className="w-full bg-slate-700/30 border border-cyan-400/50 rounded-full pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition"
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
                className="w-full bg-slate-700/30 border border-cyan-400/50 rounded-full pl-12 pr-12 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition"
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
              <label className="flex items-center text-slate-300 hover:text-cyan-300 cursor-pointer transition">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-transparent border border-cyan-400/50 rounded cursor-pointer accent-cyan-400"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <a
                href="#"
                className="text-cyan-400 hover:text-cyan-300 transition font-medium"
              >
                Forgot Password
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 rounded-full transition duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/50"
            >
              Log In
            </button>
          </form>

          {/* Credentials Helper */}
          <div className="mt-8 pt-6 border-t border-cyan-500/20">
            <p className="text-xs text-slate-400 font-semibold mb-3">
              📝 Demo Credentials:
            </p>
            <div className="space-y-2 text-xs">
              <div className="bg-blue-900/30 border border-blue-500/30 rounded p-3">
                <p className="text-blue-300 font-mono">
                  <span className="text-cyan-300">Admin:</span>{" "}
                  admin@example.com
                </p>
                <p className="text-blue-300 font-mono">
                  <span className="text-cyan-300">Password:</span> 123
                </p>
              </div>
              <div className="bg-green-900/30 border border-green-500/30 rounded p-3">
                <p className="text-green-300 font-mono">
                  <span className="text-cyan-300">Employee:</span>{" "}
                  rahul.sharma@example.com
                </p>
                <p className="text-green-300 font-mono">
                  <span className="text-cyan-300">Password:</span> 123
                </p>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-slate-300 text-sm">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-cyan-400 hover:text-cyan-300 transition font-medium"
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
