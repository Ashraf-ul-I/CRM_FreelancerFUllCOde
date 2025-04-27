import { useState, useEffect } from "react";
import { useParams, useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { useGetClientsQuery } from "../features/client/clientApi";
import { useAddProjectMutation, useUpdateProjectMutation } from "../features/projects/projectApi";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ProjectData {
  title: string;
  budget: string;
  deadline: string;
  status: string;
}

const AddProjectForm = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const editMode = searchParams.get("edit") === "1";
  const projectId = searchParams.get("projectId");
  const project = location.state?.project;

  const { data: clients, error, isLoading } = useGetClientsQuery({});
  const [addProject] = useAddProjectMutation();
  const [updateProject] = useUpdateProjectMutation();

  const [formData, setFormData] = useState<ProjectData>({
    title: project?.title || "",
    budget: project?.budget?.toString() || "",
    deadline: project?.deadline ? new Date(project.deadline).toISOString().split("T")[0] : "",
    status: project?.status || "",
  });

  useEffect(() => {
    if (editMode && project) {
      setFormData({
        title: project.title,
        budget: project.budget.toString(),
        deadline: project.deadline ? new Date(project.deadline).toISOString().split("T")[0] : "",
        status: project.status,
      });
    }
  }, [editMode, project]);

  if (isLoading) return <div>Loading clients...</div>;
  if (error) return <div>Error loading clients</div>;

  const client = clients?.find((client) => client.id === clientId);
  if (!client) {
    return <div>Client not found</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      deadline: date ? date.toISOString().split("T")[0] : "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDeadline = formData.deadline; 
    if (editMode && projectId) {
      updateProject({
        projectId,
        title: formData.title,
        budget: parseFloat(formData.budget),
        deadline: formattedDeadline,
        status: formData.status,
        clientId: clientId || "",
      })
        .unwrap()
        .then(() => {
          toast.success("Project updated successfully!");
          navigate("/projects");
        })
        .catch((error) => {
          toast.error("Failed to update project: " + error.message);
        });
    } else {
      addProject({
        title: formData.title,
        budget: parseFloat(formData.budget),
        deadline: formattedDeadline,
        status: formData.status,
        clientId: clientId || "",
      })
        .unwrap()
        .then(() => {
          toast.success("Project added successfully!");
          navigate("/projects");
        })
        .catch((error) => {
          toast.error("Failed to add project: " + error.message);
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-gray-200 rounded-2xl shadow-lg space-y-4 mt-5"
    >
      <h2 className="text-2xl font-bold mb-4">
        {editMode ? "Edit Project" : "Add New Project"}
      </h2>

      <div>
        <label className="block mb-1 font-medium">Client Name</label>
        <input
          type="text"
          value={client?.name || ""}
          className="w-full p-2 border text-emerald-400 rounded-lg border-emerald-500 inset-1"
          readOnly
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg border-emerald-500"
          placeholder="Enter project title"
          required
        />
      </div>

      {/* Budget */}
      <div>
        <label className="block mb-1 font-medium">Budget</label>
        <input
          type="number"
          step="0.01"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg border-emerald-500"
          placeholder="Enter budget"
          required
        />
      </div>

      {/* Deadline */}
      <div>
        <label className="block mb-1 font-medium">Deadline</label>
        <DatePicker
          selected={formData.deadline ? new Date(formData.deadline) : null}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select deadline"
          className="w-full p-2 border rounded-lg border-emerald-500"
          required
        />
      </div>

      {/* Status */}
      <div>
        <label className="block mb-1 font-medium">Status</label>
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg border-emerald-500"
          placeholder="Enter status"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
      >
        {editMode ? "Update Project" : "Add Project"}
      </button>
    </form>
  );
};

export default AddProjectForm;