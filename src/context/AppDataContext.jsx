import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppDataContext = createContext(null);

const storageKeys = {
  employees: "ehub_employees",
  tasks: "ehub_tasks",
  conversations: "ehub_conversations",
  selectedContactId: "ehub_selected_contact_id",
  analyticsRange: "ehub_analytics_range",
  profile: "ehub_profile",
  preferences: "ehub_preferences",
  lastSavedAt: "ehub_last_saved_at",
  notifications: "ehub_notifications",
  authSession: "ehub_auth_session",
  authAccount: "ehub_auth_account",
};

const readStorage = (key, fallbackValue) => {
  if (typeof window === "undefined") return fallbackValue;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallbackValue;
  } catch {
    return fallbackValue;
  }
};

const writeStorage = (key, value) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

const initialEmployees = [
  {
    id: 1,
    name: "Rishi Raj",
    role: "Frontend Developer",
    department: "Engineering",
    status: "Active",
    email: "rishi@gmail.com",
  },
  {
    id: 2,
    name: "Aman Kumar",
    role: "UI Designer",
    department: "Design",
    status: "Active",
    email: "aman@gmail.com",
  },
  {
    id: 3,
    name: "Rahul Singh",
    role: "Backend Developer",
    department: "Engineering",
    status: "Inactive",
    email: "rahul@gmail.com",
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "HR Manager",
    department: "HR",
    status: "Active",
    email: "priya@gmail.com",
  },
];

const initialTasks = [
  {
    id: 1,
    title: "Build Employee Dashboard",
    assignedTo: "Rishi Raj",
    deadline: "2026-06-02",
    priority: "High",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Design Login Page",
    assignedTo: "Aman Kumar",
    deadline: "2026-06-07",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 3,
    title: "Fix Backend API",
    assignedTo: "Rahul Singh",
    deadline: "2026-06-01",
    priority: "High",
    status: "Completed",
  },
  {
    id: 4,
    title: "Prepare Hiring Scorecard",
    assignedTo: "Priya Sharma",
    deadline: "2026-06-05",
    priority: "Low",
    status: "Pending",
  },
];

const initialContacts = [
  { id: 1, name: "Aman Kumar", role: "Designer", online: true },
  { id: 2, name: "Rahul Singh", role: "Backend", online: true },
  { id: 3, name: "Priya Sharma", role: "HR Manager", online: false },
  { id: 4, name: "Nisha Verma", role: "Recruiter", online: true },
];

const initialConversations = {
  1: [
    { id: 1, sender: "other", text: "Hero section final kar diya?", time: "09:12" },
    { id: 2, sender: "me", text: "Haan, aaj PR raise kar dunga.", time: "09:14" },
  ],
  2: [
    { id: 3, sender: "other", text: "API response ka shape update hua hai.", time: "10:03" },
    { id: 4, sender: "me", text: "Perfect, main frontend mapping update karta hoon.", time: "10:05" },
  ],
  3: [{ id: 5, sender: "other", text: "Tomorrow leave request raised.", time: "Yesterday" }],
  4: [{ id: 6, sender: "other", text: "2 candidates shortlisted for review.", time: "11:22" }],
};

const analyticsRanges = {
  "This Month": {
    labels: ["W1", "W2", "W3", "W4", "W5"],
    period: "month",
  },
  "Last Month": {
    labels: ["W1", "W2", "W3", "W4", "W5"],
    period: "last-month",
  },
  "This Year": {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    period: "year",
  },
};

const percentage = (value, total) => Math.round((value / Math.max(1, total)) * 100);
const inCurrentMonth = (date, today) =>
  date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth();
