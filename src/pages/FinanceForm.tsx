import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../components/modal";

// Zod schema for form validation
const financialFormSchema = z.object({
  amount: z.number().min(1, "Amount must be greater than zero"),
  members: z
    .array(z.object({ value: z.number(), label: z.string() }))
    .min(1, "Select at least one member"),
  description: z.string().optional(),
  paidBy: z.string(),
});

type FinancialFormInputs = z.infer<typeof financialFormSchema>;

const FinancialForm: React.FC = () => {
  const workspaceMembers = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" },
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FinancialFormInputs>({
    resolver: zodResolver(financialFormSchema),
    defaultValues: {
      paidBy: "Himself",
    },
  });

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const onSubmit = (data: FinancialFormInputs) => {
    const amountPerMember = data.amount / data.members.length;
    console.log("Financial Data:", data);
    console.log(`Amount per member: ${amountPerMember}`);
    handleShowModal();
  };

  const memberOptions = workspaceMembers.map((member) => ({
    value: member.id,
    label: member.name,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Financial Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Amount Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            {...register("amount", { valueAsNumber: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter amount"
          />
          {errors.amount && (
            <p className="text-red-500 text-xs">{errors.amount.message}</p>
          )}
        </div>

        {/* Members Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Members
          </label>
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
          {errors.members && (
            <p className="text-red-500 text-xs">{errors.members.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            {...register("description")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter description (optional)"
          />
        </div>

        {/* Paid By Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Paid By
          </label>
          <select
            {...register("paidBy")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="Himself">Himself</option>
            {workspaceMembers.map((member) => (
              <option key={member.id} value={member.name}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
        >
          Add Financial Details
        </button>
      </form>

      {/* Custom Modal */}
      <Modal show={showModal} onClose={handleCloseModal}>
        <div className="space-y-4">
          <p>
            <strong>Amount:</strong> {getValues("amount")}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {getValues("description") || "No description"}
          </p>
          <p>
            <strong>Paid By:</strong> {getValues("paidBy")}
          </p>
          <p>
            <strong>Members:</strong>{" "}
            {getValues("members")
              ?.map((member) => member.label)
              .join(", ")}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default FinancialForm;
