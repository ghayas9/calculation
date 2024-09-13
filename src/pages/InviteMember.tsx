import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod schema for form validation
const inviteMemberSchema = z.object({
  email: z.string().email('Invalid email'),
});

type InviteMemberFormInputs = z.infer<typeof inviteMemberSchema>;

const InviteMember: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<InviteMemberFormInputs>({
    resolver: zodResolver(inviteMemberSchema),
  });

  const onSubmit = (data: InviteMemberFormInputs) => {
    console.log('Inviting member:', data);
    // Handle member invitation (send email invite)
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Invite Member</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter member's email"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            Send Invitation
          </button>
        </form>
      </div>
    </div>
  );
};

export default InviteMember;