const inLastMonth = (date, today) => {
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  return date.getFullYear() === lastMonth.getFullYear() && date.getMonth() === lastMonth.getMonth();
};
const parseDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};
const resolveTaskDate = (task) => parseDate(task.deadline) || parseDate(task.createdAt) || new Date();
const buildTaskSeries = (tasks, period, labels, today) => {
  const series = Array(labels.length).fill(0);

  tasks.forEach((task) => {
    const date = resolveTaskDate(task);
    if (period === "month" && !inCurrentMonth(date, today)) return;
    if (period === "last-month" && !inLastMonth(date, today)) return;
    if (period === "year" && date.getFullYear() !== today.getFullYear()) return;

    if (period === "year") {
      series[date.getMonth()] += 1;
      return;
    }

    const weekIndex = Math.min(labels.length - 1, Math.floor((date.getDate() - 1) / 7));
    series[weekIndex] += 1;
  });

  return series;
};
const getAutoReply = (message, contactName) => {
  const text = message.toLowerCase();
  if (text.includes("deadline") || text.includes("eta")) {
    return "Noted. I will share the exact ETA in the next update.";
  }
  if (text.includes("meeting") || text.includes("call")) {
    return "Sure, meeting works. Please share the time slot.";
  }
  if (text.includes("task") || text.includes("ticket")) {
    return "Got it. I am checking the task board and will update status.";
  }
  if (text.includes("thanks") || text.includes("thank you")) {
    return "Anytime. Happy to help.";
  }
  if (text.includes("hi") || text.includes("hello")) {
    return `Hi! ${contactName} here, what should we prioritize first?`;
  }
  return "Received. I will review this and get back shortly.";
};

const computeAnalyticsDataByRange = (employees, tasks, conversations) => {
  const today = new Date();
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((item) => item.status === "Active").length;
  const completedTasks = tasks.filter((item) => item.status === "Completed").length;
  const inProgressTasks = tasks.filter((item) => item.status === "In Progress").length;
  const pendingTasks = tasks.filter((item) => item.status === "Pending").length;
  const overdueTasks = tasks.filter((item) => {
    const deadline = resolveTaskDate(item);
    return deadline < today && item.status !== "Completed";
  }).length;
  const totalMessages = Object.values(conversations).reduce(
    (sum, thread) => sum + thread.length,
    0,
  );
  const completionRate = percentage(completedTasks, tasks.length);
  const activityRate = percentage(inProgressTasks + completedTasks, tasks.length);
  const sourceNote = `Live metrics from ${totalEmployees} employees, ${tasks.length} tasks (deadline-based trend), and ${totalMessages} total chat messages.`;

  const entries = Object.entries(analyticsRanges).map(([range, config]) => {
    const bars = buildTaskSeries(tasks, config.period, config.labels, today);

    return [
      range,
      {
        labels: config.labels,
        revenue: bars,
        dataSource: sourceNote,
        stats: [
          {
            id: 1,
            title: "Total Employees",
            value: totalEmployees,
            delta: `${activeEmployees} active`,
          },
          {
            id: 2,
            title: "Open Work",
            value: inProgressTasks + pendingTasks,
            delta: `${pendingTasks} pending`,
          },
          {
            id: 3,
            title: "Completion Rate",
            value: `${completionRate}%`,
            delta: `${completedTasks} completed`,
          },
        ],
        activities: [
          {
            id: 1,
            title: "Active Workload",
            value: `${activityRate}%`,
            growth: `${inProgressTasks} in progress`,
          },
          {
            id: 2,
            title: "Overdue Tasks",
            value: overdueTasks,
            growth: overdueTasks > 0 ? "Needs attention" : "All on track",
          },
        ],
      },
    ];
  });

  return Object.fromEntries(entries);
};

const initialProfile = {
  fullName: "Rishi Raj",
  email: "rishi@example.com",
  password: "admin123",
  phone: "+91 9876543210",
  role: "Frontend Developer",
};

const initialPreferences = {
  darkMode: true,
  notifications: true,
  emailUpdates: true,
};

const initialAuthAccount = {
  email: "rishi@example.com",
  password: "admin123",
};

const initialNotifications = [
  {
    id: 1,
    type: "info",
    title: "Welcome Back",
    description: "Dashboard is ready and synced.",
    time: "Now",
    read: false,
  },
];

