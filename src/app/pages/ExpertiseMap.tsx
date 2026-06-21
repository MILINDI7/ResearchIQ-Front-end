import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useApp } from '../context/AppContext';
import { Brain, ArrowLeft, Map, Users, TrendingUp } from 'lucide-react';

const expertiseAreas = [
  { area: 'Machine Learning', count: 12, growth: '+23%' },
  { area: 'Quantum Computing', count: 8, growth: '+45%' },
  { area: 'Genomics', count: 10, growth: '+18%' },
  { area: 'Climate Science', count: 7, growth: '+32%' },
  { area: 'Nanotechnology', count: 6, growth: '+15%' },
  { area: 'Renewable Energy', count: 9, growth: '+28%' },
];

export function ExpertiseMap() {
  const navigate = useNavigate();
  const { user, researchers } = useApp();

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
            <span className="font-bold text-xl">Expertise Map</span>
          </div>
          <Button variant="ghost" onClick={() => navigate(-1 as any)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-2">Institutional Expertise Map</h1>
        <p className="text-gray-600 mb-8">Visual representation of research expertise across the institution</p>

        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold mb-6">Expertise Distribution Heatmap</h3>
          <div className="grid grid-cols-6 gap-4">
            {expertiseAreas.map(area => {
              const intensity = Math.min(area.count / 12, 1);
              const bgColor = `rgba(59, 130, 246, ${intensity})`;

              return (
                <div
                  key={area.area}
                  className="aspect-square rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 transition-transform border-2 border-[#1A3C34]/20"
                  style={{ backgroundColor: bgColor }}
                >
                  <div className={`font-bold text-lg mb-2 ${intensity > 0.5 ? 'text-white' : 'text-blue-900'}`}>
                    {area.count}
                  </div>
                  <div className={`text-xs ${intensity > 0.5 ? 'text-white' : 'text-blue-800'}`}>
                    {area.area}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-4 rounded" style={{ backgroundColor: 'rgba(59, 130, 246, 0.3)' }} />
              <span>Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-4 rounded" style={{ backgroundColor: 'rgba(59, 130, 246, 0.6)' }} />
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-4 rounded" style={{ backgroundColor: 'rgba(59, 130, 246, 1)' }} />
              <span>High</span>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Map className="w-6 h-6 text-[#1A3C34]" />
              Top Expertise Areas
            </h3>
            <div className="space-y-4">
              {expertiseAreas.map((area, idx) => (
                <div
                  key={area.area}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#1A3C34]/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-[#1A3C34] rounded-lg flex items-center justify-center text-white font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-bold">{area.area}</div>
                      <div className="text-sm text-gray-500">{area.count} experts</div>
                    </div>
                  </div>
                  <Badge className="bg-lime-100 text-[#15803d]">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {area.growth}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-[#16a34a]" />
              Department Distribution
            </h3>
            <div className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Computer Science</span>
                    <span className="font-bold">28 researchers</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1A3C34]" style={{ width: '70%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Biotechnology</span>
                    <span className="font-bold">22 researchers</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-lime-500" style={{ width: '55%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Physics</span>
                    <span className="font-bold">18 researchers</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1A3C34]" style={{ width: '45%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Environmental Science</span>
                    <span className="font-bold">15 researchers</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-lime-500" style={{ width: '38%' }} />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
