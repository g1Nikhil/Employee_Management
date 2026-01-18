import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const TaskListNumbers = () => {
  const { userData } = useContext(AuthContext);

  const taskStats = {
    newTask: 0,
    active: 0,
    completed: 0,
    failed: 0,
  };

  if (userData?.tasks) {
    userData.tasks.forEach((task) => {
      if (task.newTask) taskStats.newTask++;
      if (task.active) taskStats.active++;
      if (task.completed) taskStats.completed++;
      if (task.failed) taskStats.failed++;
    });
  }

  return (
    <div className="flex gap-4 justify-between mb-7 flex-wrap">
      {/* New Task */}
      <div className="rounded-xl flex-1 min-w-[200px] py-6 px-9 bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-500/50 hover:scale-105 transition">
        <h2 className="text-4xl font-bold text-white">{taskStats.newTask}</h2>
        <p className="text-lg font-semibold text-blue-100 mt-2">New Tasks</p>
      </div>

      {/* Active Task */}
      <div className="rounded-xl flex-1 min-w-[200px] py-6 px-9 bg-gradient-to-br from-green-600 to-green-700 shadow-lg shadow-green-500/50 hover:scale-105 transition">
        <h2 className="text-4xl font-bold text-white">{taskStats.active}</h2>
        <p className="text-lg font-semibold text-green-100 mt-2">Active</p>
      </div>

      {/* Completed Task */}
      <div className="rounded-xl flex-1 min-w-[200px] py-6 px-9 bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg shadow-purple-500/50 hover:scale-105 transition">
        <h2 className="text-4xl font-bold text-white">{taskStats.completed}</h2>
        <p className="text-lg font-semibold text-purple-100 mt-2">Completed</p>
      </div>

      {/* Failed Task */}
      <div className="rounded-xl flex-1 min-w-[200px] py-6 px-9 bg-gradient-to-br from-red-600 to-red-700 shadow-lg shadow-red-500/50 hover:scale-105 transition">
        <h2 className="text-4xl font-bold text-white">{taskStats.failed}</h2>
        <p className="text-lg font-semibold text-red-100 mt-2">Failed</p>
      </div>
    </div>
  );
};

export default TaskListNumbers;
