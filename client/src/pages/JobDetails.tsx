import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin, Building2, Clock, DollarSign, Users, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getJobById } from '@/api/jobs';
import { useToast } from '@/hooks/useToast';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  fullDescription: string;
  seniority: string;
  skills: string[];
  employmentType?: string;
  experienceYears?: string;
  salary?: string;
  teamSize?: string;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
}

export function JobDetails() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { toast } = useToast();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!jobId) {
        navigate('/');
        return;
      }

      try {
        setLoading(true);
        console.log(`Fetching job details for jobId: ${jobId}`);
        const response = await getJobById(jobId);
        setJob(response.job);
        console.log('Job details loaded successfully', response.job);
      } catch (error) {
        console.error('Error fetching job details:', error);
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to load job details',
          variant: 'destructive'
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId, navigate, toast]);

  const handleApply = () => {
    console.log(`Navigating to apply page for job: ${jobId}`);
    navigate(`/job/${jobId}/apply`);
  };

  const getSeniorityColor = (seniority: string) => {
    switch (seniority) {
      case 'Junior':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Mid':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Senior':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2 animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse" />
          </div>
        </div>
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
          className="hover:bg-white/50 dark:hover:bg-slate-800/50"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {job.title}
          </h1>
          <p className="text-muted-foreground flex items-center gap-2 mt-1">
            <Building2 className="h-4 w-4" />
            {job.company}
          </p>
        </div>
        <Button
          onClick={handleApply}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2 shadow-lg"
        >
          <Zap className="h-5 w-5" />
          Aplikuj teraz
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Card */}
          <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
                Przegląd stanowiska
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{job.location}</span>
                </div>
                {job.employmentType && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{job.employmentType}</span>
                  </div>
                )}
                {job.experienceYears && (
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{job.experienceYears} lat doświadczenia</span>
                  </div>
                )}
                {job.salary && (
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>{job.salary}</span>
                  </div>
                )}
                {job.teamSize && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Zespół: {job.teamSize} osób</span>
                  </div>
                )}
              </div>
              <Separator />
              <div>
                <Badge className={getSeniorityColor(job.seniority)}>
                  {job.seniority}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Description Card */}
          <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/20">
            <CardHeader>
              <CardTitle>Opis stanowiska</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">{job.description}</p>
              {job.fullDescription && (
                <>
                  <Separator />
                  <p className="text-muted-foreground leading-relaxed">{job.fullDescription}</p>
                </>
              )}
            </CardContent>
          </Card>

          {/* Responsibilities Card */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/20">
              <CardHeader>
                <CardTitle>Obowiązki</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Requirements Card */}
          {job.requirements && job.requirements.length > 0 && (
            <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/20">
              <CardHeader>
                <CardTitle>Wymagania</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Benefits Card */}
          {job.benefits && job.benefits.length > 0 && (
            <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/20">
              <CardHeader>
                <CardTitle>Co oferujemy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Skills Card */}
          <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/20 sticky top-6">
            <CardHeader>
              <CardTitle>Wymagane umiejętności</CardTitle>
              <CardDescription>Technologie używane w projekcie</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Apply Card */}
          <Card className="backdrop-blur-sm bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-200/50 dark:border-blue-800/50">
            <CardHeader>
              <CardTitle>Gotowy do aplikowania?</CardTitle>
              <CardDescription>
                Prześlij swoje CV i rozpocznij proces rekrutacji z AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleApply}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2 shadow-lg"
                size="lg"
              >
                <Zap className="h-5 w-5" />
                Aplikuj teraz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
