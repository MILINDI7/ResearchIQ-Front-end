import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Brain, Users, TrendingUp, Award, Network, Search, Lightbulb, Target } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Research IQ
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Log In
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              AI-Powered Research Intelligence
            </span>
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
            Accelerate Academic Collaboration
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Connect with researchers worldwide, discover collaboration opportunities,
            and advance your research with AI-powered insights and expertise mapping.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8"
              onClick={() => navigate('/signup')}
            >
              Start Your Research Journey
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8"
              onClick={() => navigate('/login')}
            >
              Explore Demo
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">2,500+</div>
            <div className="text-gray-600">Researchers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">5,000+</div>
            <div className="text-gray-600">Publications</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">1,200+</div>
            <div className="text-gray-600">Collaborations</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">$50M+</div>
            <div className="text-gray-600">Funding Secured</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need for collaborative research</p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <FeatureCard
              icon={<Search className="w-8 h-8" />}
              title="AI Expertise Mapping"
              description="Discover researchers based on their expertise, publications, and research interests with intelligent matching algorithms."
              color="blue"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Smart Collaboration"
              description="Get AI-powered recommendations for potential collaborators based on complementary skills and research synergies."
              color="green"
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Research Trends"
              description="Stay ahead with real-time analysis of emerging research trends, hot topics, and citation patterns."
              color="blue"
            />
            <FeatureCard
              icon={<Award className="w-8 h-8" />}
              title="Funding Opportunities"
              description="Match your research with relevant funding opportunities and increase your chances of securing grants."
              color="green"
            />
            <FeatureCard
              icon={<Network className="w-8 h-8" />}
              title="Collaboration Network"
              description="Visualize and analyze research collaboration networks to identify key players and opportunities."
              color="blue"
            />
            <FeatureCard
              icon={<Lightbulb className="w-8 h-8" />}
              title="Impact Analytics"
              description="Track research performance with comprehensive metrics including citations, h-index, and collaboration impact."
              color="green"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in three simple steps</p>
          </div>

          <div className="grid grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up and complete your researcher profile with your expertise, publications, and research interests.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Discover & Connect</h3>
              <p className="text-gray-600">
                Use AI-powered tools to find collaborators, explore research trends, and identify funding opportunities.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Collaborate & Publish</h3>
              <p className="text-gray-600">
                Build meaningful collaborations, secure funding, and advance your research with the right partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Research?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of researchers already using Research IQ to accelerate their academic careers.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8"
            onClick={() => navigate('/signup')}
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">Research IQ</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering researchers through AI-driven collaboration and intelligence.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Features</div>
                <div>Pricing</div>
                <div>Use Cases</div>
                <div>Demo</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Documentation</div>
                <div>API</div>
                <div>Support</div>
                <div>Blog</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>About</div>
                <div>Careers</div>
                <div>Contact</div>
                <div>Privacy</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            © 2026 Research IQ. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'green';
}) {
  const bgColor = color === 'blue' ? 'bg-blue-100' : 'bg-green-100';
  const textColor = color === 'blue' ? 'text-blue-600' : 'text-green-600';

  return (
    <div className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer bg-white">
      <div className={`w-14 h-14 ${bgColor} rounded-lg flex items-center justify-center ${textColor} mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
