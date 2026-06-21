import { useNavigate, useLocation } from 'react-router';
import { Brain, Home, Compass, Users, TrendingUp, DollarSign, Network, User, Settings, Plus, Search, Inbox } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Avatar } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { NotificationDropdown } from './NotificationDropdown';

export function ResearcherLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, collaborationRequests } = useApp();

  const pendingRequestsCount = collaborationRequests.filter(
    req => req.toUserId === user?.id && req.status === 'pending'
  ).length;

  const navItems = [
    { path: '/feed', icon: Home, label: 'Feed' },
    { path: '/discover', icon: Compass, label: 'Discover' },
    { path: '/requests', icon: Inbox, label: 'Requests', badge: pendingRequestsCount },
    { path: '/collaborators', icon: Users, label: 'Collaborators' },
    { path: '/trends', icon: TrendingUp, label: 'Trends' },
    { path: '/funding', icon: DollarSign, label: 'Funding' },
    { path: '/network', icon: Network, label: 'Network' },
  ];

  const workspaceItems = [
    { path: '/my-profile', icon: User, label: 'Profile' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-[#F2F3F5]">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/feed')}>
              <div className="w-10 h-10 bg-[#1A3C34] rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-[#1A3C34]">
                Research IQ
              </span>
            </div>

            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search researchers, topics, papers..."
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              className="bg-[#1A3C34] hover:bg-[#15302a]"
              onClick={() => navigate('/researcher/upload')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Share research
            </Button>

            <NotificationDropdown />

            <Avatar
              className="w-10 h-10 bg-[#1A3C34] flex items-center justify-center text-white font-bold cursor-pointer"
              onClick={() => navigate('/my-profile')}
            >
              {user?.name.charAt(0)}
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-[65px] self-start">
          <div className="p-4">
            {/* User Profile Section */}
            <div
              className="flex items-center gap-3 p-3 rounded-lg bg-[#F0FDF4] mb-6 cursor-pointer hover:shadow-md transition-all"
              onClick={() => navigate('/my-profile')}
            >
              <Avatar className="w-12 h-12 bg-[#1A3C34] flex items-center justify-center text-white font-bold">
                {user?.name.charAt(0)}
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm truncate">Researcher</div>
                <div className="text-xs text-gray-500 truncate">WORKSPACE</div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mb-6">
              <div className="text-xs font-semibold text-gray-500 mb-3 px-3">NAVIGATE</div>
              <div className="space-y-1">
                {navItems.map(item => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                        isActive
                          ? 'bg-[#1A3C34] text-white font-medium rounded-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <Badge className={`${isActive ? 'bg-white text-[#1A3C34]' : 'bg-red-500 text-white'} text-xs px-2 py-0.5`}>
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Workspace */}
            <div>
              <div className="text-xs font-semibold text-gray-500 mb-3 px-3">WORKSPACE</div>
              <div className="space-y-1">
                {workspaceItems.map(item => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                        isActive
                          ? 'bg-[#1A3C34] text-white font-medium rounded-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
