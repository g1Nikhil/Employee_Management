import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { CheckCircle, Clock, X } from "lucide-react";

const NewTask = ({ onTaskChange }) => {
  const { userData } = useContext(AuthContext);
  const [refreshKey, setRefreshKey] = useState(0);

  // Get current logged-in user
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

  // If employee, show only their tasks. If admin, show all employees' tasks
  let newTasks = [];

  if (loggedInUser?.role === "employee") {
    // Show only current employee's new tasks
    newTasks =
      loggedInUser.tasks
        ?.filter((task) => task.newTask)
        .map((task) => ({
          ...task,
          employeeId: loggedInUser.id,
          employeeName: loggedInUser.name,
        })) || [];
  } else {
    // Show all employees' new tasks (for admin)
    newTasks =
      userData?.employees?.flatMap((emp) =>
        emp.tasks
          .filter((task) => task.newTask)
          .map((task) => ({
            ...task,
            employeeId: emp.id,
            employeeName: emp.name,
          })),
      ) || [];
  }

  const handleAcceptTask = (employeeId, taskTitle) => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const employeeIndex = employees.findIndex((emp) => emp.id === employeeId);

    if (employeeIndex !== -1) {
      const taskIndex = employees[employeeIndex].tasks.findIndex(
        (task) => task.title === taskTitle,
      );

      if (taskIndex !== -1) {
        // Update task status
        employees[employeeIndex].tasks[taskIndex].newTask = false;
        employees[employeeIndex].tasks[taskIndex].active = true;

        // Save to localStorage
        localStorage.setItem("employees", JSON.stringify(employees));

        // Update logged-in user if they're the one accepting
        if (
          loggedInUser?.role === "employee" &&
          loggedInUser.id === employeeId
        ) {
          loggedInUser.tasks[taskIndex].newTask = false;
          loggedInUser.tasks[taskIndex].active = true;
          localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        }

        // Refresh component and notify parent
        setRefreshKey((prev) => prev + 1);
        if (onTaskChange) onTaskChange();
      }
    }
  };

  const handleRejectTask = (employeeId, taskTitle) => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const employeeIndex = employees.findIndex((emp) => emp.id === employeeId);

    if (employeeIndex !== -1) {
      const taskIndex = employees[employeeIndex].tasks.findIndex(
        (task) => task.title === taskTitle,
      );

      if (taskIndex !== -1) {
        // Update task status
        employees[employeeIndex].tasks[taskIndex].newTask = false;
        employees[employeeIndex].tasks[taskIndex].failed = true;

        // Save to localStorage
        localStorage.setItem("employees", JSON.stringify(employees));

        // Update logged-in user if they're the one rejecting
        if (
          loggedInUser?.role === "employee" &&
          loggedInUser.id === employeeId
        ) {
          loggedInUser.tasks[taskIndex].newTask = false;
          loggedInUser.tasks[taskIndex].failed = true;
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
        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
          <Clock size={40} className="text-cyan-400" />
          New Tasks
        </h2>
        <p className="text-slate-400 text-lg">
          {loggedInUser?.role === "employee"
            ? "Your new tasks"
            : "All new tasks"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newTasks.length > 0 ? (
          newTasks.map((task, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/60 transition backdrop-blur-sm shadow-lg"
            >
              {/* Header */}
              <div className="mb-4">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-lg text-xs font-bold">
                    NEW
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
                  <span className="bg-slate-700/50 text-cyan-300 px-3 py-1 rounded-lg text-xs font-semibold">
                    {task.category}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Assigned to:</span>
                  <span className="text-cyan-300 font-semibold">
                    {task.employeeName}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleAcceptTask(task.employeeId, task.title)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/50"
                >
                  <CheckCircle size={18} />
                  Accept
                </button>
                <button
                  onClick={() => handleRejectTask(task.employeeId, task.title)}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-red-500/50"
                >
                  <X size={18} />
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-400 text-lg">No new tasks available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewTask;
