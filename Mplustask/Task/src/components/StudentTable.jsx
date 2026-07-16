import { FaEdit, FaTrash } from "react-icons/fa";

const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <table className="min-w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Username</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">City</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr
                key={student.id}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                  {student.id}
                </td>

                <td className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  {student.name}
                </td>

                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                  {student.username}
                </td>

                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                  {student.email}
                </td>

                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                  {student.phone}
                </td>

                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                  {student.address.city}
                </td>

                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(student)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onDelete(student.id)}
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
              <td
                colSpan="7"
                className="text-center py-6 text-gray-500 dark:text-gray-300"
              >
                No Students Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