const getTimeLabel = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export const AppDataProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() =>
    readStorage(storageKeys.employees, initialEmployees),
  );
  const [tasks, setTasks] = useState(() => readStorage(storageKeys.tasks, initialTasks));
  const [contacts] = useState(initialContacts);
  const [conversations, setConversations] = useState(() =>
    readStorage(storageKeys.conversations, initialConversations),
  );
  const [selectedContactId, setSelectedContactId] = useState(() =>
    readStorage(storageKeys.selectedContactId, initialContacts[0].id),
  );
  const [analyticsRange, setAnalyticsRange] = useState(() =>
    readStorage(storageKeys.analyticsRange, "This Month"),
  );
  const [profile, setProfile] = useState(() =>
    readStorage(storageKeys.profile, initialProfile),
  );
  const [preferences, setPreferences] = useState(() =>
    readStorage(storageKeys.preferences, initialPreferences),
  );
  const [lastSavedAt, setLastSavedAt] = useState(() =>
    readStorage(storageKeys.lastSavedAt, null),
  );
  const [notifications, setNotifications] = useState(() =>
    readStorage(storageKeys.notifications, initialNotifications),
  );
  const [authAccount, setAuthAccount] = useState(() =>
    readStorage(storageKeys.authAccount, initialAuthAccount),
  );
  const [authSession, setAuthSession] = useState(() =>
    readStorage(storageKeys.authSession, null),
  );
  const [committedProfile, setCommittedProfile] = useState(() =>
    readStorage(storageKeys.profile, initialProfile),
  );
  const [committedPreferences, setCommittedPreferences] = useState(() =>
    readStorage(storageKeys.preferences, initialPreferences),
  );
  const [typingContacts, setTypingContacts] = useState({});

  const pushNotification = (title, description, type = "info", force = false) => {
    if (!force && !preferences.notifications) return;
    const item = {
      id: Date.now(),
      type,
      title,
      description,
      time: getTimeLabel(),
      read: false,
    };
    setNotifications((prev) => [item, ...prev].slice(0, 50));
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
  };

  const clearNotifications = () => setNotifications([]);

  const addEmployee = (employeePayload) => {
    const nextEmployee = {
      id: Date.now(),
      status: "Active",
      createdAt: new Date().toISOString(),
      ...employeePayload,
    };
    setEmployees((prev) => [nextEmployee, ...prev]);
    pushNotification("Employee Added", `${nextEmployee.name} joined the team.`, "success");
  };

  const updateEmployee = (id, updates) => {
    setEmployees((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
    pushNotification("Employee Updated", "Employee record has been modified.", "info");
  };

  const deleteEmployee = (id) => {
    const removed = employees.find((item) => item.id === id);
    setEmployees((prev) => prev.filter((item) => item.id !== id));
    if (removed) {
      pushNotification("Employee Deleted", `${removed.name} record removed.`, "warning");
    }
  };

  const addTask = (taskPayload) => {
    const nextTask = {
      id: Date.now(),
      status: "Pending",
      priority: "Medium",
      createdAt: new Date().toISOString(),
      ...taskPayload,
    };
    setTasks((prev) => [nextTask, ...prev]);
    pushNotification("Task Created", `${nextTask.title} has been added.`, "success");
  };

  const updateTask = (id, updates) => {
    setTasks((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
    pushNotification("Task Updated", "Task status/details changed.", "info");
  };

  const deleteTask = (id) => {
    const removed = tasks.find((item) => item.id === id);
    setTasks((prev) => prev.filter((item) => item.id !== id));
    if (removed) {
      pushNotification("Task Deleted", `${removed.title} removed from board.`, "warning");
    }
  };

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const activeContactId = selectedContactId;

    const nextMessage = {
      id: Date.now(),
      sender: "me",
      text: trimmed,
      time: getTimeLabel(),
    };

    setConversations((prev) => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), nextMessage],
    }));

    const activeContact = contacts.find((contact) => contact.id === activeContactId);
    if (activeContact) {
      pushNotification("Message Sent", `Sent to ${activeContact.name}.`, "info");
    }

    setTypingContacts((prev) => ({ ...prev, [activeContactId]: true }));

    const replyDelay = 900 + Math.floor(Math.random() * 900);
    setTimeout(() => {
      const replyMessage = {
        id: Date.now() + 1,
        sender: "other",
        text: getAutoReply(trimmed, activeContact?.name || "Teammate"),
        time: getTimeLabel(),
      };

      setConversations((prev) => ({
        ...prev,
        [activeContactId]: [...(prev[activeContactId] || []), replyMessage],
      }));
      setTypingContacts((prev) => ({ ...prev, [activeContactId]: false }));

      if (activeContact) {
        pushNotification("New Message", `${activeContact.name} replied to your message.`, "info");
      }
    }, replyDelay);
  };

  const updateProfileField = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const togglePreference = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const saveSettings = () => {
    setCommittedProfile(profile);
    setCommittedPreferences(preferences);
    setAuthAccount((prev) => ({
      ...prev,
      email: profile.email,
      password: profile.password,
    }));
    const time = getTimeLabel();
    setLastSavedAt(time);
    pushNotification("Settings Saved", "Profile and preferences are updated.", "success", true);
  };

  const resetSettings = () => {
    setProfile(committedProfile);
    setPreferences(committedPreferences);
    pushNotification("Changes Reverted", "Unsaved settings were reset.", "warning");
  };

  const login = (email, password) => {
    const isValid = email.trim().toLowerCase() === authAccount.email.toLowerCase() && password === authAccount.password;
    if (!isValid) {
      pushNotification("Login Failed", "Email or password is incorrect.", "error", true);
      return { ok: false, message: "Invalid email or password" };
    }

    const session = {
      name: profile.fullName,
      email: authAccount.email,
      loginAt: new Date().toISOString(),
    };
    setAuthSession(session);
    pushNotification("Login Successful", `Welcome ${profile.fullName}.`, "success", true);
    return { ok: true };
  };

  const logout = () => {
    setAuthSession(null);
    pushNotification("Logged Out", "Your session has been ended.", "info", true);
  };

  const dashboardStats = useMemo(() => {
    const activeEmployees = employees.filter((item) => item.status === "Active").length;
    const completedTasks = tasks.filter((item) => item.status === "Completed").length;
    const pendingTasks = tasks.filter((item) => item.status !== "Completed").length;

    return {
      totalEmployees: employees.length,
      activeTasks: tasks.filter((item) => item.status === "In Progress").length,
      completedTasks,
      pendingTasks,
      activeEmployees,
    };
  }, [employees, tasks]);

  const unreadNotificationCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications],
  );

  const isAuthenticated = Boolean(authSession);
  const analyticsDataByRange = useMemo(
    () => computeAnalyticsDataByRange(employees, tasks, conversations),
    [employees, tasks, conversations],
  );

  useEffect(() => {
    writeStorage(storageKeys.employees, employees);
  }, [employees]);

  useEffect(() => {
    writeStorage(storageKeys.tasks, tasks);
  }, [tasks]);

  useEffect(() => {
    writeStorage(storageKeys.conversations, conversations);
  }, [conversations]);

  useEffect(() => {
    writeStorage(storageKeys.selectedContactId, selectedContactId);
  }, [selectedContactId]);

  useEffect(() => {
    writeStorage(storageKeys.analyticsRange, analyticsRange);
  }, [analyticsRange]);

  useEffect(() => {
    writeStorage(storageKeys.profile, profile);
  }, [profile]);

  useEffect(() => {
    writeStorage(storageKeys.preferences, preferences);
  }, [preferences]);

  useEffect(() => {
    writeStorage(storageKeys.lastSavedAt, lastSavedAt);
  }, [lastSavedAt]);

  useEffect(() => {
    writeStorage(storageKeys.notifications, notifications);
  }, [notifications]);

  useEffect(() => {
    writeStorage(storageKeys.authSession, authSession);
  }, [authSession]);

  useEffect(() => {
    writeStorage(storageKeys.authAccount, authAccount);
  }, [authAccount]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.remove("theme-dark", "theme-light");
    document.documentElement.classList.add(preferences.darkMode ? "theme-dark" : "theme-light");
  }, [preferences.darkMode]);

  const value = {
    employees,
    tasks,
    contacts,
    conversations,
    selectedContactId,
    typingContacts,
    setSelectedContactId,
    analyticsRange,
    setAnalyticsRange,
    analyticsDataByRange,
    profile,
    preferences,
    notifications,
    unreadNotificationCount,
    lastSavedAt,
    dashboardStats,
    authSession,
    isAuthenticated,
    login,
    logout,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    addTask,
    updateTask,
    deleteTask,
    sendMessage,
    updateProfileField,
    togglePreference,
    saveSettings,
    resetSettings,
    markNotificationRead,
    clearNotifications,
    pushNotification,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used inside AppDataProvider");
  }
  return context;
};
