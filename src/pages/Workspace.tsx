// src/pages/Workspace.tsx
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
  financials: { id: number; amount: number; description: string; paidBy: string; memberShares: { [memberId: number]: number } }[];
}

const workspaces: Workspace[] = [
  {
    id: 1,
    name: 'Finance Team',
    members: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }],
    financials: [
      { id: 1, amount: 100, description: 'Office Supplies', paidBy: 'John Doe', memberShares: { 1: 50, 2: 50 } },
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

  if (!workspace) return <div className="min-h-screen flex items-center justify-center">Workspace not found</div>;

  const handleOpenFinanceModal = () => setShowFinanceModal(true);
  const handleCloseFinanceModal = () => setShowFinanceModal(false);

  const handleOpenInviteModal = () => setShowInviteModal(true);
  const handleCloseInviteModal = () => setShowInviteModal(false);

  const handleAddFinance = (data: any) => {
    const memberShares = data.members.reduce((acc: { [key: number]: number }, memberId: number) => {
      acc[memberId] = (data.amount / data.members.length);
      return acc;
    }, {});

    console.log('Finance added', { ...data, memberShares });
    handleCloseFinanceModal();
  };

  const handleInviteMember = (email: string) => {
    console.log('Invite sent to', email);
    handleCloseInviteModal();
  };

  const membersOptions = workspace.members.map(member => ({ value: member.id, label: member.name }));
  const paidByOptions = membersOptions;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h2 className="text-3xl font-bold mb-4">{workspace.name}</h2>
        <div className="bg-gray-200 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Members</h3>
          <ul className="list-disc list-inside space-y-2">
            {workspace.members.map((member) => (
              <li key={member.id} className="text-gray-800">{member.name}</li>
            ))}
          </ul>
        </div>

        {/* Financial Details List */}
        <div className="bg-gray-200 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Financial Details</h3>
          <ul className="space-y-4">
            {workspace.financials.map((finance) => (
              <li key={finance.id} className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
                <p className="font-medium">Amount: <span className="font-normal">${finance.amount}</span></p>
                <p className="font-medium">Description: <span className="font-normal">{finance.description}</span></p>
                <p className="font-medium">Paid By: <span className="font-normal">{finance.paidBy}</span></p>
                <p className="font-medium mt-2">Members and Their Shares:</p>
                <ul className="list-disc list-inside space-y-1">
                  {Object.keys(finance.memberShares).map(memberId => (
                    <li key={memberId}>
                      {workspace.members.find(member => member.id === parseInt(memberId))?.name}: ${finance.memberShares[parseInt(memberId)]}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <button
            onClick={handleOpenFinanceModal}
            className="mt-4 bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700"
          >
            Add Financial Detail
          </button>
        </div>

        {/* Invite Members Button */}
        <button
          onClick={handleOpenInviteModal}
          className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700"
        >
          Invite Members
        </button>
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
