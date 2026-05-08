import React from "react";

function Tailwindpr() {
  return (
    <>
      <div className="h-screen bg-blue-500 flex justify-center items-center">
        <div className="bg-white p-10 rounded-xl shadow-2xl text-center">
          <h1 className="text-5xl font-bold text-red-500 mb-4">
            TailwindCSS Working
          </h1>

          <p className="text-gray-700 text-xl">
            React + Tailwind is connected successfully 🚀
          </p>

          <button className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
            Click Me
          </button>
        </div>
      </div>
    </>
  );
}

export default Tailwindpr;
