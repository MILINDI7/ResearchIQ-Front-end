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
  Search,
  Sparkles,
  Users,
  TrendingUp,
  Award,
  BookOpen,
  Mail,
  MessageCircle,
  Star,
  Target,
  Zap,
  Network,
  ArrowLeft
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export function FindCollaborators() {
  const navigate = useNavigate();
  const { user, logout, researchers } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Calculate match scores (AI-powered simulation)
  const collaboratorsWithScores = researchers
    .filter(r => r.id !== user.id)
    .map(r => {
      const matchScore = Math.floor(Math.random() * 40 + 60); // 60-100
      const sharedInterests = Math.floor(Math.random() * 3 + 1);
      const synergy = ['High', 'Medium', 'Very High'][Math.floor(Math.random() * 3)];

      return { ...r, matchScore, sharedInterests, synergy };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  const filteredCollaborators = collaboratorsWithScores.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         r.expertise?.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDepartment = filterDepartment === 'all' || r.department === filterDepartment;

    return matchesSearch && matchesDepartment;
  });

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
                  Research IQ
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/researcher/dashboard')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <Avatar className="w-10 h-10 bg-[#1A3C34] flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0)}
                </Avatar>
                <div className="text-left">
                  <div className="font-medium text-sm">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.department}</div>
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
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-[#1A3C34] rounded-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">AI-Powered Collaborator Matching</h1>
              <p className="text-gray-600">Discover researchers with complementary expertise and shared interests</p>
            </div>
          </div>
        </div>

        {/* AI Insights Banner */}
        <Card className="p-6 mb-8 bg-[#1A3C34] text-white">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 rounded-lg">
              <Target className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                Smart Match Analysis
                <Badge className="bg-yellow-400 text-yellow-900">AI</Badge>
              </h3>
              <p className="text-white/90">
                Our AI analyzes {researchers.length} researchers across {user.expertise?.length || 3} of your expertise areas
                and identified <strong>{filteredCollaborators.filter(c => c.matchScore >= 80).length} high-potential collaborations</strong> based on:
              </p>
              <div className="flex gap-6 mt-3 text-sm">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>Complementary skills</span>
                </div>
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4" />
                  <span>Collaboration history</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Research impact</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by name, expertise, or research area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Biotechnology">Biotechnology</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Environmental Science">Environmental Science</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-4 py-2 ${viewMode === 'cards' ? 'bg-[#1A3C34] text-white' : 'bg-white text-gray-600'}`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 ${viewMode === 'list' ? 'bg-[#1A3C34] text-white' : 'bg-white text-gray-600'}`}
              >
                List
              </button>
            </div>
          </div>
        </Card>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-gray-600">
            Found <strong className="text-[#1A3C34]">{filteredCollaborators.length}</strong> potential collaborators
            {filteredCollaborators.filter(c => c.matchScore >= 80).length > 0 && (
              <span className="ml-2">
                • <strong className="text-[#16a34a]">{filteredCollaborators.filter(c => c.matchScore >= 80).length}</strong> high matches (80%+)
              </span>
            )}
          </div>
          <Select defaultValue="match">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match">Sort by Match Score</SelectItem>
              <SelectItem value="citations">Sort by Citations</SelectItem>
              <SelectItem value="publications">Sort by Publications</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Collaborators Grid/List */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-2 gap-6">
            {filteredCollaborators.map(researcher => (
              <CollaboratorCard
                key={researcher.id}
                researcher={researcher}
                onViewProfile={() => navigate(`/researcher/profile/${researcher.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCollaborators.map(researcher => (
              <CollaboratorListItem
                key={researcher.id}
                researcher={researcher}
                onViewProfile={() => navigate(`/researcher/profile/${researcher.id}`)}
              />
            ))}
          </div>
        )}

        {filteredCollaborators.length === 0 && (
          <Card className="p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No collaborators found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </Card>
        )}
      </div>
    </div>
  );
}

function CollaboratorCard({ researcher, onViewProfile }: {
  researcher: any;
  onViewProfile: () => void;
}) {
  return (
    <Card className="p-6 hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-[#1A3C34]/30">
      <div className="flex items-start gap-4 mb-4">
        <Avatar className="w-16 h-16 bg-[#1A3C34] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
          {researcher.name.charAt(0)}
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold mb-1 truncate">{researcher.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{researcher.department}</p>
          <p className="text-xs text-gray-500">{researcher.institution}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-[#16a34a] mb-1">{researcher.matchScore}%</div>
          <div className="text-xs text-gray-500">Match Score</div>
        </div>
      </div>

      {/* Match Insights */}
      <div className="bg-[#F0FDF4] rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#1A3C34]" />
          <span className="font-semibold text-sm">AI Match Insights</span>
        </div>
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-lime-500 rounded-full" />
            <span>{researcher.sharedInterests} shared research interests</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#1A3C34] rounded-full" />
            <span>{researcher.synergy} collaboration synergy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-lime-500 rounded-full" />
            <span>Complementary expertise match</span>
          </div>
        </div>
      </div>

      {/* Expertise Tags */}
      <div className="mb-4">
        <div className="text-xs font-medium text-gray-600 mb-2">Research Expertise</div>
        <div className="flex flex-wrap gap-2">
          {researcher.expertise?.slice(0, 4).map((exp: string) => (
            <Badge key={exp} variant="secondary" className="text-xs">
              {exp}
            </Badge>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
        <div>
          <div className="font-bold text-[#1A3C34]">{researcher.publications}</div>
          <div className="text-xs text-gray-500">Publications</div>
        </div>
        <div>
          <div className="font-bold text-[#16a34a]">{researcher.citations}</div>
          <div className="text-xs text-gray-500">Citations</div>
        </div>
        <div>
          <div className="font-bold text-[#1A3C34]">{researcher.hIndex}</div>
          <div className="text-xs text-gray-500">h-index</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          className="flex-1 bg-[#1A3C34] hover:bg-[#15302a]"
          onClick={onViewProfile}
        >
          View Profile
        </Button>
        <Button variant="outline" size="icon">
          <Mail className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon">
          <MessageCircle className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}

function CollaboratorListItem({ researcher, onViewProfile }: {
  researcher: any;
  onViewProfile: () => void;
}) {
  return (
    <Card className="p-6 hover:shadow-sm transition-all cursor-pointer border-2 border-transparent hover:border-[#1A3C34]/30">
      <div className="flex items-center gap-6">
        <Avatar className="w-16 h-16 bg-[#1A3C34] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
          {researcher.name.charAt(0)}
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold">{researcher.name}</h3>
            <Badge className="bg-lime-100 text-[#15803d]">{researcher.matchScore}% Match</Badge>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            {researcher.department} • {researcher.institution}
          </p>
          <div className="flex flex-wrap gap-2">
            {researcher.expertise?.slice(0, 5).map((exp: string) => (
              <Badge key={exp} variant="secondary" className="text-xs">
                {exp}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8 text-center">
          <div>
            <div className="font-bold text-[#1A3C34]">{researcher.publications}</div>
            <div className="text-xs text-gray-500">Publications</div>
          </div>
          <div>
            <div className="font-bold text-[#16a34a]">{researcher.citations}</div>
            <div className="text-xs text-gray-500">Citations</div>
          </div>
          <div>
            <div className="font-bold text-[#1A3C34]">{researcher.hIndex}</div>
            <div className="text-xs text-gray-500">h-index</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={onViewProfile}>View Profile</Button>
          <Button variant="outline" size="icon">
            <Mail className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
