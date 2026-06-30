import React from "react";
import { Inbox } from "lucide-react";

const EmptyState = ({
  title,
  message,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">
      <Inbox
        className="mx-auto text-gray-400 mb-4"
        size={48}
      />

      <h2 className="text-xl font-bold text-gray-700">
        {title}
      </h2>

      <p className="text-gray-500 mt-2">
        {message}
      </p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;