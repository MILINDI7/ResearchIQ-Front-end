import { authApi } from '../../api/auth';
import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'researcher' | 'admin' | 'partner' | 'manager' | 'department_head';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  institution?: string;
  orcid?: string;
  expertise?: string[];
  publications?: number;
  citations?: number;
  hIndex?: number;
  verified?: boolean;
  accredited?: boolean;
  photo?: string;
}

export interface Research {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  keywords: string[];
  field: string;
  publicationDate: string;
  citations: number;
  doi?: string;
  researcherId: string;
  fundingStatus?: 'seeking' | 'funded' | 'completed';
  collaborators?: string[];
  likes?: number;
  comments?: number;
  shares?: number;
  coverImage?: string;
}

export interface PendingResearcher {
  id: string;
  name: string;
  email: string;
  education: string;
  degree: string;
  experience: number;
  institution: string;
  department: string;
  orcid: string;
  expertise: string[];
  publications: string[];
  cv: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
}

export interface CollaborationRequest {
  id: string;
  type: 'collaboration' | 'funding';
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  researchId?: string;
  researchTitle?: string;
  fundingId?: string;
  fundingTitle?: string;
  message: string;
  proposedAmount?: string;
  timeline?: string;
  collaborationType?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface FundingRequest {
  id: string;
  partnerName: string;
  partnerEmail: string;
  partnerContact: string;
  partnerOrg: string;
  researchId: string;
  researchTitle: string;
  toResearcherId: string;
  proposedAmount: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'collaboration' | 'funding' | 'publication' | 'citation' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface SystemAnnouncement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  createdAt: string;
  expiresAt?: string;
}

interface AppContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (data: any) => Promise<boolean>;
  researchers: User[];
  research: Research[];
  pendingResearchers: PendingResearcher[];
  collaborationRequests: CollaborationRequest[];
  fundingRequests: FundingRequest[];
  notifications: Notification[];
  systemAnnouncements: SystemAnnouncement[];
  approveResearcher: (id: string) => void;
  rejectResearcher: (id: string) => void;
  uploadResearch: (data: Partial<Research>) => void;
  createStaffAccount: (data: any) => void;
  likeResearch: (id: string) => void;
  deleteUser: (id: string) => void;
  sendCollaborationRequest: (data: Partial<CollaborationRequest>) => void;
  acceptCollaborationRequest: (id: string) => void;
  rejectCollaborationRequest: (id: string) => void;
  sendFundingRequest: (data: Omit<FundingRequest, 'id' | 'status' | 'createdAt'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const mockResearchers: User[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@university.edu',
    role: 'researcher',
    department: 'Computer Science',
    institution: 'Tech University',
    orcid: '0000-0001-2345-6789',
    expertise: ['Machine Learning', 'Natural Language Processing', 'AI Ethics'],
    publications: 45,
    citations: 1250,
    hIndex: 18,
    verified: true,
    accredited: true,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    id: '2',
    name: 'Prof. James Mitchell',
    email: 'j.mitchell@university.edu',
    role: 'researcher',
    department: 'Biotechnology',
    institution: 'Research Institute',
    orcid: '0000-0002-3456-7890',
    expertise: ['Genomics', 'Bioinformatics', 'Protein Engineering'],
    publications: 78,
    citations: 3420,
    hIndex: 32,
    verified: true,
    accredited: true,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James'
  },
  {
    id: '3',
    name: 'Dr. Maria Rodriguez',
    email: 'm.rodriguez@university.edu',
    role: 'researcher',
    department: 'Environmental Science',
    institution: 'Green University',
    orcid: '0000-0003-4567-8901',
    expertise: ['Climate Change', 'Sustainability', 'Environmental Policy'],
    publications: 34,
    citations: 890,
    hIndex: 15,
    verified: true,
    accredited: true,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
  },
  {
    id: '4',
    name: 'Dr. Ahmed Hassan',
    email: 'a.hassan@university.edu',
    role: 'researcher',
    department: 'Physics',
    institution: 'Tech University',
    orcid: '0000-0004-5678-9012',
    expertise: ['Quantum Computing', 'Photonics', 'Nanotechnology'],
    publications: 56,
    citations: 2100,
    hIndex: 24,
    verified: true,
    accredited: true,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed'
  },
  {
    id: '5',
    name: 'Prof. David Thompson',
    email: 'department.head@university.edu',
    role: 'department_head',
    department: 'Computer Science',
    institution: 'Tech University',
    orcid: '0000-0005-6789-0123',
    expertise: ['Department Leadership', 'Research Administration', 'AI Research'],
    publications: 92,
    citations: 4500,
    hIndex: 38,
    verified: true,
    accredited: true,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
  },
  {
    id: '6',
    name: 'Dr. Emily Watson',
    email: 'e.watson@university.edu',
    role: 'researcher',
    department: 'Computer Science',
    institution: 'Tech University',
    orcid: '0000-0006-7890-1234',
    expertise: ['Cybersecurity', 'Network Security', 'Cryptography'],
    publications: 38,
    citations: 920,
    hIndex: 16,
    verified: true,
    accredited: true,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
  },
  {
    id: '7',
    name: 'Dr. Michael Chang',
    email: 'm.chang@university.edu',
    role: 'researcher',
    department: 'Computer Science',
    institution: 'Tech University',
    orcid: '0000-0007-8901-2345',
    expertise: ['Computer Vision', 'Image Processing', 'Deep Learning'],
    publications: 52,
    citations: 1680,
    hIndex: 21,
    verified: true,
    accredited: true,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
  },
  {
    id: '8',
    name: 'Dr. Lisa Anderson',
    email: 'l.anderson@university.edu',
    role: 'researcher',
    department: 'Computer Science',
    institution: 'Tech University',
    orcid: '0000-0008-9012-3456',
    expertise: ['Software Engineering', 'Cloud Computing', 'DevOps'],
    publications: 29,
    citations: 745,
    hIndex: 13,
    verified: true,
    accredited: true,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa'
  }
];

const mockResearch: Research[] = [
  {
    id: 'r1',
    title: 'Advanced Neural Networks for Climate Prediction',
    abstract: 'This research explores the application of deep learning architectures for improving long-term climate prediction models...',
    authors: ['Dr. Sarah Chen', 'Dr. Maria Rodriguez'],
    keywords: ['Machine Learning', 'Climate Science', 'Neural Networks'],
    field: 'Computer Science',
    publicationDate: '2025-03-15',
    citations: 45,
    researcherId: '1',
    fundingStatus: 'funded',
    collaborators: ['1', '3'],
    likes: 234,
    comments: 18,
    shares: 45,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop'
  },
  {
    id: 'r2',
    title: 'Quantum Algorithms for Protein Folding Simulation',
    abstract: 'We present novel quantum computing algorithms that significantly accelerate protein folding simulations...',
    authors: ['Dr. Ahmed Hassan', 'Prof. James Mitchell'],
    keywords: ['Quantum Computing', 'Bioinformatics', 'Protein Structure'],
    field: 'Physics',
    publicationDate: '2025-02-20',
    citations: 78,
    researcherId: '4',
    fundingStatus: 'funded',
    collaborators: ['4', '2'],
    likes: 187,
    comments: 23,
    shares: 31,
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop'
  },
  {
    id: 'r3',
    title: 'AI-Driven Genomic Data Analysis Platform',
    abstract: 'Development of an automated platform for genomic data analysis using machine learning techniques...',
    authors: ['Prof. James Mitchell', 'Dr. Sarah Chen'],
    keywords: ['Genomics', 'AI', 'Data Analysis'],
    field: 'Biotechnology',
    publicationDate: '2025-01-10',
    citations: 123,
    researcherId: '2',
    fundingStatus: 'seeking',
    collaborators: ['2', '1'],
    likes: 156,
    comments: 12,
    shares: 28,
    coverImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&h=400&fit=crop'
  },
  {
    id: 'r4',
    title: 'Renewable Energy Storage Solutions at Scale',
    abstract: 'Novel approaches to grid-scale battery storage systems using advanced materials and AI optimization algorithms for renewable energy integration...',
    authors: ['Dr. Maria Rodriguez', 'Dr. Ahmed Hassan'],
    keywords: ['Renewable Energy', 'Energy Storage', 'Sustainability'],
    field: 'Environmental Science',
    publicationDate: '2025-04-05',
    citations: 34,
    researcherId: '3',
    fundingStatus: 'funded',
    collaborators: ['3', '4'],
    likes: 198,
    comments: 15,
    shares: 42,
    coverImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop'
  },
  {
    id: 'r5',
    title: 'Neuroplasticity in Adult Brain Development',
    abstract: 'Investigating how learning new skills affects neural pathways in adult brains, with implications for cognitive rehabilitation and lifelong learning...',
    authors: ['Dr. Sarah Chen'],
    keywords: ['Neuroscience', 'Brain Development', 'Cognitive Science'],
    field: 'Biotechnology',
    publicationDate: '2025-03-28',
    citations: 67,
    researcherId: '1',
    fundingStatus: 'completed',
    collaborators: ['1'],
    likes: 289,
    comments: 28,
    shares: 56,
    coverImage: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=400&fit=crop'
  }
];

const mockPendingResearchers: PendingResearcher[] = [
  {
    id: 'p1',
    name: 'Dr. Emily Watson',
    email: 'e.watson@email.com',
    education: 'PhD in Data Science',
    degree: 'PhD',
    experience: 5,
    institution: 'Tech University',
    department: 'Computer Science',
    orcid: '0000-0005-6789-0123',
    expertise: ['Data Mining', 'Statistical Analysis', 'Machine Learning'],
    publications: ['Publication 1', 'Publication 2', 'Publication 3'],
    cv: 'cv_emily_watson.pdf',
    status: 'pending',
    submittedDate: '2026-05-05'
  },
  {
    id: 'p2',
    name: 'Dr. Robert Kim',
    email: 'r.kim@email.com',
    education: 'PhD in Chemical Engineering',
    degree: 'PhD',
    experience: 7,
    institution: 'Research Institute',
    department: 'Chemistry',
    orcid: '0000-0006-7890-1234',
    expertise: ['Catalysis', 'Green Chemistry', 'Materials Science'],
    publications: ['Publication A', 'Publication B', 'Publication C', 'Publication D'],
    cv: 'cv_robert_kim.pdf',
    status: 'pending',
    submittedDate: '2026-05-07'
  }
];

const mockCollaborationRequests: CollaborationRequest[] = [
  {
    id: 'cr1',
    type: 'collaboration',
    fromUserId: '2',
    fromUserName: 'Prof. James Mitchell',
    toUserId: '1',
    researchId: 'r1',
    researchTitle: 'Advanced Neural Networks for Climate Prediction',
    message: 'Hi Dr. Chen, I\'m very interested in collaborating on this climate prediction research. My expertise in bioinformatics could complement your machine learning approach.',
    collaborationType: 'Joint Research',
    timeline: '6 months',
    status: 'pending',
    createdAt: '2026-05-08'
  },
  {
    id: 'cr2',
    type: 'collaboration',
    fromUserId: '4',
    fromUserName: 'Dr. Ahmed Hassan',
    toUserId: '1',
    researchId: 'r5',
    researchTitle: 'Neuroplasticity in Adult Brain Development',
    message: 'Your work on neuroplasticity is fascinating! I believe quantum computing could help model neural pathways more accurately. Would you be interested in exploring this?',
    collaborationType: 'Technical Collaboration',
    timeline: '3 months',
    status: 'pending',
    createdAt: '2026-05-07'
  }
];

const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'collaboration',
    title: 'New Collaboration Request',
    message: 'Prof. James Mitchell wants to collaborate on "Advanced Neural Networks for Climate Prediction"',
    read: false,
    createdAt: '2026-05-08T14:30:00Z',
    link: '/requests'
  },
  {
    id: 'n2',
    type: 'collaboration',
    title: 'New Collaboration Request',
    message: 'Dr. Ahmed Hassan wants to collaborate on "Neuroplasticity in Adult Brain Development"',
    read: false,
    createdAt: '2026-05-07T10:15:00Z',
    link: '/requests'
  },
  {
    id: 'n3',
    type: 'publication',
    title: 'Publication Milestone',
    message: 'Your paper "Advanced Neural Networks for Climate Prediction" reached 50 citations!',
    read: false,
    createdAt: '2026-05-06T16:45:00Z',
    link: '/my-profile'
  },
  {
    id: 'n4',
    type: 'funding',
    title: 'Funding Match Found',
    message: 'NSF AI Research Grant ($500K) matches your expertise - deadline in 15 days',
    read: true,
    createdAt: '2026-05-05T09:00:00Z',
    link: '/funding'
  },
  {
    id: 'n5',
    type: 'citation',
    title: 'New Citation',
    message: 'Your work was cited in "Quantum Approaches to Neural Network Optimization"',
    read: true,
    createdAt: '2026-05-04T11:20:00Z'
  }
];

