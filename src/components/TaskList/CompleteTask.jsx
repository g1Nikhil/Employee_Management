import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { CheckCircle2, Trophy } from "lucide-react";

const CompleteTask = ({ onTaskChange }) => {
  const { userData } = useContext(AuthContext);
  const [refreshKey, setRefreshKey] = useState(0);

  // Get current logged-in user
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

  // If employee, show only their tasks. If admin, show all employees' tasks
  let completedTasks = [];

  if (loggedInUser?.role === "employee") {
    // Show only current employee's completed tasks
    completedTasks =
      loggedInUser.tasks
        ?.filter((task) => task.completed)
        .map((task) => ({
          ...task,
          employeeId: loggedInUser.id,
          employeeName: loggedInUser.name,
        })) || [];
  } else {
    // Show all employees' completed tasks (for admin)
    completedTasks =
      userData?.employees?.flatMap((emp) =>
        emp.tasks
          .filter((task) => task.completed)
          .map((task) => ({
            ...task,
            employeeId: emp.id,
            employeeName: emp.name,
          })),
      ) || [];
  }

  const handleViewDetails = (taskTitle) => {
    console.log(`Viewing details for completed task: "${taskTitle}"`);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
          <Trophy size={40} className="text-emerald-400" />
          Completed Tasks
        </h2>
        <p className="text-slate-400 text-lg">
          {loggedInUser?.role === "employee"
            ? "Your completed tasks"
            : "All completed tasks"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedTasks.length > 0 ? (
          completedTasks.map((task, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-emerald-900/30 to-slate-900/70 border border-emerald-500/40 rounded-xl p-6 hover:border-emerald-400/60 transition backdrop-blur-sm shadow-lg hover:shadow-emerald-500/30"
            >
              {/* Header */}
              <div className="mb-4">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 size={14} />
                    COMPLETED
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
                  <span className="bg-slate-700/50 text-emerald-300 px-3 py-1 rounded-lg text-xs font-semibold">
                    {task.category}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Completed by:</span>
                  <span className="text-emerald-300 font-semibold">
                    {task.employeeName}
                  </span>
                </div>
              </div>

              {/* Success Badge */}
              <div className="bg-gradient-to-r from-emerald-600/30 to-teal-600/30 border border-emerald-500/50 rounded-lg p-3 mb-4 text-center">
                <p className="text-emerald-300 text-sm font-semibold">
                  ✓ Task Successfully Completed
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleViewDetails(task.title)}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-lg shadow-emerald-500/50"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Trophy
              size={48}
              className="text-emerald-500 mx-auto mb-4 opacity-50"
            />
            <p className="text-slate-400 text-lg">No completed tasks yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteTask;
