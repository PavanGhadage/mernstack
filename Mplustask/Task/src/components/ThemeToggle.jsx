import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-xl p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;
