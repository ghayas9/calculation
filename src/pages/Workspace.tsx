import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import FinanceModal from '../components/financemodal';
import InviteModal from '../components/Invitemodal';

interface Member {
  id: number;
  name: string;
}

interface Workspace {
  id: number;
  name: string;
  members: Member[];
  financials: { id: number; amount: number; description: string; paidBy: string }[];
}

const workspaces: Workspace[] = [
  {
    id: 1,
    name: 'Finance Team',
    members: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }],
    financials: [
      { id: 1, amount: 100, description: 'Office Supplies', paidBy: 'John Doe' },
    ],
  },
  {
    id: 2,
    name: 'Marketing Group',
    members: [{ id: 3, name: 'Alice Johnson' }],
    financials: [],
  },
];

const Workspace: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const workspace = workspaces.find((ws) => ws.id === parseInt(id ?? ''));

  const [showFinanceModal, setShowFinanceModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  if (!workspace) return <div>Workspace not found</div>;

  const handleOpenFinanceModal = () => setShowFinanceModal(true);
  const handleCloseFinanceModal = () => setShowFinanceModal(false);

  const handleOpenInviteModal = () => setShowInviteModal(true);
  const handleCloseInviteModal = () => setShowInviteModal(false);

  const handleAddFinance = (data: any) => {
    console.log('Finance added', data);
    handleCloseFinanceModal();
  };

  const handleInviteMember = (email: string) => {
    console.log('Invite sent to', email);
    handleCloseInviteModal();
  };

  const membersOptions = workspace.members.map(member => ({ value: member.id, label: member.name }));
  const paidByOptions = membersOptions;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{workspace.name}</h2>
        <h3 className="text-xl font-semibold mb-2">Members</h3>
        <ul className="space-y-2">
          {workspace.members.map((member) => (
            <li key={member.id} className="text-gray-800">{member.name}</li>
          ))}
        </ul>

        {/* Financial Details List */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Financial Details</h3>
          <ul className="space-y-2">
            {workspace.financials.map((finance) => (
              <li key={finance.id} className="border p-4 rounded-lg shadow-sm">
                <p><strong>Amount:</strong> ${finance.amount}</p>
                <p><strong>Description:</strong> {finance.description}</p>
                <p><strong>Paid By:</strong> {finance.paidBy}</p>
              </li>
            ))}
          </ul>
          <button
            onClick={handleOpenFinanceModal}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 mt-4"
          >
            Add Financial Detail
          </button>
        </div>

        {/* Invite Members Link */}
        <div className="mt-6">
          <button
            onClick={handleOpenInviteModal}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            Invite Members
          </button>
        </div>
      </div>

      {/* Finance Modal */}
      <FinanceModal
        show={showFinanceModal}
        onClose={handleCloseFinanceModal}
        onSubmit={handleAddFinance}
        members={membersOptions}
        paidByOptions={paidByOptions}
      />

      {/* Invite Modal */}
      <InviteModal
        show={showInviteModal}
        onClose={handleCloseInviteModal}
        onSubmit={handleInviteMember}
      />
    </div>
  );
};

export default Workspace;
