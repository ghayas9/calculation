// src/components/InviteModal.tsx
import React from 'react';
import { useForm } from 'react-hook-form';

interface InviteModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

const InviteModal: React.FC<InviteModalProps> = ({ show, onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<{ email: string }>();

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
        <h2 className="text-xl font-semibold mb-4">Invite Members</h2>
        <form
          onSubmit={handleSubmit(({ email }) => {
            onSubmit(email);
            onClose();
          })}
          className="space-y-4"
        >
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter member's email"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
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
            >
              Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteModal;
