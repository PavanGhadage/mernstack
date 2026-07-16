import { FaSearch } from "react-icons/fa";
import Input from "./Input";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="relative w-full md:w-2/3">
      <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />

      <Input
        type="text"
        placeholder="Search by Name, Username or Email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
