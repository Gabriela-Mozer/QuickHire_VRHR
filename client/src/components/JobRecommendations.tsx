import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, TrendingUp, MapPin, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface JobRecommendation {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  seniority: string;
  skills: string[];
  matchPercentage: number;
  reason: string;
}

interface JobRecommendationsProps {
  recommendations: JobRecommendation[];
  isOpen: boolean;
  onClose: () => void;
}

export function JobRecommendations({ recommendations, isOpen, onClose }: JobRecommendationsProps) {
  const navigate = useNavigate();

  const handleViewJob = (jobId: string) => {
    console.log(`Navigating to recommended job: ${jobId}`);
    onClose();
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

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    return 'text-yellow-600';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return '[&>div]:bg-green-600';
    if (percentage >= 60) return '[&>div]:bg-blue-600';
    return '[&>div]:bg-yellow-600';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-blue-600" />
            Polecane oferty dla Ciebie
          </DialogTitle>
          <DialogDescription>
            Na podstawie Twojego CV i umiejętności znalazłem inne oferty, które mogą Cię zainteresować! 😊
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {recommendations.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                Hmm, nie znalazłem teraz innych ofert które by pasowały... Ale warto sprawdzić ponownie za jakiś czas! 🔍
              </p>
            </Card>
          ) : (
            recommendations.map((job, index) => (
              <Card
                key={job._id}
                className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/20"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {index === 0 && (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Top match!
                          </Badge>
                        )}
                        <Badge className={getSeniorityColor(job.seniority)}>
                          {job.seniority}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-1">
                        <span>{job.company}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getMatchColor(job.matchPercentage)}`}>
                        {job.matchPercentage}%
                      </div>
                      <div className="text-xs text-muted-foreground">dopasowanie</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Match Progress */}
                  <Progress value={job.matchPercentage} className={getProgressColor(job.matchPercentage)} />

                  {/* Reason */}
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-900 dark:text-blue-100 flex items-start gap-2">
                      <Sparkles className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{job.reason}</span>
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground">{job.description}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {job.skills.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.skills.length - 4}
                      </Badge>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => handleViewJob(job._id)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
                  >
                    Zobacz szczegóły oferty
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Zamknij
          </Button>
          <Button
            onClick={() => {
              onClose();
              navigate('/');
            }}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Zobacz wszystkie oferty
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
