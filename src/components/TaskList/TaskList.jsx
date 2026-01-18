import React, { useState } from "react";
import NewTask from "./NewTask";
import AcceptTask from "./AcceptTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import { Clock, CheckCircle, Trophy, AlertCircle } from "lucide-react";

const TaskList = () => {
  const [activeTab, setActiveTab] = useState("new");

  const tabs = [
    {
      id: "new",
      label: "New Tasks",
      icon: Clock,
      color: "from-cyan-600 to-blue-700",
      shadow: "shadow-cyan-500/50",
    },
    {
      id: "active",
      label: "Active Tasks",
      icon: CheckCircle,
      color: "from-green-600 to-emerald-700",
      shadow: "shadow-green-500/50",
    },
    {
      id: "completed",
      label: "Completed",
      icon: Trophy,
      color: "from-emerald-600 to-teal-700",
      shadow: "shadow-emerald-500/50",
    },
    {
      id: "failed",
      label: "Failed",
      icon: AlertCircle,
      color: "from-red-600 to-orange-700",
      shadow: "shadow-red-500/50",
    },
  ];

  return (
    <div className="p-8 min-h-screen">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Task Management
        </h1>
        <p className="text-slate-400 text-lg">
          Manage all your tasks in one place
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 md:gap-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition duration-300 ${
                  isActive
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg ${tab.shadow}`
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                }`}
              >
                <Icon size={18} />
                <span className="hidden md:inline">{tab.label}</span>
                <span className="md:hidden text-xs">
                  {tab.label.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="transition-all duration-300">
        {activeTab === "new" && <NewTask />}
        {activeTab === "active" && <AcceptTask />}
        {activeTab === "completed" && <CompleteTask />}
        {activeTab === "failed" && <FailedTask />}
      </div>
    </div>
  );
};

export default TaskList;
