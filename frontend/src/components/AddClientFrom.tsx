import { useState, useEffect } from "react";
import { useAddClientMutation, useUpdateClientMutation, useGetCLientByIdQuery } from "../features/client/clientApi";
import { useNavigate, useParams, useLocation, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const AddClientForm = () => {
  const { clientId } = useParams<{ clientId?: string }>();
  const [searchParams] = useSearchParams();
  const editMode = searchParams.get("edit") === "1";
  const navigate = useNavigate();

  // Fetch client data if in edit mode
  const { data: clientData, isLoading: isClientLoading } = useGetCLientByIdQuery(clientId!, { skip: !editMode || !clientId });

  const [addClient] = useAddClientMutation();
  const [updateClient] = useUpdateClientMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
  });

  useEffect(() => {
    if (editMode && clientData?.client) {
      setFormData({
        name: clientData.client.name || "",
        email: clientData.client.email || "",
        phone: clientData.client.phone || "",
        company: clientData.client.company || "",
        notes: clientData.client.notes || "",
      });
    }
  }, [editMode, clientData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editMode && clientId) {
      updateClient({ id: clientId, ...formData })
        .unwrap()
        .then(() => {
          toast.success("Client updated successfully!");
          navigate("/clients");
        })
        .catch((error) => {
          toast.error("Failed to update client: " + (error?.data?.message || error.message));
        });
    } else {
      addClient(formData)
        .unwrap()
        .then(() => {
          toast.success("Client added successfully!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            notes: "",
          });
          navigate("/clients");
        })
        .catch((error) => {
          toast.error("Failed to add client: " + (error?.data?.message || error.message));
        });
    }
  };

  if (isClientLoading) return <div>Loading client...</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gray-200 rounded-2xl shadow-lg space-y-4 mt-5">
      <h2 className="text-2xl font-bold mb-4">{editMode ? "Edit Client" : "Add New Client"}</h2>
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter client's name"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter client's email"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter phone number"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Company</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter company name"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter notes"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
      >
        {editMode ? "Update Client" : "Add Client"}
      </button>
    </form>
  );
};

export default AddClientForm;