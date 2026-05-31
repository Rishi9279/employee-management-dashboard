import MessagesContainer from "../components/messages/MessagesContainer";

const Messages = ({ globalSearch = "" }) => {
  return (
    <section className="space-y-4 p-4 md:p-6">
      <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
        <h3 className="text-lg font-semibold">Team Messages</h3>
        <p className="text-sm text-slate-400">
          Select a contact and continue the conversation.
        </p>
      </div>

      <MessagesContainer globalSearch={globalSearch} />
    </section>
  );
};

export default Messages;