const mockSystemAnnouncements: SystemAnnouncement[] = [
  {
    id: 'sa1',
    title: 'New AI-Powered Collaboration Matching',
    message: 'We\'ve launched an improved AI matching algorithm that finds better collaboration opportunities based on your research interests and citation patterns.',
    type: 'success',
    createdAt: '2026-05-08T08:00:00Z'
  },
  {
    id: 'sa2',
    title: 'System Maintenance Scheduled',
    message: 'Research IQ will undergo scheduled maintenance on May 15, 2026 from 2:00 AM to 4:00 AM EST. Some features may be temporarily unavailable.',
    type: 'warning',
    createdAt: '2026-05-07T12:00:00Z',
    expiresAt: '2026-05-15T04:00:00Z'
  },
  {
    id: 'sa3',
    title: 'New Data Integration Sources',
    message: 'We\'ve added support for Google Scholar and arXiv data integration. Research Managers can now sync publications from these sources.',
    type: 'info',
    createdAt: '2026-05-05T10:00:00Z'
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [researchers, setResearchers] = useState<User[]>(mockResearchers);
  const [research, setResearch] = useState<Research[]>(mockResearch);
  const [pendingResearchers, setPendingResearchers] = useState<PendingResearcher[]>(mockPendingResearchers);
  const [collaborationRequests, setCollaborationRequests] = useState<CollaborationRequest[]>(mockCollaborationRequests);
  const [fundingRequests, setFundingRequests] = useState<FundingRequest[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [systemAnnouncements] = useState<SystemAnnouncement[]>(mockSystemAnnouncements);

  const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await authApi.login(email, password);

    localStorage.setItem('token', response.token);

    if (response.refreshToken) {
      localStorage.setItem('refreshToken', response.refreshToken);
    }

    setUser(response.user);
    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

  const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  setUser(null);
};

  const signup = async (data: any): Promise<boolean> => {
  try {
    const response = await authApi.signup({
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'RESEARCHER',
    });

    localStorage.setItem('token', response.token);

    if (response.refreshToken) {
      localStorage.setItem('refreshToken', response.refreshToken);
    }

    setUser(response.user);
    return true;
  } catch (error) {
    console.error('Signup failed:', error);
    return false;
  }
};

  const approveResearcher = (id: string) => {
    const pending = pendingResearchers.find(p => p.id === id);
    if (pending) {
      const newResearcher: User = {
        id: `r${Date.now()}`,
        name: pending.name,
        email: pending.email,
        role: 'researcher',
        department: pending.department,
        institution: pending.institution,
        orcid: pending.orcid,
        expertise: pending.expertise,
        publications: pending.publications.length,
        citations: 0,
        hIndex: 0,
        verified: true,
        accredited: true,
        photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${pending.name}`
      };

      setResearchers(prev => [...prev, newResearcher]);
      setPendingResearchers(prev => prev.filter(p => p.id !== id));
    }
  };

  const rejectResearcher = (id: string) => {
    setPendingResearchers(prev => prev.filter(p => p.id !== id));
  };

  const uploadResearch = (data: Partial<Research>) => {
    const newResearch: Research = {
      id: `r${Date.now()}`,
      title: data.title || '',
      abstract: data.abstract || '',
      authors: data.authors || [user?.name || ''],
      keywords: data.keywords || [],
      field: data.field || '',
      publicationDate: new Date().toISOString().split('T')[0],
      citations: 0,
      researcherId: user?.id || '',
      fundingStatus: data.fundingStatus || 'seeking',
      collaborators: data.collaborators || [],
      likes: 0,
      comments: 0,
      shares: 0,
      coverImage: data.coverImage
    };

    setResearch(prev => [newResearch, ...prev]);
  };

  const createStaffAccount = (data: any) => {
    const newUser: User = {
      id: `u${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      institution: data.institution,
      department: data.department,
      verified: true,
      accredited: true
    };

    setResearchers(prev => [...prev, newUser]);
  };

  const likeResearch = (id: string) => {
    setResearch(prev => prev.map(r =>
      r.id === id ? { ...r, likes: (r.likes || 0) + 1 } : r
    ));
  };

  const deleteUser = (id: string) => {
    setResearchers(prev => prev.filter(r => r.id !== id));
  };

  const sendCollaborationRequest = (data: Partial<CollaborationRequest>) => {
    const newRequest: CollaborationRequest = {
      id: `cr${Date.now()}`,
      type: data.type || 'collaboration',
      fromUserId: user?.id || '',
      fromUserName: user?.name || '',
      toUserId: data.toUserId || '',
      researchId: data.researchId,
      researchTitle: data.researchTitle,
      fundingId: data.fundingId,
      fundingTitle: data.fundingTitle,
      message: data.message || '',
      proposedAmount: data.proposedAmount,
      timeline: data.timeline,
      collaborationType: data.collaborationType,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCollaborationRequests(prev => [...prev, newRequest]);
  };

  const acceptCollaborationRequest = (id: string) => {
    setCollaborationRequests(prev =>
      prev.map(req => req.id === id ? { ...req, status: 'accepted' as const } : req)
    );
  };

  const rejectCollaborationRequest = (id: string) => {
    setCollaborationRequests(prev =>
      prev.map(req => req.id === id ? { ...req, status: 'rejected' as const } : req)
    );
  };

  const sendFundingRequest = (data: Omit<FundingRequest, 'id' | 'status' | 'createdAt'>) => {
    const newRequest: FundingRequest = {
      ...data,
      id: `fr${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setFundingRequests(prev => [...prev, newRequest]);
    // Notify the researcher
    const newNotification: Notification = {
      id: `n${Date.now()}`,
      type: 'funding',
      title: 'Funding Interest Received',
      message: `${data.partnerName} from ${data.partnerOrg} is interested in funding "${data.researchTitle}". Proposed: ${data.proposedAmount}. Contact: ${data.partnerEmail}`,
      read: false,
      createdAt: new Date().toISOString(),
      link: '/requests',
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        researchers,
        research,
        pendingResearchers,
        collaborationRequests,
        fundingRequests,
        notifications,
        systemAnnouncements,
        approveResearcher,
        rejectResearcher,
        uploadResearch,
        createStaffAccount,
        likeResearch,
        deleteUser,
        sendCollaborationRequest,
        acceptCollaborationRequest,
        rejectCollaborationRequest,
        sendFundingRequest,
        markNotificationAsRead,
        markAllNotificationsAsRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
