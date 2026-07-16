import { FaEdit, FaTrash } from "react-icons/fa";

const CourseTable = ({ courses, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <table className="min-w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-gray-700 dark:text-gray-200">ID</th>
            <th className="px-4 py-3 text-gray-700 dark:text-gray-200">
              Course Name
            </th>
            <th className="px-4 py-3 text-gray-700 dark:text-gray-200">
              Description
            </th>
            <th className="px-4 py-3 text-gray-700 dark:text-gray-200">
              Status
            </th>
            <th className="px-4 py-3 text-gray-700 dark:text-gray-200">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr
                key={course.id}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-3 text-center">{course.id}</td>

                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                  {course.title}
                </td>

                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                  {course.body.length > 50
                    ? course.body.substring(0, 50) + "..."
                    : course.body}
                </td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      course.status === "Completed"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {course.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(course)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onDelete(course.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-5 text-gray-500">
                No Courses Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
