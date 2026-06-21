import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Avatar } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { DataFreshness } from '../components/DataFreshness';
import { SystemAnnouncements } from '../components/SystemAnnouncements';
import { DepartmentSelector } from '../components/DepartmentSelector';
import { useApp } from '../context/AppContext';
import {
  Brain,
  LogOut,
  BarChart3,
  Users,
  TrendingUp,
  Award,
  FileText,
  DollarSign,
  Search,
  Download,
  UserPlus,
  Shield,
  Database,
  Zap,
  Target,
  Network as NetworkIcon
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const activeProjects = [
  { name: 'AI Healthcare Initiative', lead: 'Dr. Sarah Chen', progress: 75, budget: '$450K', status: 'On Track' },
  { name: 'Quantum Computing Research', lead: 'Dr. Ahmed Hassan', progress: 60, budget: '$890K', status: 'On Track' },
  { name: 'Climate Modeling Project', lead: 'Dr. Maria Rodriguez', progress: 45, budget: '$320K', status: 'At Risk' },
  { name: 'Genomics Data Platform', lead: 'Prof. James Mitchell', progress: 85, budget: '$560K', status: 'Ahead' },
];

const departmentData = [
  { department: 'Computer Science', count: 42 },
  { department: 'Biotechnology', count: 28 },
  { department: 'Physics', count: 18 },
  { department: 'Environmental Science', count: 15 },
];

const publicationTrend = [
  { month: 'Jan', pubs: 45 },
  { month: 'Feb', pubs: 52 },
  { month: 'Mar', pubs: 48 },
  { month: 'Apr', pubs: 61 },
  { month: 'May', pubs: 68 },
];

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

export function ResearchManagerDashboard() {
  const navigate = useNavigate();
  const { user, logout, researchers, research } = useApp();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const sections = [
    { id: 'dashboard', label: 'Research Dashboard', icon: BarChart3 },
    { id: 'projects', label: 'Active Projects', icon: FileText },
    { id: 'faculty', label: 'Data Profile', icon: Users },
    { id: 'analytics', label: 'Analytics Overview', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-[#F2F3F5]">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1A3C34] rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-[#1A3C34]">
              ResearchIQ
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l">
              <Avatar className="w-10 h-10 bg-[#1A3C34] flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </Avatar>
              <div>
                <div className="font-medium text-sm">{user.name}</div>
                <div className="text-xs text-gray-500">Research Manager</div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => { logout(); navigate('/'); }}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-[73px] self-start">
          <div className="p-4">
            <div className="space-y-1">
              {sections.map(section => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                      isActive
                        ? 'bg-[#1A3C34] text-white font-medium rounded-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {section.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t">
              <div className="text-xs font-semibold text-gray-500 mb-3 px-3">SYSTEM</div>
              <div className="space-y-1">
                <button
                  onClick={() => navigate('/data-integration')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Database className="w-5 h-5" />
                  Data Integration
                </button>
                <button
                  onClick={() => navigate('/expertise-map')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Target className="w-5 h-5" />
                  Expertise Mapping
                </button>
                <button
                  onClick={() => navigate('/network')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
                >
                  <NetworkIcon className="w-5 h-5" />
                  Collaboration Network
                </button>
                <button
                  onClick={() => navigate('/user-access-management')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Shield className="w-5 h-5" />
                  User & Access Management
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeSection === 'dashboard' && (
            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold">Research Dashboard</h1>
                  <div className="flex items-center gap-4">
                    <DepartmentSelector
                      value={selectedDepartment}
                      onChange={setSelectedDepartment}
                      showAllOption={true}
                    />
                    <DataFreshness lastUpdated={new Date()} variant="compact" />
                  </div>
                </div>
                <p className="text-gray-600">Overview of institutional research activities and performance</p>
              </div>

              {/* System Announcements */}
              <div className="mb-6">
                <SystemAnnouncements limit={1} />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-6 mb-8">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#E8F5E9] rounded-lg">
                      <Users className="w-6 h-6 text-[#1A3C34]" />
                    </div>
                    <Badge className="bg-[#E8F5E9] text-[#1A3C34]">+12%</Badge>
                  </div>
                  <div className="text-3xl font-bold mb-1">{researchers.length}</div>
                  <div className="text-sm text-gray-600">Active Researchers</div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-lime-100 rounded-lg">
                      <FileText className="w-6 h-6 text-[#16a34a]" />
                    </div>
                    <Badge className="bg-lime-100 text-[#15803d]">+8%</Badge>
                  </div>
                  <div className="text-3xl font-bold mb-1">{research.length}</div>
                  <div className="text-sm text-gray-600">Publications</div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <DollarSign className="w-6 h-6 text-purple-600" />
                    </div>
                    <Badge className="bg-purple-100 text-purple-700">+15%</Badge>
                  </div>
                  <div className="text-3xl font-bold mb-1">$14.5M</div>
                  <div className="text-sm text-gray-600">Total Funding</div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>
                    <Badge className="bg-lime-100 text-[#15803d]">94%</Badge>
                  </div>
                  <div className="text-3xl font-bold mb-1">89</div>
                  <div className="text-sm text-gray-600">Impact Score</div>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {/* Publication Trend */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4">Publication Trend</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={publicationTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="pubs" stroke="#84CC16" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>

                {/* Department Distribution */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4">Department Distribution</h3>
                  <div className="flex items-center gap-6">
                    <ResponsiveContainer width="50%" height={200}>
                      <PieChart>
                        <Pie
                          data={departmentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {departmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex-1 space-y-2">
                      {departmentData.map((dept, index) => (
                        <div key={dept.department} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span>{dept.department}</span>
                          </div>
                          <Badge variant="secondary">{dept.count}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-3 gap-4">
                  <button className="p-4 bg-[#F0FDF4] hover:bg-[#E8F5E9] rounded-lg text-left transition-all">
                    <UserPlus className="w-6 h-6 text-[#1A3C34] mb-2" />
                    <div className="font-medium">Invite New Member</div>
                    <div className="text-xs text-gray-600">Add researchers to platform</div>
                  </button>
                  <button className="p-4 bg-lime-50 hover:bg-lime-100 rounded-lg text-left transition-all">
                    <FileText className="w-6 h-6 text-[#16a34a] mb-2" />
                    <div className="font-medium">Export Directory</div>
                    <div className="text-xs text-gray-600">Download faculty data (Excel, PDF)</div>
                  </button>
                  <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-all">
                    <BarChart3 className="w-6 h-6 text-purple-600 mb-2" />
                    <div className="font-medium">Generate Report</div>
                    <div className="text-xs text-gray-600">Create custom analytics report</div>
                  </button>
                </div>
              </Card>
            </div>
          )}

          {activeSection === 'projects' && (
            <div>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Active Projects</h1>
                  <p className="text-gray-600">Monitor ongoing research projects and their progress</p>
                </div>
                <Button className="bg-[#1A3C34]">
                  + New Project
                </Button>
              </div>

              <div className="grid gap-6">
                {activeProjects.map(project => (
                  <Card key={project.name} className="p-6 hover:shadow-sm transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Lead: {project.lead}</span>
                          <span>•</span>
                          <span>Budget: {project.budget}</span>
                        </div>
                      </div>
                      <Badge className={
                        project.status === 'Ahead' ? 'bg-lime-100 text-[#15803d]' :
                        project.status === 'At Risk' ? 'bg-red-100 text-red-700' :
                        'bg-[#E8F5E9] text-[#1A3C34]'
                      }>
                        {project.status}
                      </Badge>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-bold">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            project.status === 'Ahead' ? 'bg-lime-500' :
                            project.status === 'At Risk' ? 'bg-red-600' :
                            'bg-[#1A3C34]'
                          }`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm" variant="outline">Team</Button>
                      <Button size="sm" variant="outline">Reports</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'faculty' && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Faculty & Staff Directory</h1>
                <p className="text-gray-600">View and manage all researchers and staff members</p>
              </div>

              <Card className="p-6 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input placeholder="Search members, roles, or researchers..." className="pl-10" />
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-6">
                {researchers.slice(0, 6).map(researcher => (
                  <Card key={researcher.id} className="p-6 hover:shadow-sm transition-all">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="w-16 h-16 bg-[#1A3C34] flex items-center justify-center text-white font-bold text-2xl">
                        {researcher.name.charAt(0)}
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{researcher.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{researcher.department} • {researcher.institution}</p>
                        <Badge className="bg-lime-100 text-[#15803d] text-xs">Accredited</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#1A3C34]">{researcher.publications}</div>
                        <div className="text-xs text-gray-500">Publications</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#16a34a]">{researcher.citations}</div>
                        <div className="text-xs text-gray-500">Citations</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#1A3C34]">{researcher.hIndex}</div>
                        <div className="text-xs text-gray-500">h-index</div>
                      </div>
                    </div>

                    <Button size="sm" variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'analytics' && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Analytics Overview</h1>
                <p className="text-gray-600">Comprehensive research performance analytics and insights</p>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <Card className="p-6 bg-[#F0FDF4]">
                  <div className="text-4xl font-bold text-[#1A3C34] mb-2">1,248</div>
                  <div className="text-sm text-gray-700 mb-1">Total Publications</div>
                  <div className="text-xs text-[#16a34a]">+18% vs last quarter</div>
                </Card>
                <Card className="p-6 bg-lime-50">
                  <div className="text-4xl font-bold text-[#16a34a] mb-2">372</div>
                  <div className="text-sm text-gray-700 mb-1">Active Collaborations</div>
                  <div className="text-xs text-[#16a34a]">+24% this month</div>
                </Card>
                <Card className="p-6 bg-purple-50">
                  <div className="text-4xl font-bold text-purple-600 mb-2">94%</div>
                  <div className="text-sm text-gray-700 mb-1">Success Rate</div>
                  <div className="text-xs text-[#16a34a]">Above target</div>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Research Output by Department</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#1A3C34" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
