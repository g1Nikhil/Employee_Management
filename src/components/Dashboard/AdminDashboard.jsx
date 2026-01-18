import React, { useState, useContext, useEffect } from "react";
import Header from "../others/Header";
import CreateTask from "../others/CreateTask";
import TaskList from "../TaskList/TaskList";
import { AuthContext } from "../../context/AuthProvider";
import { Users, Mail, Briefcase } from "lucide-react";

const AdminDashboard = () => {
  const { userData } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Refresh function to be called from child components
  const handleRefresh = () => {
    const updatedEmployees =
      JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(updatedEmployees);
    setRefreshKey((prev) => prev + 1);
  };

  // Update employees on mount and when userData changes
  useEffect(() => {
    const updatedEmployees =
      JSON.parse(localStorage.getItem("employees")) ||
      userData?.employees ||
      [];
    setEmployees(updatedEmployees);
  }, [userData]);

  return (
    <div className="min-h-screen p-8">
      <Header />
      <CreateTask />

      {/* All Employees Section */}
      <div className="mt-12 mb-12">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
          <Users size={32} className="text-purple-400" />
          Team Members
        </h2>
        <p className="text-slate-400 mb-6">View all employees in the system</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/60 transition backdrop-blur-sm shadow-lg hover:shadow-purple-500/20"
            >
              {/* Employee Header */}
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-3">
                  <span className="text-white font-bold text-lg">
                    {employee.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-white text-lg font-bold">
                  {employee.name}
                </h3>
              </div>

              {/* Employee Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-purple-400" />
                  <span className="text-slate-300 break-all text-xs md:text-sm">
                    {employee.email}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Briefcase size={16} className="text-pink-400" />
                  <span className="text-slate-300">
                    {employee.tasks?.length || 0} Tasks
                  </span>
                </div>
              </div>

              {/* Task Stats */}
              <div className="bg-slate-700/30 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">New:</span>
                  <span className="text-cyan-400 font-semibold">
                    {employee.tasks?.filter((t) => t.newTask).length || 0}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Active:</span>
                  <span className="text-green-400 font-semibold">
                    {employee.tasks?.filter((t) => t.active && !t.completed)
                      .length || 0}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Completed:</span>
                  <span className="text-emerald-400 font-semibold">
                    {employee.tasks?.filter((t) => t.completed).length || 0}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Failed:</span>
                  <span className="text-red-400 font-semibold">
                    {employee.tasks?.filter((t) => t.failed).length || 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {employees.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No employees found</p>
          </div>
        )}
      </div>

      {/* Task Management */}
      <div className="mt-12">
        <TaskList onTaskChange={handleRefresh} />
      </div>
    </div>
  );
};

export default AdminDashboard;
