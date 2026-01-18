import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Plus, CheckCircle } from "lucide-react";

const CreateTask = () => {
  const { userData } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    assignTo: "",
    category: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.title ||
      !formData.date ||
      !formData.assignTo ||
      !formData.category ||
      !formData.description
    ) {
      alert("❌ Please fill in all fields!");
      return;
    }

    // Get all employees from localStorage
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    // Find the employee to assign task to by email
    const employeeIndex = employees.findIndex(
      (emp) => emp.email === formData.assignTo,
    );

    if (employeeIndex === -1) {
      alert("❌ Employee not found! Please enter a valid email.");
      return;
    }

    // Create new task object
    const newTask = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      category: formData.category,
      active: true,
      newTask: true,
      completed: false,
      failed: false,
    };

    // Add task to the selected employee
    employees[employeeIndex].tasks.push(newTask);

    // Save updated employees to localStorage
    localStorage.setItem("employees", JSON.stringify(employees));

    // Show success message
    setSuccessMessage(`✅ Task assigned to ${employees[employeeIndex].name}!`);

    // Clear form
    setFormData({
      title: "",
      date: "",
      assignTo: "",
      category: "",
      description: "",
    });

    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Get list of employees for dropdown
  const employees = userData?.employees || [];

  return (
    <div className="p-8 mt-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
        <Plus size={32} className="text-cyan-400" />
        Create & Assign Task
      </h2>
      <p className="text-slate-400 mb-8">
        Create a new task and assign it to an employee
      </p>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 bg-gradient-to-r from-green-600/30 to-emerald-600/30 border border-green-500/50 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle size={24} className="text-green-400" />
          <p className="text-green-300 font-semibold">{successMessage}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8"
      >
        {/* Left Column */}
        <div className="space-y-6">
          {/* Task Title */}
          <div>
            <label className="text-cyan-300 text-sm font-semibold mb-2 block">
              Task Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Fix login bug"
              className="w-full bg-slate-700/30 border border-cyan-400/50 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition"
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-cyan-300 text-sm font-semibold mb-2 block">
              Due Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-slate-700/30 border border-cyan-400/50 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition"
            />
          </div>

          {/* Assign to - Email Input */}
          <div>
            <label className="text-cyan-300 text-sm font-semibold mb-2 block">
              Assign to Employee (Email) *
            </label>
            <input
              type="email"
              name="assignTo"
              value={formData.assignTo}
              onChange={handleChange}
              placeholder="e.g., rahul@example.com"
              className="w-full bg-slate-700/30 border border-cyan-400/50 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-cyan-300 text-sm font-semibold mb-2 block">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-slate-700/30 border border-cyan-400/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition"
            >
              <option value="">-- Select Category --</option>
              <option value="Development">Development</option>
              <option value="Backend">Backend</option>
              <option value="Frontend">Frontend</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Design">Design</option>
              <option value="Testing">Testing</option>
              <option value="Database">Database</option>
              <option value="DevOps">DevOps</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Documentation">Documentation</option>
            </select>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 flex flex-col">
          {/* Description */}
          <div className="flex-grow">
            <label className="text-cyan-300 text-sm font-semibold mb-2 block">
              Task Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the task in detail..."
              className="w-full h-48 bg-slate-700/30 border border-cyan-400/50 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 resize-none transition"
            />
          </div>

          {/* Create Task Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-green-500/50 transition hover:scale-105 flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Create & Assign Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
