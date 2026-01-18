import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { AuthContext } from "./context/AuthProvider";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setloggedInUserData] = useState(null);
  const authData = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData);
      setloggedInUserData(userData);
    }
  }, []);

  const handleLogin = (email, password) => {
    // Check if it's admin login
    if (email === "admin@example.com" && password === "123") {
      const adminData = { role: "admin", email };
      setUser(adminData);
      setloggedInUserData(adminData);
      localStorage.setItem("loggedInUser", JSON.stringify(adminData));
      console.log("Admin logged in successfully");
      return;
    }

    // Check if it's employee login
    if (authData && authData.employees) {
      const employee = authData.employees.find(
        (e) => email === e.email && password === e.password,
      );

      if (employee) {
        const employeeData = { role: "employee", ...employee };
        setUser(employeeData);
        setloggedInUserData(employeeData);
        localStorage.setItem("loggedInUser", JSON.stringify(employeeData));
        console.log("Employee logged in successfully:", employee.name);
        return;
      }
    }

    // If credentials don't match
    alert(
      "❌ Invalid Email or Password!\n\nTry:\nAdmin: admin@example.com / 123\nEmployee: rahul.sharma@example.com / 123",
    );
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {!user ? <Login handleLogin={handleLogin} /> : ""}
      {user &&
        (user?.role == "admin" ? <AdminDashboard /> : <EmployeeDashboard />)}
    </div>
  );
};

export default App;
