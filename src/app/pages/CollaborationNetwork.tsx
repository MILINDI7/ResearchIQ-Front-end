import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useApp } from '../context/AppContext';
import { Brain, ArrowLeft, Network, Users } from 'lucide-react';

export function CollaborationNetwork() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl">Collaboration Network</span>
          </div>
          <Button variant="ghost" onClick={() => navigate(-1 as any)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8">Collaboration Network Visualization</h1>

        <Card className="p-8 mb-8">
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* Network Visualization Simulation */}
            <div className="absolute inset-0 flex items-center justify-center">
              {researchers.slice(0, 8).map((r, idx) => {
                const angle = (idx / 8) * 2 * Math.PI;
                const radius = 180;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <div
                    key={r.id}
                    className="absolute w-16 h-16 bg-white rounded-full border-4 border-blue-600 flex items-center justify-center font-bold text-blue-600 shadow-lg cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {r.name.charAt(0)}
                  </div>
                );
              })}

              {/* Center node (current user) */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center font-bold text-white text-2xl shadow-xl">
                {user.name.charAt(0)}
              </div>
            </div>

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {researchers.slice(0, 8).map((_, idx) => {
                const angle = (idx / 8) * 2 * Math.PI;
                const radius = 180;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <line
                    key={idx}
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${x}px)`}
                    y2={`calc(50% + ${y}px)`}
                    stroke="#3B82F6"
                    strokeWidth="2"
                    opacity="0.3"
                  />
                );
              })}
            </svg>
          </div>

          <div className="mt-6 text-center text-gray-600">
            <p className="font-medium mb-2">Your Collaboration Network</p>
            <p className="text-sm">Interactive visualization showing connections with {researchers.length} researchers</p>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600 mb-4 w-fit">
              <Network className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mb-1">{researchers.length}</div>
            <div className="text-sm text-gray-600">Network Connections</div>
          </Card>
          <Card className="p-6">
            <div className="p-3 bg-green-100 rounded-lg text-green-600 mb-4 w-fit">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mb-1">12</div>
            <div className="text-sm text-gray-600">Direct Collaborators</div>
          </Card>
          <Card className="p-6">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600 mb-4 w-fit">
              <Network className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mb-1">3.5</div>
            <div className="text-sm text-gray-600">Avg. Degree Separation</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
