import React from 'react';
import { Link } from 'react-router-dom';

interface Workspace {
  id: number;
  name: string;
  members: number;
}

const workspaces: Workspace[] = [
  { id: 1, name: 'Finance Team', members: 10 },
  { id: 2, name: 'Marketing Group', members: 5 },
  { id: 3, name: 'Development Squad', members: 8 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Workspaces</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaces.map((workspace) => (
              <div key={workspace.id} className="p-6 bg-gray-50 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900">{workspace.name}</h3>
                <p className="text-sm text-gray-600">{workspace.members} members</p>
                <Link
                  to={`/workspace/${workspace.id}`}
                  className="mt-4 inline-block text-indigo-600 hover:text-indigo-500"
                >
                  View Workspace
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/create-workspace"
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
            >
              Create New Workspace
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
