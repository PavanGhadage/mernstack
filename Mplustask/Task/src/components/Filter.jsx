const Filter = ({ city, setCity, cities }) => {
  return (
    <div className="w-full md:w-1/3">
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none
                   focus:ring-2 focus:ring-blue-500
                   dark:bg-gray-800 dark:text-white dark:border-gray-600"
      >
        {cities.map((cityName, index) => (
          <option key={index} value={cityName}>
            {cityName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
