import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Avatar } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { useApp } from '../context/AppContext';
import { Brain, ArrowLeft, Shield, Users, Key, Lock, Eye } from 'lucide-react';

export function UserAccessManagement() {
  const navigate = useNavigate();
  const { user, researchers } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const filteredUsers = researchers.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F2F3F5]">
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1A3C34] rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl">User & Access Management</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/manager/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User & Access Management</h1>
          <p className="text-gray-600">Control roles, access scopes, and maintain platform security integrity</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#E8F5E9] rounded-lg">
                <Users className="w-6 h-6 text-[#1A3C34]" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{researchers.length}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-lime-100 rounded-lg">
                <Shield className="w-6 h-6 text-[#16a34a]" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{researchers.filter(r => r.accredited).length}</div>
            <div className="text-sm text-gray-600">Accredited</div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Key className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">5</div>
            <div className="text-sm text-gray-600">Access Roles</div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Lock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">18</div>
            <div className="text-sm text-gray-600">Permissions</div>
          </Card>
        </div>

        {/* Search */}
        <Card className="p-4 mb-6">
          <Input
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Card>

        {/* Users Table */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">User Directory</h2>
            <Button className="bg-[#1A3C34]">
              Manage Roles & Permissions
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Access Level</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map(researcher => (
                  <tr key={researcher.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 bg-[#1A3C34] flex items-center justify-center text-white font-bold">
                          {researcher.name.charAt(0)}
                        </Avatar>
                        <div>
                          <div className="font-medium">{researcher.name}</div>
                          <div className="text-sm text-gray-500">{researcher.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-[#E8F5E9] text-[#1A3C34]">{researcher.role}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm">{researcher.department}</td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary">Full Access</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={researcher.accredited ? 'bg-lime-100 text-[#15803d]' : 'bg-yellow-100 text-yellow-700'}>
                        {researcher.accredited ? 'Active' : 'Pending'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Access Roles */}
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-bold mb-6">Access Roles & Permissions</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">Researcher</h3>
                <Badge className="bg-[#E8F5E9] text-[#1A3C34]">{researchers.filter(r => r.role === 'researcher').length} users</Badge>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Upload research</li>
                <li>✓ Find collaborators</li>
                <li>✓ View trends & funding</li>
                <li>✓ Profile management</li>
              </ul>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">Research Manager</h3>
                <Badge className="bg-purple-100 text-purple-700">{researchers.filter(r => r.role === 'manager').length} users</Badge>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ All researcher permissions</li>
                <li>✓ Analytics & reporting</li>
                <li>✓ User management</li>
                <li>✓ Data integration</li>
              </ul>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">Funding Partner</h3>
                <Badge className="bg-lime-100 text-[#15803d]">{researchers.filter(r => r.role === 'partner').length} users</Badge>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Browse research projects</li>
                <li>✓ Fund projects</li>
                <li>✓ View analytics</li>
                <li>✗ Upload research</li>
              </ul>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">Administrator</h3>
                <Badge className="bg-red-100 text-red-700">1 user</Badge>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Full system access</li>
                <li>✓ User accreditation</li>
                <li>✓ Create staff accounts</li>
                <li>✓ System configuration</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
