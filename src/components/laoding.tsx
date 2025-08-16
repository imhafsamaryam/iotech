import React from "react";
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#4D2617]">
      <svg
        className="animate-spin h-4 w-4 text-white mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"
        ></path>
      </svg>
    </div>
  );
}
