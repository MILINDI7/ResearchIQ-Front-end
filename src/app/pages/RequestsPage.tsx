import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar } from '../components/ui/avatar';
import { useApp } from '../context/AppContext';
import { ResearcherLayout } from '../components/ResearcherLayout';
import { CheckCircle, XCircle, Clock, DollarSign, Users, FileText } from 'lucide-react';
import { toast } from 'sonner';

export function RequestsPage() {
  const navigate = useNavigate();
  const { user, collaborationRequests, acceptCollaborationRequest, rejectCollaborationRequest, researchers } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const myRequests = collaborationRequests.filter(req => req.toUserId === user.id);
  const filteredRequests = filter === 'all'
    ? myRequests
    : myRequests.filter(req => req.status === filter);

  const pendingCount = myRequests.filter(req => req.status === 'pending').length;
  const acceptedCount = myRequests.filter(req => req.status === 'accepted').length;
  const rejectedCount = myRequests.filter(req => req.status === 'rejected').length;

  const handleAccept = (id: string, fromUserName: string) => {
    acceptCollaborationRequest(id);
    toast.success(`Accepted collaboration request from ${fromUserName}`);
  };

  const handleReject = (id: string, fromUserName: string) => {
    rejectCollaborationRequest(id);
    toast.success(`Rejected collaboration request from ${fromUserName}`);
  };

  const getRequester = (userId: string) => {
    return researchers.find(r => r.id === userId);
  };

  return (
    <ResearcherLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Collaboration Requests</h1>
          <p className="text-gray-600">Manage incoming requests from other researchers and funding partners</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#E8F5E9] rounded-lg">
                <FileText className="w-6 h-6 text-[#1A3C34]" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{myRequests.length}</div>
            <div className="text-sm text-gray-600">Total Requests</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{pendingCount}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-lime-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-[#16a34a]" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{acceptedCount}</div>
            <div className="text-sm text-gray-600">Accepted</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{rejectedCount}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All ({myRequests.length})
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilter('pending')}
          >
            Pending ({pendingCount})
          </Button>
          <Button
            variant={filter === 'accepted' ? 'default' : 'outline'}
            onClick={() => setFilter('accepted')}
          >
            Accepted ({acceptedCount})
          </Button>
          <Button
            variant={filter === 'rejected' ? 'default' : 'outline'}
            onClick={() => setFilter('rejected')}
          >
            Rejected ({rejectedCount})
          </Button>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">No requests found</h3>
              <p className="text-gray-500">
                {filter === 'pending' ? 'You have no pending collaboration requests at the moment.' :
                 filter === 'accepted' ? 'You haven\'t accepted any requests yet.' :
                 filter === 'rejected' ? 'You haven\'t rejected any requests yet.' :
                 'You have no collaboration requests.'}
              </p>
            </Card>
          ) : (
            filteredRequests.map(request => {
              const requester = getRequester(request.fromUserId);

              return (
                <Card key={request.id} className="p-6 hover:shadow-sm transition-all">
                  <div className="flex gap-6">
                    <Avatar className="w-16 h-16 bg-[#1A3C34] flex items-center justify-center text-white font-bold text-xl">
                      {request.fromUserName.charAt(0)}
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-xl font-bold">{request.fromUserName}</h3>
                            <Badge className={
                              request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              request.status === 'accepted' ? 'bg-lime-100 text-[#15803d]' :
                              'bg-red-100 text-red-700'
                            }>
                              {request.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                              {request.status === 'accepted' && <CheckCircle className="w-3 h-3 mr-1" />}
                              {request.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </Badge>
                          </div>
                          {requester && (
                            <div className="text-sm text-gray-600 mb-2">
                              {requester.department} • {requester.institution}
                            </div>
                          )}
                          <div className="text-sm text-gray-500">
                            Requested on {new Date(request.createdAt).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#F0FDF4] border border-[#1A3C34]/20 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          {request.type === 'funding' ? (
                            <DollarSign className="w-4 h-4 text-[#1A3C34]" />
                          ) : (
                            <Users className="w-4 h-4 text-[#1A3C34]" />
                          )}
                          <span className="font-bold text-blue-900">
                            {request.type === 'funding' ? 'Funding Request' : 'Collaboration Request'}
                          </span>
                        </div>

                        {request.researchTitle && (
                          <div className="text-sm text-blue-900 mb-2">
                            <strong>Research:</strong> {request.researchTitle}
                          </div>
                        )}

                        {request.fundingTitle && (
                          <div className="text-sm text-blue-900 mb-2">
                            <strong>Funding Opportunity:</strong> {request.fundingTitle}
                          </div>
                        )}

                        {request.collaborationType && (
                          <div className="text-sm text-blue-900 mb-2">
                            <strong>Type:</strong> {request.collaborationType}
                          </div>
                        )}

                        {request.timeline && (
                          <div className="text-sm text-blue-900 mb-2">
                            <strong>Timeline:</strong> {request.timeline}
                          </div>
                        )}

                        {request.proposedAmount && (
                          <div className="text-sm text-blue-900 mb-2">
                            <strong>Proposed Amount:</strong> {request.proposedAmount}
                          </div>
                        )}

                        <div className="text-sm text-blue-900 mt-3">
                          <strong>Message:</strong>
                          <p className="mt-1">{request.message}</p>
                        </div>
                      </div>

                      {request.status === 'pending' && (
                        <div className="flex gap-3">
                          <Button
                            className="bg-lime-500 hover:bg-green-700"
                            onClick={() => handleAccept(request.id, request.fromUserName)}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Accept Request
                          </Button>
                          <Button
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                            onClick={() => handleReject(request.id, request.fromUserName)}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Decline
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => requester && navigate(`/researcher/profile/${requester.id}`)}
                          >
                            View Profile
                          </Button>
                        </div>
                      )}

                      {request.status !== 'pending' && (
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => requester && navigate(`/researcher/profile/${requester.id}`)}
                          >
                            View Profile
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </ResearcherLayout>
  );
}
