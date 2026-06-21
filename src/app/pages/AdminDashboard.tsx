import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Avatar } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useApp } from '../context/AppContext';
import {
  Brain,
  LogOut,
  Bell,
  CheckCircle,
  XCircle,
  FileText,
  GraduationCap,
  Award,
  Users,
  TrendingUp,
  Clock,
  Eye,
  Download,
  UserPlus
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { toast } from 'sonner';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout, pendingResearchers, approveResearcher, rejectResearcher, researchers, createStaffAccount, deleteUser } = useApp();
  const [selectedResearcher, setSelectedResearcher] = useState<string | null>(null);
  const [showCreateStaff, setShowCreateStaff] = useState(false);
  const [activeTab, setActiveTab] = useState<'accreditations' | 'users'>('accreditations');
  const [staffForm, setStaffForm] = useState({
    name: '',
    email: '',
    role: 'partner' as 'partner' | 'manager',
    institution: '',
    department: ''
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleApprove = (id: string) => {
    approveResearcher(id);
    toast.success('Researcher approved successfully!');
    setSelectedResearcher(null);
  };

  const handleReject = (id: string) => {
    rejectResearcher(id);
    toast.error('Application rejected');
    setSelectedResearcher(null);
  };

  const selectedProfile = pendingResearchers.find(r => r.id === selectedResearcher);

  const handleDeleteUser = (userId: string, userName: string) => {
    if (window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      deleteUser(userId);
      toast.success(`${userName} has been deleted`);
    }
  };

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    createStaffAccount(staffForm);
    toast.success(`${staffForm.role === 'partner' ? 'Partner' : 'Research Manager'} account created successfully!`);
    setShowCreateStaff(false);
    setStaffForm({
      name: '',
      email: '',
      role: 'partner',
      institution: '',
      department: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#F2F3F5]">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#1A3C34] rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-xl text-[#1A3C34]">
                  Research IQ Admin
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                {pendingResearchers.length > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    {pendingResearchers.length}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <Avatar className="w-10 h-10 bg-[#1A3C34] flex items-center justify-center text-white font-bold">
                  A
                </Avatar>
                <div className="text-left">
                  <div className="font-medium text-sm">{user.name}</div>
                  <div className="text-xs text-gray-500">Administrator</div>
                </div>
              </div>

              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Institutional Administration</h1>
          <p className="text-gray-600">Manage accreditations and user accounts</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('accreditations')}
            className={`pb-3 px-2 font-medium transition-all ${
              activeTab === 'accreditations'
                ? 'text-[#1A3C34] border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Accreditations ({pendingResearchers.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 px-2 font-medium transition-all ${
              activeTab === 'users'
                ? 'text-[#1A3C34] border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Manage Users ({researchers.length})
          </button>
        </div>

        {/* Quick Actions */}
        {activeTab === 'users' && (
          <div className="flex gap-4 mb-8">
            <Button
              className="bg-[#1A3C34] hover:bg-[#15302a]"
              onClick={() => setShowCreateStaff(true)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Create Partner/Manager Account
            </Button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{pendingResearchers.length}</div>
            <div className="text-sm text-gray-600 mb-2">Pending Applications</div>
            <div className="text-xs text-yellow-600 font-medium">Requires review</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-lime-100 rounded-lg text-[#16a34a]">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{researchers.length}</div>
            <div className="text-sm text-gray-600 mb-2">Accredited Researchers</div>
            <div className="text-xs text-[#16a34a] font-medium">+2 this week</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#E8F5E9] rounded-lg text-[#1A3C34]">
                <FileText className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">5,234</div>
            <div className="text-sm text-gray-600 mb-2">Total Publications</div>
            <div className="text-xs text-[#1A3C34] font-medium">+156 this month</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-lime-100 rounded-lg text-[#16a34a]">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">95%</div>
            <div className="text-sm text-gray-600 mb-2">Approval Rate</div>
            <div className="text-xs text-[#16a34a] font-medium">Last 30 days</div>
          </Card>
        </div>

        {/* Tab Content */}
        {activeTab === 'accreditations' && (
          <>
            {/* Pending Applications */}
            <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Pending Accreditation Applications</h2>
            <p className="text-gray-600">
              Review applications to verify researcher credentials and accreditation requirements
            </p>
          </div>

          {pendingResearchers.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">All caught up!</h3>
              <p className="text-gray-600">No pending applications at the moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingResearchers.map(researcher => (
                <div
                  key={researcher.id}
                  className="border border-gray-200 rounded-lg p-6 hover:border-[#1A3C34]/30 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-6">
                    <Avatar className="w-16 h-16 bg-[#1A3C34] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                      {researcher.name.charAt(0)}
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{researcher.name}</h3>
                          <p className="text-gray-600 mb-2">{researcher.email}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <GraduationCap className="w-4 h-4" />
                              {researcher.institution}
                            </span>
                            <span>•</span>
                            <span>{researcher.department}</span>
                            <span>•</span>
                            <span>ORCID: {researcher.orcid}</span>
                          </div>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-700">
                          Submitted {researcher.submittedDate}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-[#F0FDF4] p-4 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">Highest Degree</div>
                          <div className="font-bold text-[#1A3C34]">{researcher.degree.toUpperCase()}</div>
                        </div>
                        <div className="bg-lime-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">Experience</div>
                          <div className="font-bold text-[#16a34a]">{researcher.experience} years</div>
                        </div>
                        <div className="bg-[#F0FDF4] p-4 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">Publications</div>
                          <div className="font-bold text-[#1A3C34]">{researcher.publications.length}</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-600 mb-2">Research Expertise</div>
                        <div className="flex flex-wrap gap-2">
                          {researcher.expertise.map(exp => (
                            <Badge key={exp} variant="secondary">
                              {exp}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Accreditation Check */}
                      <div className="bg-lime-50 border border-lime-300 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-[#16a34a] mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-green-900 mb-1">Accreditation Requirements Met</div>
                            <div className="text-sm text-green-800">
                              ✓ {researcher.degree === 'phd' ? 'PhD degree with quantitative background' :
                                 researcher.experience >= 3 ? `${researcher.experience} years of research experience (≥3 required)` :
                                 'Meets educational requirements'}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedResearcher(researcher.id)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Full Details
                        </Button>
                        <Button
                          size="sm"
                          className="bg-lime-500 hover:bg-green-700 text-white"
                          onClick={() => handleApprove(researcher.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(researcher.id)}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Recently Approved */}
        <Card className="p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">Recently Approved Researchers</h2>
          <div className="grid grid-cols-3 gap-4">
            {researchers.slice(0, 6).map(researcher => (
              <div
                key={researcher.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-[#1A3C34]/30 transition-all cursor-pointer"
                onClick={() => navigate(`/researcher/profile/${researcher.id}`)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-12 h-12 bg-[#1A3C34] flex items-center justify-center text-white font-bold">
                    {researcher.name.charAt(0)}
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm truncate">{researcher.name}</div>
                    <div className="text-xs text-gray-500 truncate">{researcher.department}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">{researcher.publications} pubs</span>
                  <Badge className="bg-lime-100 text-[#15803d] text-xs">Verified</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
          </>
        )}

        {/* Manage Users Tab */}
        {activeTab === 'users' && (
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">User Management</h2>
              <p className="text-gray-600">View and manage all platform users</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Stats
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {researchers.map(researcher => (
                    <tr key={researcher.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 bg-[#1A3C34] flex items-center justify-center text-white font-bold">
                            {researcher.name.charAt(0)}
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900">{researcher.name}</div>
                            <div className="text-sm text-gray-500">{researcher.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={
                          researcher.role === 'researcher' ? 'bg-[#E8F5E9] text-[#1A3C34]' :
                          researcher.role === 'partner' ? 'bg-lime-100 text-[#15803d]' :
                          researcher.role === 'manager' ? 'bg-purple-100 text-purple-700' :
                          'bg-gray-100 text-gray-700'
                        }>
                          {researcher.role}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{researcher.department || '-'}</div>
                        <div className="text-xs text-gray-500">{researcher.institution}</div>
                      </td>
                      <td className="px-6 py-4">
                        {researcher.role === 'researcher' ? (
                          <div className="flex gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Pubs:</span> <strong>{researcher.publications}</strong>
                            </div>
                            <div>
                              <span className="text-gray-500">Cites:</span> <strong>{researcher.citations}</strong>
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={
                          researcher.accredited ? 'bg-lime-100 text-[#15803d]' : 'bg-yellow-100 text-yellow-700'
                        }>
                          {researcher.accredited ? 'Accredited' : 'Pending'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/researcher/profile/${researcher.id}`)}
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteUser(researcher.id, researcher.name)}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedResearcher} onOpenChange={() => setSelectedResearcher(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedProfile && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Application Details</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-20 h-20 bg-[#1A3C34] flex items-center justify-center text-white font-bold text-3xl">
                    {selectedProfile.name.charAt(0)}
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">{selectedProfile.name}</h3>
                    <p className="text-gray-600 mb-2">{selectedProfile.email}</p>
                    <div className="flex items-center gap-2">
                      <Badge>ORCID: {selectedProfile.orcid}</Badge>
                      <Badge variant="secondary">{selectedProfile.institution}</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-3">Educational Background</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="whitespace-pre-line">{selectedProfile.education}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-3">Research Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfile.expertise.map(exp => (
                      <Badge key={exp} variant="secondary" className="text-sm">
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-3">Publications ({selectedProfile.publications.length})</h4>
                  <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                    <ol className="list-decimal list-inside space-y-2">
                      {selectedProfile.publications.map((pub, idx) => (
                        <li key={idx} className="text-sm">{pub}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-3">CV / Resume</h4>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download {selectedProfile.cv}
                  </Button>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    className="flex-1 bg-lime-500 hover:bg-green-700"
                    onClick={() => handleApprove(selectedProfile.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Application
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleReject(selectedProfile.id)}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Application
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Staff Account Dialog */}
      <Dialog open={showCreateStaff} onOpenChange={setShowCreateStaff}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Create Partner/Manager Account</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateStaff} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="staffName">Full Name *</Label>
                <Input
                  id="staffName"
                  value={staffForm.name}
                  onChange={(e) => setStaffForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <Label htmlFor="staffEmail">Email Address *</Label>
                <Input
                  id="staffEmail"
                  type="email"
                  value={staffForm.email}
                  onChange={(e) => setStaffForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john.doe@organization.com"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="staffRole">Account Type *</Label>
              <Select
                value={staffForm.role}
                onValueChange={(value: any) => setStaffForm(prev => ({ ...prev, role: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="partner">Funding Partner</SelectItem>
                  <SelectItem value="manager">Research Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="staffInstitution">Organization *</Label>
                <Input
                  id="staffInstitution"
                  value={staffForm.institution}
                  onChange={(e) => setStaffForm(prev => ({ ...prev, institution: e.target.value }))}
                  placeholder="e.g., Innovation Fund, Tech University"
                  required
                />
              </div>

              <div>
                <Label htmlFor="staffDepartment">Department</Label>
                <Input
                  id="staffDepartment"
                  value={staffForm.department}
                  onChange={(e) => setStaffForm(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="e.g., Research Office"
                />
              </div>
            </div>

            <div className="bg-[#F0FDF4] border border-[#1A3C34]/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#1A3C34] mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">Account Credentials</p>
                  <p>The user will receive an email with login credentials and instructions to set up their account. Default password: <strong>Change@123</strong></p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setShowCreateStaff(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#1A3C34] hover:bg-[#15302a]"
              >
                Create Account
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
