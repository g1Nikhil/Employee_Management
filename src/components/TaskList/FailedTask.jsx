import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { AlertCircle, RotateCcw, Trash2 } from "lucide-react";

const FailedTask = ({ onTaskChange }) => {
  const { userData } = useContext(AuthContext);
  const [refreshKey, setRefreshKey] = useState(0);

  // Get current logged-in user
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

  // If employee, show only their tasks. If admin, show all employees' tasks
  let failedTasks = [];

  if (loggedInUser?.role === "employee") {
    // Show only current employee's failed tasks
    failedTasks =
      loggedInUser.tasks
        ?.filter((task) => task.failed)
        .map((task) => ({
          ...task,
          employeeId: loggedInUser.id,
          employeeName: loggedInUser.name,
        })) || [];
  } else {
    // Show all employees' failed tasks (for admin)
    failedTasks =
      userData?.employees?.flatMap((emp) =>
        emp.tasks
          .filter((task) => task.failed)
          .map((task) => ({
            ...task,
            employeeId: emp.id,
            employeeName: emp.name,
          })),
      ) || [];
  }

  const handleRetry = (employeeId, taskTitle) => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const employeeIndex = employees.findIndex((emp) => emp.id === employeeId);

    if (employeeIndex !== -1) {
      const taskIndex = employees[employeeIndex].tasks.findIndex(
        (task) => task.title === taskTitle,
      );

      if (taskIndex !== -1) {
        // Update task status - reset to new task
        employees[employeeIndex].tasks[taskIndex].failed = false;
        employees[employeeIndex].tasks[taskIndex].newTask = true;
        employees[employeeIndex].tasks[taskIndex].active = false;
        employees[employeeIndex].tasks[taskIndex].completed = false;

        // Save to localStorage
        localStorage.setItem("employees", JSON.stringify(employees));

        // Update logged-in user if they're retrying
        if (
          loggedInUser?.role === "employee" &&
          loggedInUser.id === employeeId
        ) {
          loggedInUser.tasks[taskIndex].failed = false;
          loggedInUser.tasks[taskIndex].newTask = true;
          loggedInUser.tasks[taskIndex].active = false;
          loggedInUser.tasks[taskIndex].completed = false;
          localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        }

        // Refresh component and notify parent
        setRefreshKey((prev) => prev + 1);
        if (onTaskChange) onTaskChange();
      }
    }
  };

  const handleRemove = (employeeId, taskTitle) => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const employeeIndex = employees.findIndex((emp) => emp.id === employeeId);

    if (employeeIndex !== -1) {
      const taskIndex = employees[employeeIndex].tasks.findIndex(
        (task) => task.title === taskTitle,
      );

      if (taskIndex !== -1) {
        // Remove task from array
        employees[employeeIndex].tasks.splice(taskIndex, 1);

        // Save to localStorage
        localStorage.setItem("employees", JSON.stringify(employees));

        // Update logged-in user if they're removing
        if (
          loggedInUser?.role === "employee" &&
          loggedInUser.id === employeeId
        ) {
          loggedInUser.tasks.splice(taskIndex, 1);
          localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        }

        // Refresh component and notify parent
        setRefreshKey((prev) => prev + 1);
        if (onTaskChange) onTaskChange();
      }
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
          <AlertCircle size={40} className="text-red-400" />
          Failed Tasks
        </h2>
        <p className="text-slate-400 text-lg">
          {loggedInUser?.role === "employee"
            ? "Your failed tasks"
            : "All failed tasks"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {failedTasks.length > 0 ? (
          failedTasks.map((task, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-red-900/30 to-slate-900/70 border border-red-500/40 rounded-xl p-6 hover:border-red-400/60 transition backdrop-blur-sm shadow-lg"
            >
              {/* Header */}
              <div className="mb-4">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                    <AlertCircle size={14} />
                    FAILED
                  </span>
                  <span className="text-slate-400 text-xs font-semibold">
                    {task.date}
                  </span>
                </div>
                <h3 className="text-white text-xl font-bold mb-2">
                  {task.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                {task.description}
              </p>

              {/* Meta Info */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Category:</span>
                  <span className="bg-slate-700/50 text-red-300 px-3 py-1 rounded-lg text-xs font-semibold">
                    {task.category}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Employee:</span>
                  <span className="text-red-300 font-semibold">
                    {task.employeeName}
                  </span>
                </div>
              </div>

              {/* Warning Badge */}
              <div className="bg-gradient-to-r from-red-600/30 to-orange-600/30 border border-red-500/50 rounded-lg p-3 mb-4 text-center">
                <p className="text-red-300 text-sm font-semibold">
                  ⚠ Task Failed - Action Required
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleRetry(task.employeeId, task.title)}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/50"
                >
                  <RotateCcw size={18} />
                  Retry
                </button>
                <button
                  onClick={() => handleRemove(task.employeeId, task.title)}
                  className="flex-1 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-slate-200 font-bold py-2 px-4 rounded-lg transition duration-300 border border-slate-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <AlertCircle
              size={48}
              className="text-red-500 mx-auto mb-4 opacity-50"
            />
            <p className="text-slate-400 text-lg">
              No failed tasks - Great job!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FailedTask;
