import React from "react";

const ContactsList = () => {
  const contacts = ["Rishi Raj", "Aman Kumar", "Rahul Singh", "Priya Sharma"];

  return (
    <div className="border-r border-white/10 p-6 bg-[#111827]">
      <h2 className="text-2xl font-semibold mb-6">Contacts</h2>

      <div className="space-y-4">
        {contacts.map((contact, index) => (
          <div key={index} className="bg-[#1e293b] hover:bg-[#263449] transition-all cursor-pointer rounded-2xl px-5 py-4">
            {contact}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsList;
