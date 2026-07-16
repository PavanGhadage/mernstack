import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import StudentTable from "../components/StudentTable";
import StudentModal from "../components/StudentModal";
import Pagination from "../components/Pagination";

const Home = () => {
  const [students, setStudents] = useState([]);

  const [search, setSearch] = useState("");

  const [city, setCity] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 5;

  const [isOpen, setIsOpen] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);

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
    const localData = localStorage.getItem("students");

    if (localData) {
      setStudents(JSON.parse(localData));
    } else {
      fetchStudents();
    }
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");

      setStudents(res.data);

      localStorage.setItem("students", JSON.stringify(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  

  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem("students", JSON.stringify(students));
    }
  }, [students]);

 

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.username.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase());

      const matchCity = city === "All" || student.address.city === city;

      return matchSearch && matchCity;
    });
  }, [students, search, city]);


  const indexOfLastStudent = currentPage * studentsPerPage;

  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);


  const addStudent = (student) => {
    const newStudent = {
      ...student,
      id: Date.now(),
    };

    setStudents([...students, newStudent]);

    setIsOpen(false);
  };

  

  const updateStudent = (updatedStudent) => {
    const updated = students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student,
    );

    setStudents(updated);

    setEditingStudent(null);

    setIsOpen(false);
  };



  const deleteStudent = (id) => {
    if (!window.confirm("Delete this student?")) return;

    const updated = students.filter((student) => student.id !== id);

    setStudents(updated);
  };

  

  const cities = [
    "All",
    ...new Set(students.map((student) => student.address.city)),
  ];
  console.log(students);
  console.log("Filtered Students:", filteredStudents);

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
          setEditingStudent(null);
          setIsOpen(true);
        }}
      />

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <SearchBar search={search} setSearch={setSearch} />

          <Filter city={city} setCity={setCity} cities={cities} />
        </div>

        <StudentTable
          students={currentStudents}
          onEdit={(student) => {
            setEditingStudent(student);
            setIsOpen(true);
          }}
          onDelete={deleteStudent}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {isOpen && (
        <StudentModal
          editingStudent={editingStudent}
          addStudent={addStudent}
          updateStudent={updateStudent}
          closeModal={() => {
            setEditingStudent(null);
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Home;
