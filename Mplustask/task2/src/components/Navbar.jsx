import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import Button from "./Button";

const Navbar = ({ theme, setTheme, openModal }) => {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser1"));

  const handleLogout = () => {
    
    localStorage.removeItem("currentUser1");

    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">Student Course Portal</h1>

          <p className="text-sm text-blue-100">Welcome, {currentUser?.name}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={openModal}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            + Add Course
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
