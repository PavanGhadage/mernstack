import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";

const StudentModal = ({
  editingStudent,
  addStudent,
  updateStudent,
  closeModal,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    address: {
      city: "",
    },
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "city") {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          city: value,
        },
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.city.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (editingStudent) {
      updateStudent(formData);
    } else {
      addStudent(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
          {editingStudent ? "Edit Student" : "Add Student"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
          />

          <Input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            name="phone"
            placeholder="Enter Phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <Input
            name="city"
            placeholder="Enter City"
            value={formData.address.city}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 hover:bg-gray-600 text-white"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {editingStudent ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;
