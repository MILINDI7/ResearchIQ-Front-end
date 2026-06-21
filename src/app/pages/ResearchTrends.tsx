import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useApp } from '../context/AppContext';
import { Brain, ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trendData = [
  { month: 'Jan', ml: 45, quantum: 23, climate: 34 },
  { month: 'Feb', ml: 52, quantum: 28, climate: 38 },
  { month: 'Mar', ml: 61, quantum: 35, climate: 42 },
  { month: 'Apr', ml: 68, quantum: 42, climate: 48 },
  { month: 'May', ml: 78, quantum: 51, climate: 55 },
];

const topicData = [
  { topic: 'Machine Learning', papers: 234, growth: '+45%', trend: 'up' },
  { topic: 'Quantum Computing', papers: 156, growth: '+38%', trend: 'up' },
  { topic: 'Climate Science', papers: 189, growth: '+32%', trend: 'up' },
  { topic: 'Genomics', papers: 145, growth: '+28%', trend: 'up' },
  { topic: 'Renewable Energy', papers: 123, growth: '+25%', trend: 'up' },
  { topic: 'Blockchain', papers: 98, growth: '-12%', trend: 'down' },
];

export function ResearchTrends() {
  const navigate = useNavigate();
  const { user } = useApp();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F2F3F5]">
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1A3C34] rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl">Research Trends</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/researcher/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-2">Research Trends Analysis</h1>
        <p className="text-gray-600 mb-8">AI-powered insights into emerging research topics and citation patterns</p>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Publication Trends Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="ml" stroke="#84CC16" strokeWidth={2} name="Machine Learning" />
                <Line type="monotone" dataKey="quantum" stroke="#10B981" strokeWidth={2} name="Quantum Computing" />
                <Line type="monotone" dataKey="climate" stroke="#8B5CF6" strokeWidth={2} name="Climate Science" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Top Research Areas (2026)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topicData.slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="topic" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="papers" fill="#1A3C34" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-6">Trending Research Topics</h3>
          <div className="space-y-4">
            {topicData.map((topic, idx) => (
              <div
                key={topic.topic}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#1A3C34]/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-[#1A3C34] rounded-lg flex items-center justify-center text-white font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{topic.topic}</div>
                    <div className="text-sm text-gray-500">{topic.papers} papers published</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <Badge
                    className={topic.trend === 'up' ? 'bg-lime-100 text-[#15803d]' : 'bg-red-100 text-red-700'}
                  >
                    {topic.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                    {topic.growth}
                  </Badge>

                  <Button variant="outline" size="sm">
                    Explore
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
