import { useState } from "react";
import { motion } from "framer-motion";
import { FiLock, FiMail } from "react-icons/fi";
import { useAppData } from "../../context/AppDataContext";

const LoginPage = () => {
  const { login } = useAppData();
  const [email, setEmail] = useState("rishi@example.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const response = login(email, password);
    if (!response.ok) {
      setError(response.message || "Unable to login");
      return;
    }
    setError("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a] p-4">
      <motion.form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-2xl md:p-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-bold text-white">EmployeeHub Login</h1>
        <p className="mt-1 text-sm text-slate-400">Sign in to continue to your management dashboard.</p>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm text-slate-400">Email</span>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#1e293b] px-3">
              <FiMail className="text-slate-400" />
              <input type="email" className="w-full bg-transparent py-3 text-sm text-white outline-none" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </div>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-slate-400">Password</span>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#1e293b] px-3">
              <FiLock className="text-slate-400" />
              <input type="password" className="w-full bg-transparent py-3 text-sm text-white outline-none" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </div>
          </label>
        </div>

        {error ? <p className="mt-4 rounded-lg bg-rose-500/15 px-3 py-2 text-sm text-rose-300">{error}</p> : null}

        <button type="submit" className="mt-6 w-full rounded-xl bg-amber-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-600">
          Login
        </button>

        <p className="mt-3 text-xs text-slate-500">Demo credentials pre-filled for quick testing.</p>
      </motion.form>
    </div>
  );
};

export default LoginPage;
