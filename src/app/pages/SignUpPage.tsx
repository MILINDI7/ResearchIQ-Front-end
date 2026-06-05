import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Brain, ArrowLeft, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import { Card } from '../components/ui/card';

export function SignUpPage() {
  const navigate = useNavigate();
  const { signup } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'researcher',
    institution: '',
    department: '',
    orcid: '',
    degree: '',
    education: '',
    experience: '',
    expertise: '',
    publications: '',
    cv: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const success = signup(formData);
    if (success) {
      toast.success('Application submitted successfully! You will receive an email once your account is reviewed.');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      toast.error('Failed to submit application');
    }
  };

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Research IQ
            </span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <StepIndicator number={1} title="Basic Info" active={step === 1} completed={step > 1} />
            <div className="flex-1 h-1 bg-gray-200 mx-4">
              <div className={`h-full bg-gradient-to-r from-blue-600 to-green-600 transition-all ${step > 1 ? 'w-full' : 'w-0'}`} />
            </div>
            <StepIndicator number={2} title="Accreditation" active={step === 2} completed={step > 2} />
            <div className="flex-1 h-1 bg-gray-200 mx-4">
              <div className={`h-full bg-gradient-to-r from-blue-600 to-green-600 transition-all ${step > 2 ? 'w-full' : 'w-0'}`} />
            </div>
            <StepIndicator number={3} title="Expertise" active={step === 3} completed={step > 3} />
          </div>
        </div>

        <Card className="p-8 bg-white shadow-lg">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Create Researcher Account</h2>
                  <p className="text-gray-600">Apply to join Research IQ as an accredited researcher</p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <p className="text-sm text-blue-900">
                      <strong>Note:</strong> This signup is for researchers only. Partner and Research Manager accounts are created by institutional administrators.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateForm('name', e.target.value)}
                      placeholder="Dr. Jane Smith"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateForm('email', e.target.value)}
                      placeholder="jane.smith@university.edu"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => updateForm('password', e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => updateForm('confirmPassword', e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="institution">Institution *</Label>
                    <Input
                      id="institution"
                      value={formData.institution}
                      onChange={(e) => updateForm('institution', e.target.value)}
                      placeholder="Tech University"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department *</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => updateForm('department', e.target.value)}
                      placeholder="Computer Science"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="orcid">ORCID iD *</Label>
                  <Input
                    id="orcid"
                    value={formData.orcid}
                    onChange={(e) => updateForm('orcid', e.target.value)}
                    placeholder="0000-0001-2345-6789"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Don't have an ORCID? <a href="https://orcid.org/register" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Register here</a>
                  </p>
                </div>

                <Button
                  type="button"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Accreditation Requirements</h2>
                  <p className="text-gray-600">Help us verify your research credentials</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-900">
                      <p className="font-semibold mb-1">To be a fully accredited researcher, you must meet ONE of the following:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Hold an undergraduate degree (or higher) with significant mathematics or statistics component</li>
                        <li>Demonstrate at least 3 years of quantitative research experience</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="degree">Highest Degree *</Label>
                  <Select value={formData.degree} onValueChange={(value) => updateForm('degree', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phd">PhD / Doctorate</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="education">Educational Background *</Label>
                  <Textarea
                    id="education"
                    value={formData.education}
                    onChange={(e) => updateForm('education', e.target.value)}
                    placeholder="PhD in Computer Science, Stanford University (2020)&#10;MSc in Artificial Intelligence, MIT (2015)"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Years of Research Experience *</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) => updateForm('experience', e.target.value)}
                    placeholder="5"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cv">Upload CV / Resume *</Label>
                  <div className="mt-2">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          {formData.cv ? formData.cv.name : 'Click to upload or drag and drop'}
                        </p>
                        <p className="text-xs text-gray-400">PDF, DOC, or DOCX (MAX. 5MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => updateForm('cv', e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    onClick={() => setStep(3)}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Research Expertise</h2>
                  <p className="text-gray-600">Tell us about your research areas and publications</p>
                </div>

                <div>
                  <Label htmlFor="expertise">Research Expertise & Keywords *</Label>
                  <Input
                    id="expertise"
                    value={formData.expertise}
                    onChange={(e) => updateForm('expertise', e.target.value)}
                    placeholder="Machine Learning, Natural Language Processing, Deep Learning"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Separate multiple areas with commas</p>
                </div>

                <div>
                  <Label htmlFor="publications">Key Publications *</Label>
                  <Textarea
                    id="publications"
                    value={formData.publications}
                    onChange={(e) => updateForm('publications', e.target.value)}
                    placeholder="Smith, J. (2023). Advanced Neural Networks. Nature, 123(4), 456-789.&#10;Smith, J., & Doe, J. (2022). Deep Learning Applications. Science, 234(5), 890-123."
                    rows={6}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">List your most significant publications (one per line)</p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-green-900">
                      <p className="font-semibold mb-1">Almost there!</p>
                      <p>Once you submit, your application will be reviewed by our institutional administrators. You'll receive an email notification within 2-3 business days.</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  >
                    Submit Application
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Card>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:underline font-medium"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ number, title, active, completed }: {
  number: number;
  title: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${
          completed
            ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white'
            : active
            ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white'
            : 'bg-gray-200 text-gray-400'
        }`}
      >
        {completed ? <CheckCircle2 className="w-6 h-6" /> : number}
      </div>
      <div className={`text-sm font-medium ${active || completed ? 'text-blue-600' : 'text-gray-400'}`}>
        {title}
      </div>
    </div>
  );
}
