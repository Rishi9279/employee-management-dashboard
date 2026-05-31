import { motion } from "framer-motion";

const ContactsList = ({ contacts, selectedId, onSelect }) => {
  return (
    <div className="border-b border-white/10 bg-[#111827] p-4 lg:border-b-0 lg:border-r">
      <h2 className="mb-3 text-lg font-semibold">Contacts</h2>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
        {contacts.map((contact) => {
          const isActive = selectedId === contact.id;
          return (
            <motion.button
              key={contact.id}
              className={`rounded-xl border px-3 py-2 text-left transition-all ${
                isActive
                  ? "border-amber-400/40 bg-amber-500/15"
                  : "border-white/10 bg-[#1e293b] hover:border-white/20"
              }`}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(contact.id)}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{contact.name}</p>
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    contact.online ? "bg-emerald-400" : "bg-slate-500"
                  }`}
                />
              </div>
              <p className="mt-0.5 text-xs text-slate-400">{contact.role}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ContactsList;

