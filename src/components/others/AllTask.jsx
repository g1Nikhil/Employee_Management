import React from "react";

const AllTask = () => {
  const tasks = [
    {
      id: 1,
      title: "Make a UI design",
      date: "20 Feb 2024",
      assignTo: "Sarthak",
      category: "design",
      priority: "High",
      status: "new",
    },
    {
      id: 2,
      title: "Example task",
      date: "20 Feb 2024",
      assignTo: "Nikhil",
      category: "dev",
      priority: "High",
      status: "completed",
    },
    {
      id: 3,
      title: "Important Update",
      date: "8 Feb 2024",
      assignTo: "Rahul",
      category: "dev",
      priority: "High",
      status: "failed",
    },
    {
      id: 4,
      title: "Documentation",
      date: "25 Feb 2024",
      assignTo: "Priya",
      category: "documentation",
      priority: "Medium",
      status: "accepted",
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-gradient-to-r from-red-600 to-red-700";
      case "medium":
        return "bg-gradient-to-r from-yellow-600 to-yellow-700";
      case "low":
        return "bg-gradient-to-r from-green-600 to-green-700";
      default:
        return "bg-gradient-to-r from-slate-600 to-slate-700";
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-gradient-to-r from-blue-600 to-blue-700";
      case "completed":
        return "bg-gradient-to-r from-green-600 to-green-700";
      case "failed":
        return "bg-gradient-to-r from-orange-600 to-orange-700";
      case "accepted":
        return "bg-gradient-to-r from-purple-600 to-purple-700";
      default:
        return "bg-gradient-to-r from-slate-600 to-slate-700";
    }
  };

  return (
    <div className="p-8 mt-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-8">
        All Tasks
      </h2>

      <div className="overflow-x-auto bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl">
        <table className="w-full text-left text-white">
          <thead className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 border-b border-cyan-500/20">
            <tr>
              <th className="px-6 py-4 font-semibold">Task Title</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Assign To</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Priority</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="border-b border-cyan-500/10 hover:bg-cyan-500/10 transition"
              >
                <td className="px-6 py-4 font-medium">{task.title}</td>
                <td className="px-6 py-4">{task.date}</td>
                <td className="px-6 py-4">{task.assignTo}</td>
                <td className="px-6 py-4">
                  <span className="bg-slate-700/50 border border-cyan-400/30 px-3 py-1 rounded-lg text-sm">
                    {task.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`${getPriorityColor(task.priority)} text-white px-3 py-1 rounded-lg text-sm font-semibold`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`${getStatusColor(task.status)} text-white px-3 py-1 rounded-lg text-sm font-semibold capitalize`}
                  >
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTask;
