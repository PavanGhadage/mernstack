import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";

const CourseModal = ({
  editingCourse,
  addCourse,
  updateCourse,
  closeModal,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    status: "Pending",
  });

  useEffect(() => {
    if (editingCourse) {
      setFormData(editingCourse);
    }
  }, [editingCourse]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.body) {
      alert("Please fill all fields");
      return;
    }

    if (editingCourse) {
      updateCourse(formData);
    } else {
      addCourse(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-5 dark:text-white">
          {editingCourse ? "Edit Course" : "Add Course"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="title"
            placeholder="Course Name"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            name="body"
            rows="4"
            placeholder="Course Description"
            value={formData.body}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white"
          >
            <option>Completed</option>
            <option>Pending</option>
          </select>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white"
            >
              Cancel
            </Button>

            <Button type="submit" className="bg-blue-600 text-white">
              {editingCourse ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;
