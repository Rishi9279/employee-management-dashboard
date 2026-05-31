import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown, FiPlus } from "react-icons/fi";
import EmployeesTable from "../components/employees/EmployeesTable";
import { useAppData } from "../context/AppDataContext";

const emptyForm = {
  name: "",
  role: "",
  department: "",
  email: "",
  status: "Active",
};

const Employees = ({ globalSearch = "" }) => {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useAppData();
  const [searchInput, setSearchInput] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const mergedSearch = (searchInput || globalSearch).trim().toLowerCase();

  const filteredEmployees = useMemo(() => {
    if (!mergedSearch) return employees;
    return employees.filter((item) =>
      [item.name, item.role, item.department, item.email]
        .join(" ")
        .toLowerCase()
        .includes(mergedSearch),
    );
  }, [employees, mergedSearch]);

  const handleAddEmployee = (event) => {
    event.preventDefault();
    if (!form.name || !form.role || !form.department || !form.email) return;
    addEmployee(form);
    setForm(emptyForm);
    setShowAddForm(false);
  };

  return (
    <section className="space-y-5 p-4 md:p-6">
      <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-[#111827] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">Employee Directory</h3>
          <p className="text-sm text-slate-400">{filteredEmployees.length} records found</p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <input
            className="w-full rounded-full border border-white/10 bg-[#1e293b] px-4 py-2 text-sm text-white outline-none placeholder:text-slate-400 sm:w-60"
            type="text"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search employees..."
          />

          <motion.button
            className="flex items-center justify-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-600"
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowAddForm((prev) => !prev)}
          >
            <FiPlus />
            Add Employee
          </motion.button>
        </div>
      </div>

      {showAddForm ? (
        <motion.form
          className="grid grid-cols-1 gap-3 rounded-xl border border-white/10 bg-[#111827] p-4 md:grid-cols-2"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          onSubmit={handleAddEmployee}
        >
          <input
            className="rounded-lg border border-white/10 bg-[#1e293b] px-3 py-2 text-sm outline-none"
            placeholder="Full Name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
          <input
            className="rounded-lg border border-white/10 bg-[#1e293b] px-3 py-2 text-sm outline-none"
            placeholder="Role"
            value={form.role}
            onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
          />
          <input
            className="rounded-lg border border-white/10 bg-[#1e293b] px-3 py-2 text-sm outline-none"
            placeholder="Department"
            value={form.department}
            onChange={(event) => setForm((prev) => ({ ...prev, department: event.target.value }))}
          />
          <input
            className="rounded-lg border border-white/10 bg-[#1e293b] px-3 py-2 text-sm outline-none"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          />
          <div className="relative">
            <select
              className="w-full appearance-none rounded-lg border border-white/10 bg-[#1e293b] py-2 pl-3 pr-9 text-sm outline-none"
              value={form.status}
              onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300"
              onClick={() => {
                setShowAddForm(false);
                setForm(emptyForm);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
            >
              Save Employee
            </button>
          </div>
        </motion.form>
      ) : null}

      <EmployeesTable
        employees={filteredEmployees}
        onUpdateEmployee={updateEmployee}
        onDeleteEmployee={deleteEmployee}
      />
    </section>
  );
};

export default Employees;

