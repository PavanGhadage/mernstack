const Filter = ({ status, setStatus, statuses }) => {
  return (
    <div className="w-full md:w-1/3">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none
        focus:ring-2 focus:ring-blue-500
        dark:bg-gray-800 dark:text-white dark:border-gray-600"
      >
        {statuses.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
