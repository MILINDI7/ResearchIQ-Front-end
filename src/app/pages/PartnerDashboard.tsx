import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Avatar } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { useApp } from '../context/AppContext';
import {
  Brain,
  LogOut,
  Bell,
  Heart,
  DollarSign,
  Users,
  TrendingUp,
  Search,
  Filter,
  Star,
  BookOpen,
  Target,
  Award
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export function PartnerDashboard() {
  const navigate = useNavigate();
  const { user, logout, research, researchers } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterField, setFilterField] = useState('all');
  const [savedProjects, setSavedProjects] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState('browse');

  useEffect(() => {
    if (!user || user.role !== 'partner') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'partner') {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSave = (id: string) => {
    setSavedProjects(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const filteredResearch = research.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         r.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         r.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter = filterField === 'all' || r.field === filterField;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Research IQ Partners
                </span>
              </div>

              <div className="flex items-center gap-6">
                <button
                  onClick={() => setActiveSection('browse')}
                  className={`font-medium transition-colors ${
                    activeSection === 'browse' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Browse Projects
                </button>
                <button
                  onClick={() => setActiveSection('investments')}
                  className={`font-medium transition-colors ${
                    activeSection === 'investments' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  My Investments
                </button>
                <button
                  onClick={() => setActiveSection('analytics')}
                  className={`font-medium transition-colors ${
                    activeSection === 'analytics' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Analytics
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0)}
                </Avatar>
                <div className="text-left">
                  <div className="font-medium text-sm">{user.name}</div>
                  <div className="text-xs text-gray-500">Funding Partner</div>
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
        {activeSection === 'browse' && (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Discover Research Projects</h1>
              <p className="text-gray-600">Find and fund groundbreaking research that aligns with your investment goals</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{research.length}</div>
            <div className="text-sm text-gray-600 mb-2">Available Projects</div>
            <div className="text-xs text-blue-600 font-medium">+12 this week</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg text-green-600">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{researchers.length}</div>
            <div className="text-sm text-gray-600 mb-2">Active Researchers</div>
            <div className="text-xs text-green-600 font-medium">Top rated</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <Heart className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{savedProjects.length}</div>
            <div className="text-sm text-gray-600 mb-2">Saved Projects</div>
            <div className="text-xs text-blue-600 font-medium">Your interest</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg text-green-600">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">$2.5M</div>
            <div className="text-sm text-gray-600 mb-2">Avg. Funding Need</div>
            <div className="text-xs text-green-600 font-medium">High impact</div>
          </Card>
            </div>

            {/* Search and Filters */}
            <Card className="p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search projects by title, keywords, or research area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterField} onValueChange={setFilterField}>
              <SelectTrigger className="w-64">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fields</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Biotechnology">Biotechnology</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Environmental Science">Environmental Science</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              Advanced Filters
            </Button>
          </div>
            </Card>

            {/* Projects Grid */}
            <div className="space-y-6">
          {filteredResearch.map(project => {
            const lead = researchers.find(r => r.id === project.researcherId);
            const isSaved = savedProjects.includes(project.id);
            const impactScore = Math.floor(Math.random() * 30 + 70);
            const fundingNeeded = Math.floor(Math.random() * 500 + 100);

            return (
              <Card
                key={project.id}
                className="p-6 hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-300"
              >
                <div className="flex gap-6">
                  {/* Left: Project Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-blue-600">{project.title}</h3>
                          <Badge className={
                            project.fundingStatus === 'seeking' ? 'bg-yellow-100 text-yellow-700' :
                            project.fundingStatus === 'funded' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                          }>
                            {project.fundingStatus === 'seeking' ? 'Seeking Funding' : project.fundingStatus}
                          </Badge>
                        </div>

                        <p className="text-gray-600 mb-4 leading-relaxed">{project.abstract}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.keywords.map(keyword => (
                            <Badge key={keyword} variant="secondary">
                              {keyword}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {project.authors.length} collaborators
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            {project.citations} citations
                          </span>
                          <span className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            {project.field}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleSave(project.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          isSaved ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100 text-gray-400'
                        }`}
                      >
                        <Heart className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Team Info */}
                    {lead && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="text-sm font-medium text-gray-600 mb-3">Research Team Lead</div>
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
                            {lead.name.charAt(0)}
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-bold">{lead.name}</div>
                            <div className="text-sm text-gray-600">
                              {lead.department} • {lead.institution}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                              <span>{lead.publications} publications</span>
                              <span>•</span>
                              <span>{lead.citations} citations</span>
                              <span>•</span>
                              <span>h-index: {lead.hIndex}</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/researcher/profile/${lead.id}`)}
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Fund This Project
                      </Button>
                      <Button variant="outline">
                        Request More Info
                      </Button>
                      <Button variant="ghost">
                        Share
                      </Button>
                    </div>
                  </div>

                  {/* Right: Metrics */}
                  <div className="w-64 space-y-4">
                    <Card className="p-4 bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200">
                      <div className="text-center mb-3">
                        <div className="text-sm text-gray-600 mb-1">Impact Score</div>
                        <div className="text-4xl font-bold text-blue-600">{impactScore}</div>
                        <div className="text-xs text-gray-500">out of 100</div>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-green-600"
                          style={{ width: `${impactScore}%` }}
                        />
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Funding Needed</div>
                          <div className="text-2xl font-bold text-green-600">${fundingNeeded}K</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Duration</div>
                          <div className="font-medium">24 months</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">ROI Potential</div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 bg-gradient-to-br from-green-50 to-blue-50">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">SDG Alignment</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <Badge className="bg-green-600 text-xs">SDG 13</Badge>
                        <Badge className="bg-blue-600 text-xs">SDG 9</Badge>
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
            );
          })}
            </div>

            {filteredResearch.length === 0 && (
              <Card className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No projects found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </Card>
            )}
          </>
        )}

        {activeSection === 'investments' && (
          <div>
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">My Investments</h1>
              <p className="text-gray-600">Track your funded research projects and their progress</p>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-lg text-green-600">
                    <DollarSign className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">$1.8M</div>
                <div className="text-sm text-gray-600 mb-2">Total Invested</div>
                <div className="text-xs text-green-600 font-medium">Across 5 projects</div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                    <BookOpen className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">5</div>
                <div className="text-sm text-gray-600 mb-2">Active Projects</div>
                <div className="text-xs text-blue-600 font-medium">All on track</div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-lg text-green-600">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">23</div>
                <div className="text-sm text-gray-600 mb-2">Publications</div>
                <div className="text-xs text-green-600 font-medium">From funded projects</div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                    <Award className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">89</div>
                <div className="text-sm text-gray-600 mb-2">Impact Score</div>
                <div className="text-xs text-blue-600 font-medium">High impact</div>
              </Card>
            </div>

            <div className="space-y-6">
              {savedProjects.length > 0 ? (
                savedProjects.map(projectId => {
                  const project = research.find(r => r.id === projectId);
                  if (!project) return null;
                  const lead = researchers.find(r => r.id === project.researcherId);
                  const progress = Math.floor(Math.random() * 40 + 40);
                  const invested = Math.floor(Math.random() * 400 + 200);

                  return (
                    <Card key={projectId} className="p-6">
                      <div className="flex gap-6">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-blue-600 mb-2">{project.title}</h3>
                              <p className="text-gray-600 mb-3">{project.abstract}</p>
                              {lead && (
                                <div className="flex items-center gap-3">
                                  <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
                                    {lead.name.charAt(0)}
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{lead.name}</div>
                                    <div className="text-sm text-gray-500">{lead.department}</div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <Badge className="bg-green-100 text-green-700">Active</Badge>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-gray-600">Project Progress</span>
                              <span className="font-bold">{progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-600 to-green-600"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <Button variant="outline">View Details</Button>
                            <Button variant="outline">Progress Report</Button>
                            <Button variant="outline">Contact Team</Button>
                          </div>
                        </div>

                        <div className="w-64">
                          <Card className="p-4 bg-gradient-to-br from-green-50 to-blue-50">
                            <div className="text-center mb-3">
                              <div className="text-sm text-gray-600 mb-1">Your Investment</div>
                              <div className="text-3xl font-bold text-green-600">${invested}K</div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Duration</span>
                                <span className="font-medium">24 months</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Start Date</span>
                                <span className="font-medium">Jan 2026</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Publications</span>
                                <span className="font-medium">{Math.floor(Math.random() * 5 + 2)}</span>
                              </div>
                            </div>
                          </Card>
                        </div>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <Card className="p-12 text-center">
                  <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No investments yet</h3>
                  <p className="text-gray-600 mb-4">Start funding research projects to see them here</p>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    onClick={() => setActiveSection('browse')}
                  >
                    Browse Projects
                  </Button>
                </Card>
              )}
            </div>
          </div>
        )}

        {activeSection === 'analytics' && (
          <div>
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Investment Analytics</h1>
              <p className="text-gray-600">Comprehensive insights into your research portfolio</p>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">$1.8M</div>
                <div className="text-sm text-gray-700 mb-1">Total Investment</div>
                <div className="text-xs text-green-600">+15% this quarter</div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
                <div className="text-4xl font-bold text-green-600 mb-2">23</div>
                <div className="text-sm text-gray-700 mb-1">Research Outputs</div>
                <div className="text-xs text-green-600">+8 this month</div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
                <div className="text-4xl font-bold text-purple-600 mb-2">4.2x</div>
                <div className="text-sm text-gray-700 mb-1">ROI Multiplier</div>
                <div className="text-xs text-green-600">Above average</div>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Investment by Research Area</h3>
                <div className="space-y-4">
                  {[
                    { area: 'AI & Machine Learning', amount: 650, percentage: 36 },
                    { area: 'Biotechnology', amount: 480, percentage: 27 },
                    { area: 'Renewable Energy', amount: 420, percentage: 23 },
                    { area: 'Quantum Computing', amount: 250, percentage: 14 },
                  ].map(item => (
                    <div key={item.area}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{item.area}</span>
                        <span className="text-sm text-gray-600">${item.amount}K ({item.percentage}%)</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-green-600"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Impact Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">Publications Generated</div>
                      <div className="text-2xl font-bold text-blue-600">23</div>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">Total Citations</div>
                      <div className="text-2xl font-bold text-green-600">487</div>
                    </div>
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">Researchers Supported</div>
                      <div className="text-2xl font-bold text-purple-600">12</div>
                    </div>
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Portfolio Performance</h3>
              <div className="space-y-4">
                {savedProjects.slice(0, 3).map((projectId, idx) => {
                  const project = research.find(r => r.id === projectId);
                  if (!project) return null;
                  const performance = [92, 87, 78][idx];
                  const roi = [4.5, 3.8, 3.2][idx];

                  return (
                    <div key={projectId} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <div className="font-bold mb-1">{project.title}</div>
                        <div className="text-sm text-gray-600">{project.field}</div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Performance</div>
                          <div className="text-xl font-bold text-blue-600">{performance}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">ROI</div>
                          <div className="text-xl font-bold text-green-600">{roi}x</div>
                        </div>
                        <Badge className="bg-green-100 text-green-700">Excellent</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
