import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://jsonplaceholder.typicode.com/posts";

function Homepag() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const nav = useNavigate();
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser1"));

    if (!currentUser) {
      nav("/");
      return;
    }

    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await axios.get(API);
    setCourses(res.data.slice(0, 30));
  };

  const addCourse = async () => {
    if (!title || !body) return;

    const res = await axios.post(API, {
      title,
      body,
      userId: 1,
    });

    setCourses([res.data, ...courses]);
    setTitle("");
    setBody("");
  };

  const deleteCourse = async (id) => {
    await axios.delete(`${API}/${id}`);

    setCourses(courses.filter((course) => course.id !== id));
  };

  const editCourse = (course) => {
    setEditingId(course.id);
    setTitle(course.title);
    setBody(course.body);
  };

  const updateCourse = async () => {
    const res = await axios.put(`${API}/${editingId}`, {
      id: editingId,
      title,
      body,
      userId: 1,
    });

    setCourses(
      courses.map((course) => (course.id === editingId ? res.data : course)),
    );

    setEditingId(null);
    setTitle("");
    setBody("");
  };
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.body.toLowerCase().includes(search.toLowerCase()),
  );
  const handleLogout = () => {
    localStorage.removeItem("currentUser1");
    nav("/");
  };
  return (
    <div className="max-w-5xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Student Management</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="border p-4 rounded mb-5">
        <input
          className="border p-2 w-full mb-3"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full mb-3"
          placeholder="Course Description"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        {editingId ? (
          <button
            onClick={updateCourse}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Update Course
          </button>
        ) : (
          <button
            onClick={addCourse}
            className="bg-green-600 text-white px-5 py-2 rounded"
          >
            Add Course
          </button>
        )}
      </div>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <tr key={course.id}>
                <td className="border p-2">{course.id}</td>
                <td className="border p-2">{course.title}</td>
                <td className="border p-2">{course.body}</td>
                <td className="border p-2">
                  <button
                    onClick={() => editCourse(course)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No courses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Homepag;
