import React from "react";
import { AlertTriangle } from "lucide-react";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
      <AlertTriangle
        className="mx-auto text-red-500 mb-3"
        size={40}
      />

      <h2 className="text-lg font-bold text-red-700">
        Something went wrong
      </h2>

      <p className="text-gray-600 mt-2">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;