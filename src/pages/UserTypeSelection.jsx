import React from "react";
import { useNavigate } from "react-router-dom";

const UserTypeSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        {/* Remove or comment out this button to remove the white box */}
        {/* <button
          className="absolute top-6 right-6 text-3xl text-gray-500 hover:text-gray-700"
          onClick={() => navigate("/")}
        >
          ✕
        </button> */}

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">SIGN UP</h1>
        <p className="text-lg font-bold text-gray-800">CHOOSE YOUR ACCOUNT TYPE</p>
        <p className="text-md text-gray-500 mb-6 text-center max-w-md">
          Empowering students, college coaches, and high school coaches to connect.
        </p>

        {/* User Type Options */}
        <div className="w-full flex flex-col space-y-4">
          <button
            className="flex items-center w-full p-5 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition"
            onClick={() => navigate("/signup/player")}
          >
            <span className="text-3xl p-3 bg-white border border-gray-300 rounded-lg mr-4">🎮</span>
            <div className="text-left">
              <h2 className="text-lg font-bold text-gray-900">PLAYER</h2>
              <p className="text-sm text-gray-600">
                I am a player looking to find an esports scholarship and related opportunities.
              </p>
            </div>
          </button>

          <button
            className="flex items-center w-full p-5 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition"
            onClick={() => navigate("/signup/coach")}
          >
            <span className="text-3xl p-3 bg-white border border-gray-300 rounded-lg mr-4">🎓</span>
            <div className="text-left">
              <h2 className="text-lg font-bold text-gray-900">COLLEGE</h2>
              <p className="text-sm text-gray-600">
                I am a college coach, director, or administrator looking to make finding players easier.
              </p>
            </div>
          </button>

          <button
            className="flex items-center w-full p-5 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition"
            onClick={() => navigate("/signup/coach")}
          >
            <span className="text-3xl p-3 bg-white border border-gray-300 rounded-lg mr-4">🏫</span>
            <div className="text-left">
              <h2 className="text-lg font-bold text-gray-900">HIGH SCHOOL</h2>
              <p className="text-sm text-gray-600">
                I am a high school coach, teacher, or administrator looking to help my students find esports opportunities.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;
