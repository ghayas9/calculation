import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod schema for form validation
const financialFormSchema = z.object({
  amount: z.number().min(1, 'Amount must be greater than zero'),
  members: z.array(z.object({ value: z.number(), label: z.string() })).min(1, 'Select at least one member'),
});

type FinancialFormInputs = z.infer<typeof financialFormSchema>;

const FinancialForm: React.FC<{ workspaceMembers: { id: number; name: string }[] }> = ({ workspaceMembers }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<FinancialFormInputs>({
    resolver: zodResolver(financialFormSchema),
  });

  const onSubmit = (data: FinancialFormInputs) => {
    const amountPerMember = data.amount / data.members.length;
    console.log('Financial Data:', data);
    console.log(`Amount per member: ${amountPerMember}`);
  };

  // Prepare workspace members for the select component
  const memberOptions = workspaceMembers.map(member => ({ value: member.id, label: member.name }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Financial Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Amount Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            {...register('amount', { valueAsNumber: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter amount"
          />
          {errors.amount && <p className="text-red-500 text-xs">{errors.amount.message}</p>}
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
                options={memberOptions}
                className="mt-1"
                placeholder="Select members"
              />
            )}
          />
          {errors.members && <p className="text-red-500 text-xs">{errors.members.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
        >
          Add Financial Details
        </button>
      </form>
    </div>
  );
};

export default FinancialForm;
