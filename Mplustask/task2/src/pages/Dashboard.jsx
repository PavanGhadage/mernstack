const Dashboard = ({ courses }) => {
  const totalCourses = courses.length;

  const completedCourses = courses.filter(
    (course) => course.status === "Completed",
  ).length;

  const pendingCourses = courses.filter(
    (course) => course.status === "Pending",
  ).length;

  const cards = [
    {
      title: "Total Courses",
      value: totalCourses,
      color: "bg-blue-500",
    },
    {
      title: "Completed Courses",
      value: completedCourses,
      color: "bg-green-500",
    },
    {
      title: "Pending Courses",
      value: pendingCourses,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} text-white rounded-xl shadow-lg p-6`}
        >
          <h2 className="text-lg font-semibold">{card.title}</h2>

          <p className="text-4xl font-bold mt-4">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
