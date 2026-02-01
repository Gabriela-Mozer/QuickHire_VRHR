import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertCircle, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/useToast';
import { getRecommendedJobs } from '@/api/jobs';
import { JobRecommendations } from '@/components/JobRecommendations';

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
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState<Array<{
    _id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    seniority: string;
    skills: string[];
    matchPercentage: number;
    reason: string;
  }>>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

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

  const handleFindAlternatives = async () => {
    console.log('Finding alternative job recommendations');
    setLoadingRecommendations(true);

    try {
      // Get CV text from session storage
      const applicationData = sessionStorage.getItem('applicationData');
      const cvText = sessionStorage.getItem('cvText') || '';

      const response = await getRecommendedJobs({
        cvText: cvText,
        currentJobId: jobId || '',
        matchPercentage: matchData?.matchPercentage || 0
      });

      console.log(`Found ${response.recommendations.length} job recommendations`);
      setRecommendations(response.recommendations);
      setShowRecommendations(true);
    } catch (error) {
      console.error('Error fetching job recommendations:', error);
      toast({
        title: 'Ups!',
        description: 'Nie udało się znaleźć innych ofert. Spróbuj ponownie.',
        variant: 'destructive'
      });
    } finally {
      setLoadingRecommendations(false);
    }
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

      {/* Decision Card */}
      <Card className="backdrop-blur-sm bg-gradient-to-br from-white to-purple-50 dark:from-slate-900 dark:to-purple-950/30 border-purple-200/50 dark:border-purple-800/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-purple-600" />
            Co dalej?
          </CardTitle>
          <CardDescription>
            Zdecyduj, czy chcesz kontynuować proces rekrutacji na to stanowisko
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Na podstawie analizy Twojego CV widzę, że masz {matchData.matchPercentage}% dopasowania do tej roli.
            {matchData.matchPercentage >= 80 ? ' To świetny wynik! 🎉' : matchData.matchPercentage >= 60 ? ' To solidny wynik! 👍' : ' Są pewne braki, ale możemy o tym pogadać.'}
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Chcesz kontynuować?</strong> Przejdziemy do rozmowy z AI, gdzie omówimy Twoje doświadczenie.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Wolisz zobaczyć inne oferty?</strong> Mogę znaleźć dla Ciebie alternatywne stanowiska, które mogą lepiej pasować do Twojego profilu! 😊
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
            <Button
              onClick={handleFindAlternatives}
              disabled={loadingRecommendations}
              variant="outline"
              className="h-auto py-4 flex flex-col items-start gap-2 hover:bg-blue-50 dark:hover:bg-blue-950/30"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Pokaż mi inne oferty</span>
              </div>
              <span className="text-xs text-muted-foreground text-left">
                {loadingRecommendations ? 'Szukam dla Ciebie...' : 'Znajdź lepsze dopasowanie'}
              </span>
            </Button>

            <Button
              onClick={() => {
                console.log('Candidate decided to continue with interview');
                sessionStorage.setItem('applicationId', matchData.applicationId);
                navigate(`/job/${jobId}/interview`);
              }}
              className="h-auto py-4 flex flex-col items-start gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-semibold">Tak, chcę kontynuować!</span>
              </div>
              <span className="text-xs opacity-90 text-left">
                Przejdź do rozmowy rekrutacyjnej
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alternative: Back to offers button */}
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Wróć do wszystkich ofert
        </Button>
      </div>

      {/* Job Recommendations Modal */}
      <JobRecommendations
        recommendations={recommendations}
        isOpen={showRecommendations}
        onClose={() => setShowRecommendations(false)}
      />
    </div>
  );
}