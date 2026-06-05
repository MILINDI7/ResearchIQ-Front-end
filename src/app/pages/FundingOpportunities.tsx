import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useApp } from '../context/AppContext';
import { Brain, ArrowLeft, DollarSign, Clock, Target, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const fundingOpportunities = [
  {
    id: '1',
    title: 'NSF AI Research Grant',
    agency: 'National Science Foundation',
    amount: '$500,000',
    deadline: '2026-05-24',
    match: 94,
    areas: ['Machine Learning', 'Artificial Intelligence', 'Neural Networks']
  },
  {
    id: '2',
    title: 'DOE Climate Innovation Fund',
    agency: 'Department of Energy',
    amount: '$750,000',
    deadline: '2026-06-15',
    match: 87,
    areas: ['Climate Science', 'Environmental Science', 'Sustainability']
  },
  {
    id: '3',
    title: 'NIH Genomics Research Program',
    agency: 'National Institutes of Health',
    amount: '$400,000',
    deadline: '2026-06-30',
    match: 82,
    areas: ['Genomics', 'Bioinformatics', 'Healthcare']
  },
  {
    id: '4',
    title: 'DARPA Quantum Computing Initiative',
    agency: 'Defense Advanced Research Projects Agency',
    amount: '$1,200,000',
    deadline: '2026-07-10',
    match: 78,
    areas: ['Quantum Computing', 'Physics', 'Computer Science']
  }
];

export function FundingOpportunities() {
  const navigate = useNavigate();
  const { user, sendCollaborationRequest } = useApp();
  const [selectedFunding, setSelectedFunding] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [proposedAmount, setProposedAmount] = useState('');
  const [timeline, setTimeline] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const days = Math.floor((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const handleApply = (funding: any) => {
    setSelectedFunding(funding);
    setShowDialog(true);
  };

  const handleSubmitApplication = () => {
    if (!message || !proposedAmount || !timeline) {
      toast.error('Please fill in all fields');
      return;
    }

    sendCollaborationRequest({
      type: 'funding',
      toUserId: 'partner1', // In a real app, this would be the funding partner's ID
      fundingId: selectedFunding.id,
      fundingTitle: selectedFunding.title,
      message,
      proposedAmount,
      timeline
    });

    toast.success('Funding application submitted successfully!');
    setShowDialog(false);
    setMessage('');
    setProposedAmount('');
    setTimeline('');
    setSelectedFunding(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl">Funding Opportunities</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/researcher/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-2">AI-Matched Funding Opportunities</h1>
        <p className="text-gray-600 mb-8">Personalized grant recommendations based on your research expertise and interests</p>

        <Card className="p-6 mb-8 bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 rounded-lg">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Smart Funding Match</h3>
              <p className="text-white/90">
                Our AI analyzed your expertise in <strong>{user.expertise?.join(', ')}</strong> and found <strong>{fundingOpportunities.length} highly relevant</strong> funding opportunities
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          {fundingOpportunities.map(opp => {
            const daysLeft = getDaysUntilDeadline(opp.deadline);

            return (
              <Card
                key={opp.id}
                className="p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-300"
              >
                <div className="flex gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-blue-600">{opp.title}</h3>
                          <Badge className="bg-green-100 text-green-700">
                            {opp.match}% Match
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{opp.agency}</p>

                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            <span className="font-bold text-green-600">{opp.amount}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className={daysLeft <= 15 ? 'text-red-600 font-bold' : ''}>
                              {daysLeft} days left
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {opp.areas.map(area => (
                            <Badge key={area} variant="secondary">
                              {area}
                            </Badge>
                          ))}
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-start gap-2">
                            <Target className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-blue-900">
                              <strong>Why this matches:</strong> Your expertise in {user.expertise?.[0]} aligns perfectly with this grant's focus areas.
                              Recent publications show {opp.match}% compatibility with funding priorities.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                        onClick={() => handleApply(opp)}
                      >
                        Apply Now
                      </Button>
                      <Button variant="outline">
                        Save for Later
                      </Button>
                      <Button variant="ghost">
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="w-64">
                    <Card className="p-4 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
                      <div className="text-center mb-3">
                        <div className="text-sm text-gray-600 mb-1">Success Probability</div>
                        <div className="text-4xl font-bold text-green-600">{opp.match - 10}%</div>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                        <div
                          className="h-full bg-gradient-to-r from-green-600 to-blue-600"
                          style={{ width: `${opp.match - 10}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-600 text-center">
                        Based on your profile and past success rates
                      </div>
                    </Card>

                    <Card className="p-4 mt-4">
                      <div className="text-sm font-medium mb-3">Deadline Timeline</div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Today</span>
                          <span className="font-bold">May 9</span>
                        </div>
                        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-yellow-500 to-red-500"
                            style={{ width: `${((15 - daysLeft) / 15) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Deadline</span>
                          <span className="font-bold">{opp.deadline}</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Funding Application Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Apply for Funding</DialogTitle>
            </DialogHeader>

            {selectedFunding && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="font-bold text-lg text-blue-900 mb-2">{selectedFunding.title}</div>
                  <div className="text-sm text-blue-700 mb-1">{selectedFunding.agency}</div>
                  <div className="flex items-center gap-4 text-sm text-blue-600">
                    <span className="font-bold">Amount: {selectedFunding.amount}</span>
                    <span>Deadline: {selectedFunding.deadline}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="proposedAmount">Proposed Budget Amount *</Label>
                    <Input
                      id="proposedAmount"
                      value={proposedAmount}
                      onChange={(e) => setProposedAmount(e.target.value)}
                      placeholder="e.g., $250,000"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="timeline">Project Timeline *</Label>
                    <Input
                      id="timeline"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      placeholder="e.g., 18 months"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Project Proposal & Message *</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your research project, objectives, methodology, expected outcomes, and how this funding will be utilized..."
                      rows={8}
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Provide a compelling proposal explaining your research goals and how you'll use the funding.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <Button variant="outline" onClick={() => setShowDialog(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    onClick={handleSubmitApplication}
                  >
                    Submit Application
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
