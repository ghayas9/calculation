// src/components/FinanceModal.tsx
import React from 'react';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const financeFormSchema = z.object({
  amount: z.number().min(1, 'Amount must be greater than zero'),
  description: z.string().optional(),
  paidBy: z.number().min(1, 'Select who paid'),
  members: z.array(z.number()).min(1, 'Select at least one member'),
});

type FinanceFormInputs = z.infer<typeof financeFormSchema>;

interface FinanceModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: FinanceFormInputs) => void;
  members: { value: number; label: string }[];
  paidByOptions: { value: number; label: string }[];
}

const FinanceModal: React.FC<FinanceModalProps> = ({ show, onClose, onSubmit, members, paidByOptions }) => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<FinanceFormInputs>({
    resolver: zodResolver(financeFormSchema),
  });

  const selectedMembers = watch('members');
  const amount = watch('amount');
  const amountPerMember = selectedMembers?.length ? (amount / selectedMembers.length).toFixed(2) : '0.00';

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative overflow-hidden">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center">Add Financial Details</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Amount Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              {...control.register('amount')}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter amount"
            />
            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              {...control.register('description')}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter description (optional)"
            />
          </div>

          {/* Paid By Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Paid By</label>
            <Controller
              name="paidBy"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={paidByOptions as any}
                  className="mt-1"
                  placeholder="Select who paid"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      borderColor: 'rgb(209 213 219)',
                      boxShadow: 'none',
                      '&:hover': {
                        borderColor: 'rgb(165 180 252)',
                      },
                    }),
                  }}
                />
              )}
            />
            {errors.paidBy && <p className="text-red-500 text-xs mt-1">{errors.paidBy.message}</p>}
          </div>

          {/* Members Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Members</label>
            <Controller
              name="members"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={members as any}
                  className="mt-1"
                  placeholder="Select members"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      borderColor: 'rgb(209 213 219)',
                      boxShadow: 'none',
                      '&:hover': {
                        borderColor: 'rgb(165 180 252)',
                      },
                    }),
                  }}
                />
              )}
            />
            {errors.members && <p className="text-red-500 text-xs mt-1">{errors.members.message}</p>}
          </div>

          {/* Amount Per Member */}
          {selectedMembers && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount Per Member</label>
              <p className="mt-1 text-lg font-medium text-gray-800">${amountPerMember}</p>
            </div>
          )}

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
              Add Financial Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FinanceModal;
