// src/components/FinanceModal.tsx
import React from 'react';

interface FinanceModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onSubmit: () => void;
}

const FinanceModal: React.FC<FinanceModalProps> = ({ show, onClose, onConfirm, onSubmit }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Add Financial Details</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Amount Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter description (optional)"
            />
          </div>

          {/* Paid By Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Paid By</label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="Himself">Himself</option>
              {/* Add more options dynamically */}
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
              onClick={onConfirm}
            >
              Add Financial Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FinanceModal;
