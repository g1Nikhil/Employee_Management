const employees = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    password: "123",
    tasks: [
      {
        title: "Fix login bug",
        description: "Resolve login validation issue on frontend",
        date: "2026-01-10",
        category: "Development",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        title: "API integration",
        description: "Integrate user API with dashboard",
        date: "2026-01-08",
        category: "Backend",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
      {
        title: "UI review",
        description: "Review UI components for responsiveness",
        date: "2026-01-05",
        category: "UI/UX",
        active: false,
        newTask: false,
        completed: false,
        failed: true,
      },
    ],
  },
  {
    id: 2,
    name: "Ankit Verma",
    email: "ankit.verma@example.com",
    password: "123",
    tasks: [
      {
        title: "Create REST APIs",
        description: "Develop CRUD APIs for employees",
        date: "2026-01-09",
        category: "Backend",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        title: "Database design",
        description: "Design MongoDB schema",
        date: "2026-01-07",
        category: "Database",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
      {
        title: "Bug fixing",
        description: "Fix reported backend bugs",
        date: "2026-01-06",
        category: "Maintenance",
        active: false,
        newTask: false,
        completed: false,
        failed: true,
      },
    ],
  },
  {
    id: 3,
    name: "Priya Singh",
    email: "priya.singh@example.com",
    password: "123",
    tasks: [
      {
        title: "Design dashboard",
        description: "Create dashboard UI layout",
        date: "2026-01-11",
        category: "UI/UX",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        title: "Figma prototype",
        description: "Prepare Figma prototype for review",
        date: "2026-01-08",
        category: "Design",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
      {
        title: "Client feedback",
        description: "Incorporate client feedback in UI",
        date: "2026-01-06",
        category: "UI/UX",
        active: false,
        newTask: false,
        completed: false,
        failed: true,
      },
    ],
  },
  {
    id: 4,
    name: "Neha Gupta",
    email: "neha.gupta@example.com",
    password: "123",
    tasks: [
      {
        title: "Write test cases",
        description: "Write unit test cases for modules",
        date: "2026-01-10",
        category: "Testing",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        title: "Regression testing",
        description: "Perform regression testing",
        date: "2026-01-07",
        category: "Testing",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
      {
        title: "Bug reporting",
        description: "Report critical bugs to dev team",
        date: "2026-01-05",
        category: "QA",
        active: false,
        newTask: false,
        completed: false,
        failed: true,
      },
    ],
  },
  {
    id: 5,
    name: "Amit Patel",
    email: "amit.patel@example.com",
    password: "123",
    tasks: [
      {
        title: "Deploy app",
        description: "Deploy application on server",
        date: "2026-01-12",
        category: "DevOps",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        title: "CI/CD setup",
        description: "Setup CI/CD pipeline",
        date: "2026-01-09",
        category: "DevOps",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
      {
        title: "Server monitoring",
        description: "Monitor server health",
        date: "2026-01-06",
        category: "Maintenance",
        active: false,
        newTask: false,
        completed: false,
        failed: true,
      },
    ],
  },
];

const admin = [
  {
    id: 1,
    email: "admin@example.com",
    password: "123",
  },
];

export const setLocalStorage = () => {
  localStorage.setItem("employees", JSON.stringify(employees));
  localStorage.setItem("admin", JSON.stringify(admin));

};

export const getLocalStorage = () => {
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  const admin = JSON.parse(localStorage.getItem('admin')) || [];
  return { employees, admin };
};
