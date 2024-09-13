import React from 'react';
import { Link, useParams } from 'react-router-dom';

interface Member {
  id: number;
  name: string;
}

interface Workspace {
  id: number;
  name: string;
  members: Member[];
}

const workspaces: Workspace[] = [
  { id: 1, name: 'Finance Team', members: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }] },
  { id: 2, name: 'Marketing Group', members: [{ id: 3, name: 'Alice Johnson' }] },
];

const Workspace: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const workspace = workspaces.find((ws) => ws.id === parseInt(id ?? ''));

  if (!workspace) return <div>Workspace not found</div>;

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
        <div className="mt-6">
          <Link
            to={`/workspace/${workspace.id}/invite`}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            Invite Members
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
