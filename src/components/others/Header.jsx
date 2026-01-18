import React from "react";
import { LogOut } from "lucide-react";

const Header = () => {
  const handleLogout = () => {
    // Step 1: Clear the logged-in user data from localStorage
    localStorage.removeItem("loggedInUser");

    // Step 2: Navigate back to the login page using window.location
    window.location.href = "/";

  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Hello,
          <br />
          <span className="text-5xl">Nikhil 👋</span>
        </h1>
      </div>
      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-cyan-500/50 transition hover:scale-105 flex items-center gap-2"
      >
        <LogOut size={20} />
        Log Out
      </button>
    </div>
  );
};

export default Header;
