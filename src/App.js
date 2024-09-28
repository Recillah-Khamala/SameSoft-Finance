import React from "react";
// import { useSelector, useDispatch } from 'react-redux'; // Uncomment when you need to use Redux state or actions

/**
 * App Component
 * 
 * This is the main component of the SameSoft Finance application.
 * It renders a welcome page with a stylized layout using Tailwind CSS classes.
 * State management is handled by Redux (not shown in this component).
 * 
 * @returns {JSX.Element} The rendered App component
 */
function App() {
  // const dispatch = useDispatch();
  // const someState = useSelector(state => state.someValue);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      {/* Main container with gradient background */}
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        {/* Decorative skewed background */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        {/* Content container */}
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              {/* Welcome message */}
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p className="text-2xl font-bold">
                  Welcome to SameSoft Finance
                </p>
                <p>Your financial management solution</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
