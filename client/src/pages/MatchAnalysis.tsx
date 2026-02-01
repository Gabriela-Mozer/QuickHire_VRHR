import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/useToast';

interface MatchData {
  applicationId: string;
  matchPercentage: number;
  strengths: string[];
  gaps: string[];
  summary: string;
  cvHighlights?: string[];
}

export function MatchAnalysis() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { toast } = useToast();
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = sessionStorage.getItem('applicationData');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setMatchData(parsed);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load match data',
          variant: 'destructive'
        });
        navigate(`/job/${jobId}/apply`);
      }
    } else {
      navigate(`/job/${jobId}/apply`);
    }
    setLoading(false);
  }, [jobId, navigate, toast]);

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMatchLabel = (percentage: number) => {
    if (percentage >= 80) return 'Świetne dopasowanie! 🎉';
    if (percentage >= 50) return 'Dobre dopasowanie! 👍';
    return 'Są pewne braki, ale możemy o tym pogadać 💪';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-600';
    if (percentage >= 50) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  if (loading || !matchData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Analiza dopasowania</h1>
          <p className="text-muted-foreground">Your CV match analysis results</p>
        </div>
      </div>

      {/* Match Percentage Card */}
      <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/20">
        <CardContent className="pt-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Circular Progress */}
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted-foreground/20"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${(matchData.matchPercentage / 100) * 283} 283`}
                  className={`transition-all duration-1000 ${getMatchColor(matchData.matchPercentage)}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-5xl font-bold ${getMatchColor(matchData.matchPercentage)}`}>
                  {matchData.matchPercentage}%
                </span>
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className={`text-2xl font-semibold ${getMatchColor(matchData.matchPercentage)}`}>
                {getMatchLabel(matchData.matchPercentage)}
              </p>
              <p className="text-muted-foreground max-w-md">
                {matchData.summary}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CV Highlights - Show that CV was read */}
      {matchData.cvHighlights && matchData.cvHighlights.length > 0 && (
        <Card className="backdrop-blur-sm bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200/50 dark:border-blue-800/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
              Co zauważyliśmy w Twoim CV
            </CardTitle>
            <CardDescription>
              Przeanalizowaliśmy Twoje doświadczenie i umiejętności
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {matchData.cvHighlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-lg bg-white/60 dark:bg-slate-900/60"
                >
                  <span className="text-sm text-foreground">{highlight}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Strengths and Gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Mocne strony
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {matchData.strengths.map((strength, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-sm text-foreground">{strength}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Gaps */}
        <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              Braki
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {matchData.gaps.map((gap, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                </div>
                <p className="text-sm text-foreground">{gap}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
        >
          Wróć do ofert
        </Button>
        <Button
          onClick={() => {
            sessionStorage.setItem('applicationId', matchData.applicationId);
            navigate(`/job/${jobId}/interview`);
          }}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Przejdź do rozmowy
        </Button>
      </div>
    </div>
  );
}