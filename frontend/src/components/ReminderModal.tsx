// components/AddReminderModal.tsx
import { useState } from "react";
import { useCreateReminderMutation } from "../features/reminder/reminderApi";
import toast from "react-hot-toast";

const ReminderModal = ({ projectId, onClose }: { projectId: string; onClose: () => void }) => {
  const [form, setForm] = useState({ dueDate: "", message: "" });
  const [createReminder] = useCreateReminderMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReminder({ projectId, ...form }).unwrap();
      toast.success("Reminder added!");
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add reminder");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 w-96">
        <h2 className="text-xl font-bold">Add Reminder</h2>
        <div>
          <label className="block mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Add</button>
        </div>
      </form>
    </div>
  );
};

export default ReminderModal;