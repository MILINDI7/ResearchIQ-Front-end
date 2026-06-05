import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Brain, ArrowLeft, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import { Card } from '../components/ui/card';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDemoAccounts, setShowDemoAccounts] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await login(email, password);
    if (success) {
      toast.success('Login successful!');

      // Route to appropriate dashboard based on email
      if (email.includes('admin')) {
        navigate('/admin/dashboard');
      } else if (email.includes('partner')) {
        navigate('/partner/dashboard');
      } else if (email.includes('manager')) {
        navigate('/manager/dashboard');
      } else if (email.includes('department.head')) {
        navigate('/department/dashboard');
      } else {
        navigate('/researcher/dashboard');
      }
    } else {
      toast.error('Invalid email or password');
    }
  };

  const quickLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    const success = login(demoEmail, demoPassword);
    if (success) {
      toast.success('Demo login successful!');
      if (demoEmail.includes('admin')) {
        navigate('/admin/dashboard');
      } else if (demoEmail.includes('partner')) {
        navigate('/partner/dashboard');
      } else if (demoEmail.includes('manager')) {
        navigate('/manager/dashboard');
      } else if (demoEmail.includes('department.head')) {
        navigate('/department/dashboard');
      } else {
        navigate('/researcher/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Research IQ
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue your research journey</p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Login Form */}
          <Card className="p-8 bg-white shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@university.edu"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <button type="button" className="text-blue-600 hover:underline">
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                <Lock className="w-4 h-4 mr-2" />
                Sign In
              </Button>

              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/signup')}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          </Card>

          {/* Demo Accounts */}
          {showDemoAccounts && (
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Quick Demo Access</h3>
                <p className="text-sm text-gray-600">
                  Try the platform with different user roles
                </p>
              </div>

              <div className="space-y-3">
                <DemoAccountButton
                  role="Researcher"
                  email="sarah.chen@university.edu"
                  description="Explore feed, discover research, upload papers, find collaborators"
                  color="blue"
                  onClick={() => quickLogin('sarah.chen@university.edu', 'password')}
                />

                <DemoAccountButton
                  role="Department Head"
                  email="department.head@university.edu"
                  description="View department overview, analytics, and team performance"
                  color="green"
                  onClick={() => quickLogin('department.head@university.edu', 'password')}
                />

                <DemoAccountButton
                  role="Admin"
                  email="admin@researchiq.com"
                  description="Review and approve researcher applications"
                  color="blue"
                  onClick={() => quickLogin('admin@researchiq.com', 'admin')}
                />

                <DemoAccountButton
                  role="Partner / Funder"
                  email="partner@funding.com"
                  description="Browse research projects and provide funding"
                  color="green"
                  onClick={() => quickLogin('partner@funding.com', 'partner')}
                />

                <DemoAccountButton
                  role="Research Manager"
                  email="manager@researchiq.com"
                  description="Manage institutional research activities and analytics"
                  color="blue"
                  onClick={() => quickLogin('manager@researchiq.com', 'manager')}
                />
              </div>

              <div className="mt-6 p-4 bg-white/50 rounded-lg">
                <p className="text-xs text-gray-600">
                  <strong>Note:</strong> These are demo accounts for evaluation purposes. All data is simulated.
                </p>
              </div>
            </Card>
          )}
        </div>

        <div className="text-center mt-8">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

function DemoAccountButton({ role, email, description, color, onClick }: {
  role: string;
  email: string;
  description: string;
  color: 'blue' | 'green';
  onClick: () => void;
}) {
  const bgColor = color === 'blue' ? 'bg-blue-100 hover:bg-blue-200' : 'bg-green-100 hover:bg-green-200';
  const textColor = color === 'blue' ? 'text-blue-700' : 'text-green-700';

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-lg ${bgColor} border-2 border-transparent hover:border-${color}-400 transition-all text-left`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className={`font-bold ${textColor} mb-1`}>{role}</div>
          <div className="text-xs text-gray-600 mb-2">{email}</div>
          <div className="text-sm text-gray-700">{description}</div>
        </div>
        <div className={`px-3 py-1 ${bgColor} ${textColor} rounded text-xs font-medium`}>
          Try Now
        </div>
      </div>
    </button>
  );
}
