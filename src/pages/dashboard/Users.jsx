import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Users, Shield, UserCheck, Search, LogIn } from 'lucide-react';
import { startImpersonation, getUserRole, ROLES, DASHBOARD_PATHS } from '@/lib/role';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:3001';

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/users`);
      setUsers(data);
    } catch (error) {
      toast.error('Failed to load users. Is JSON Server running?');
    } finally {
      setLoading(false);
    }
  };

  const handleImpersonate = (user) => {
    if (getUserRole() !== ROLES.SUPER_ADMIN) {
      toast.error('Only Super Admin can impersonate');
      return;
    }
    
    try {
      const { password, ...userData } = user;
      startImpersonation(userData);
      toast.success(`Now impersonating ${user.firstName} ${user.lastName}`);
      
    [[[]]]
      setTimeout(() => {
        window.location.href = DASHBOARD_PATHS[user.role] || '/';
      }, 500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role) => {
    const colors = {
      super_admin: 'bg-purple-100 text-purple-700',
      admin: 'bg-blue-100 text-blue-700',
      customer: 'bg-emerald-100 text-emerald-700'
    };
    return colors[role] || 'bg-gray-100 text-gray-700';
  };

  const getRoleIcon = (role) => {
    if (role === ROLES.SUPER_ADMIN) return <Shield className="w-3 h-3" />;
    if (role === ROLES.ADMIN) return <UserCheck className="w-3 h-3" />;
    return <Users className="w-3 h-3" />;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">All Users</h1>
        <p className="text-sm text-slate-500 mt-1">Impersonate any user to see their experience</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                      {user.firstName[0]}{user.lastName[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-slate-400">ID: {user.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${getRoleBadge(user.role)}`}>
                    {getRoleIcon(user.role)}
                    {user.role.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                <td className="px-6 py-4 text-right">
                  {user.role !== ROLES.SUPER_ADMIN && (
                    <button
                      onClick={() => handleImpersonate(user)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-semibold hover:bg-purple-700 transition-all"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      Impersonate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}