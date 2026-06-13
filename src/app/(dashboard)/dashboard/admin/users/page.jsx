import React from 'react';
import { getUsersList } from '@/lib/api/users';
import AdminUsersTable from '@/components/Dashboard/Admin/AdminUsersTable';

export default async function AdminUsersPage() {
  const users = await getUsersList();

  return (
    <div className="p-6 max-w-350 mx-auto w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">User Management</h1>
        <p className="text-sm text-neutral-400">
          Review, filter, and manage platform access for all users.
        </p>
      </div>

      <AdminUsersTable initialUsers={users.users} />
    </div>
  );
}