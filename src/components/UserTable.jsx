import { format } from "date-fns";

export default function UserTable({ users }) {
  if (!users || users.length === 0)
    return <p className="text-gray-400 text-sm">No users found.</p>;

  return (
    <div className="overflow-x-auto border border-white/10 rounded-lg">
      <table className="min-w-full text-sm text-white">
        <thead className="bg-[#25243a] border-b border-white/10">
          <tr>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Email</th>
            <th className="text-left p-3">Role</th>
            <th className="text-left p-3">Team</th>
            <th className="text-left p-3">Joined</th>
          </tr>
        </thead>
        <tbody className="bg-[#1e1e2f]">
          {users.map((user) => (
            <tr key={user.id} className="border-b border-white/5">
              <td className="p-3 font-medium">{user.name}</td>
              <td className="p-3 text-gray-400">{user.email}</td>
              <td className="p-3 capitalize">{user.role}</td>
              <td className="p-3">{user.team?.name || "Unassigned"}</td>
              <td className="p-3 text-gray-500">
                {format(new Date(user.createdAt), "MMM d, yyyy")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
