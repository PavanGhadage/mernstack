import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import Button from "./Button";

const Navbar = ({ theme, setTheme, openModal }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
  
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Student Management System</h1>

        <div className="flex items-center gap-3">
          <Button
            onClick={openModal}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            + Add Student
          </Button>

          <ThemeToggle theme={theme} setTheme={setTheme} />

          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
