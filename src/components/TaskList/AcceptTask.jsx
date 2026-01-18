import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { CheckCheck, Clock, X } from "lucide-react";

const AcceptTask = ({ onTaskChange }) => {
  const { userData } = useContext(AuthContext);
  const [refreshKey, setRefreshKey] = useState(0);

  // Get current logged-in user
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

  // If employee, show only their tasks. If admin, show all employees' tasks
  let activeTasks = [];

  if (loggedInUser?.role === "employee") {
    // Show only current employee's active tasks
    activeTasks =
      loggedInUser.tasks
        ?.filter((task) => task.active && !task.completed)
        .map((task) => ({
          ...task,
          employeeId: loggedInUser.id,
          employeeName: loggedInUser.name,
        })) || [];
  } else {
    // Show all employees' active tasks (for admin)
    activeTasks =
      userData?.employees?.flatMap((emp) =>
        emp.tasks
          .filter((task) => task.active && !task.completed)
          .map((task) => ({
            ...task,
            employeeId: emp.id,
            employeeName: emp.name,
          })),
      ) || [];
  }

  const handleMarkCompleted = (employeeId, taskTitle) => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const employeeIndex = employees.findIndex((emp) => emp.id === employeeId);

    if (employeeIndex !== -1) {
      const taskIndex = employees[employeeIndex].tasks.findIndex(
        (task) => task.title === taskTitle,
      );

      if (taskIndex !== -1) {
        // Update task status
        employees[employeeIndex].tasks[taskIndex].active = false;
        employees[employeeIndex].tasks[taskIndex].completed = true;

        // Save to localStorage
        localStorage.setItem("employees", JSON.stringify(employees));

        // Update logged-in user if they're the one completing
        if (
          loggedInUser?.role === "employee" &&
          loggedInUser.id === employeeId
        ) {
          loggedInUser.tasks[taskIndex].active = false;
          loggedInUser.tasks[taskIndex].completed = true;
          localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        }

        // Refresh component and notify parent
        setRefreshKey((prev) => prev + 1);
        if (onTaskChange) onTaskChange();
      }
    }
  };

  const handleReject = (employeeId, taskTitle) => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const employeeIndex = employees.findIndex((emp) => emp.id === employeeId);

    if (employeeIndex !== -1) {
      const taskIndex = employees[employeeIndex].tasks.findIndex(
        (task) => task.title === taskTitle,
      );

      if (taskIndex !== -1) {
        // Update task status
        employees[employeeIndex].tasks[taskIndex].active = false;
        employees[employeeIndex].tasks[taskIndex].failed = true;

        // Save to localStorage
        localStorage.setItem("employees", JSON.stringify(employees));

        // Update logged-in user if they're the one rejecting
        if (
          loggedInUser?.role === "employee" &&
          loggedInUser.id === employeeId
        ) {
          loggedInUser.tasks[taskIndex].active = false;
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
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
          <Clock size={40} className="text-green-400" />
          Active Tasks
        </h2>
        <p className="text-slate-400 text-lg">
          {loggedInUser?.role === "employee"
            ? "Your tasks in progress"
            : "All active tasks"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTasks.length > 0 ? (
          activeTasks.map((task, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 border border-green-500/30 rounded-xl p-6 hover:border-green-400/60 transition backdrop-blur-sm shadow-lg"
            >
              {/* Header */}
              <div className="mb-4">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-1 rounded-lg text-xs font-bold">
                    ACTIVE
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
                  <span className="bg-slate-700/50 text-green-300 px-3 py-1 rounded-lg text-xs font-semibold">
                    {task.category}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Assigned to:</span>
                  <span className="text-green-300 font-semibold">
                    {task.employeeName}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    handleMarkCompleted(task.employeeId, task.title)
                  }
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-500/50"
                >
                  <CheckCheck size={18} />
                  Complete
                </button>
                <button
                  onClick={() => handleReject(task.employeeId, task.title)}
                  className="flex-1 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-slate-200 font-bold py-2 px-4 rounded-lg transition duration-300 border border-slate-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-400 text-lg">No active tasks</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcceptTask;
