import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Dashboard from "./Dashboard";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import CourseTable from "../components/CourseTable";
import CourseModal from "../components/CourseModal";
import Pagination from "../components/Pagination";

const Home = () => {
  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 5;

  const [isOpen, setIsOpen] = useState(false);

  const [editingCourse, setEditingCourse] = useState(null);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

 

  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  

  useEffect(() => {
    const localData = localStorage.getItem("courses");

    if (localData) {
      setCourses(JSON.parse(localData));
    } else {
      fetchCourses();
    }
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");

      const updatedCourses = res.data.map((course) => ({
        ...course,
        status: Math.random() > 0.5 ? "Completed" : "Pending",
      }));

      setCourses(updatedCourses);

      localStorage.setItem("courses", JSON.stringify(updatedCourses));
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem("courses", JSON.stringify(courses));
    }
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.body.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "All" || course.status === status;

      return matchSearch && matchStatus;
    });
  }, [courses, search, status]);


  const indexOfLastCourse = currentPage * coursesPerPage;

  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse,
  );

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status]);


  const addCourse = (course) => {
    const newCourse = {
      ...course,
      id: Date.now(),
    };

    setCourses([...courses, newCourse]);

    setIsOpen(false);
  };



  const updateCourse = (updatedCourse) => {
    const updated = courses.map((course) =>
      course.id === updatedCourse.id ? updatedCourse : course,
    );

    setCourses(updated);

    setEditingCourse(null);

    setIsOpen(false);
  };



  const deleteCourse = (id) => {
    if (!window.confirm("Delete this course?")) return;

    const updated = courses.filter((course) => course.id !== id);

    setCourses(updated);
  };


  const statuses = ["All", "Completed", "Pending"];

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      <Navbar
        theme={theme}
        setTheme={setTheme}
        openModal={() => {
          setEditingCourse(null);
          setIsOpen(true);
        }}
      />

      <div className="max-w-7xl mx-auto p-6">
     

        <Dashboard courses={courses} />


        <div className="flex flex-col md:flex-row gap-4 my-6">
          <SearchBar search={search} setSearch={setSearch} />

          <Filter status={status} setStatus={setStatus} statuses={statuses} />
        </div>

       

        <CourseTable
          courses={currentCourses}
          onEdit={(course) => {
            setEditingCourse(course);
            setIsOpen(true);
          }}
          onDelete={deleteCourse}
        />

        

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>

    

      {isOpen && (
        <CourseModal
          editingCourse={editingCourse}
          addCourse={addCourse}
          updateCourse={updateCourse}
          closeModal={() => {
            setEditingCourse(null);
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Home;
