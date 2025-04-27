import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetClientsQuery } from "../features/client/clientApi";
import { useAddProjectMutation, useGetProjectsQuery } from "../features/projects/projectApi";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreateInteractionLogMutation, useGetInteractionLogsQuery } from "../features/logs/logsApi";

interface LogsData {
  date: string;
  interactionType: string;
  notes: string;
}

const AddLogsComponents = () => {
  const { projectId } = useParams();
  const { data: projects, error, isLoading } = useGetProjectsQuery({});
   const navigate = useNavigate();
  const [createInteractionLog] = useCreateInteractionLogMutation();
  const [formData, setFormData] = useState<LogsData>({
    date: "",
    interactionType: "",
    notes: "",
  });

  if (isLoading) return <div>Loading clients...</div>;
  if (error) return <div>Error loading clients</div>;

  const project = projects?.find((project) => project.id === projectId);
  if (!project) {
    return <div>project not found</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDateChange = (date: Date | null) => {
    if (date && !isNaN(date.getTime())) {
      setFormData((prev) => ({
        ...prev,
        date: date.toISOString(),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        date: "",
      }));
    }
  };
  
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.date || !formData.interactionType || !formData.notes) {
      toast.error("Please fill all fields before submitting");
      return;
    }
  
    const projectData = {
      date: formData.date, 
      interactionType: formData.interactionType,
      notes: formData.notes,
      projectId: projectId || "",
    };
  
    createInteractionLog(projectData)
      .then(() => {
        toast.success("Log added successfully!");
        navigate(`/logs/${projectId}`)
      })
      .catch((error) => {
        toast.error("Failed to add log: " + error.message);
      });
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-gray-200 rounded-2xl shadow-lg space-y-4 mt-5"
    >
      <h2 className="text-2xl font-bold mb-4">Add New logs</h2>

      <div>
        <label className="block mb-1 font-medium">Project Name</label>
        <input
          type="text"
          value={project?.title || ""}
          className="w-full p-2 border text-emerald-400 rounded-lg border-emerald-500 inset-1"
          readOnly
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Date</label>
        <DatePicker
          selected={formData.date ? new Date(formData.date) : null}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select date"
          className="w-full p-2 border rounded-lg border-emerald-500"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">interactionType</label>
        <input
          type="text"
          name="interactionType"
          value={formData.interactionType}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg border-emerald-500"
          placeholder="Enter interactionType"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Notes</label>
        <input
          type="text"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg border-emerald-500"
          placeholder="Enter Notes"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add Project
      </button>
    </form>
  );
};

export default AddLogsComponents;
