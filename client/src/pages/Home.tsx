import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getJobs } from '@/api/jobs';
import { useToast } from '@/hooks/useToast';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  seniority: string;
  skills: string[];
  status?: string;
}

export function Home() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [seniorityFilter, setSeniorityFilter] = useState('all');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await getJobs();
        setJobs(response.jobs);
        setFilteredJobs(response.jobs);
      } catch (error) {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to load jobs',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [toast]);

  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (seniorityFilter !== 'all') {
      filtered = filtered.filter(job => job.seniority === seniorityFilter);
    }

    setFilteredJobs(filtered);
  }, [searchTerm, seniorityFilter, jobs]);

  const handleViewJob = (jobId: string) => {
    console.log(`Navigating to job details for jobId: ${jobId}`);
    navigate(`/job/${jobId}`);
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

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🚀 Rocket Virtual Recruiter
            </h1>
            <p className="text-muted-foreground mt-2">
              Find your perfect role and interview with our AI-powered recruiter
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/applications')}
            className="gap-2"
          >
            <Briefcase className="h-4 w-4" />
            Moje aplikacje
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Szukaj po tytule lub firmie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:col-span-2"
        />
        <Select value={seniorityFilter} onValueChange={setSeniorityFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Poziom seniority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Wszystkie poziomy</SelectItem>
            <SelectItem value="Junior">Junior</SelectItem>
            <SelectItem value="Mid">Mid</SelectItem>
            <SelectItem value="Senior">Senior</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Card
              key={job._id}
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/20"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </CardTitle>
                    <CardDescription className="text-sm">{job.company}</CardDescription>
                  </div>
                  {job.status === 'applied' && (
                    <Badge variant="secondary" className="whitespace-nowrap">
                      Applied
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {job.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={getSeniorityColor(job.seniority)}>
                    {job.seniority}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                  {job.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {job.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{job.skills.length - 3}
                    </Badge>
                  )}
                </div>

                <Button
                  onClick={() => handleViewJob(job._id)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
                >
                  <Zap className="h-4 w-4" />
                  {job.status === 'applied' ? 'Zobacz szczegóły' : 'Zobacz ofertę'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && filteredJobs.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No jobs found matching your criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}