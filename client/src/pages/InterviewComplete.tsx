import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2, Download, Share2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/useToast';

interface SessionData {
  matchPercentage: number;
  questionsAnswered: number;
  questionsAsked: number;
  duration: string;
  email: string;
}

export function InterviewComplete() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { toast } = useToast();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  useEffect(() => {
    // Simulate session data
    setSessionData({
      matchPercentage: 82,
      questionsAnswered: 3,
      questionsAsked: 2,
      duration: '12 minut',
      email: 'candidate@example.com'
    });
  }, []);

  const handleDownloadReport = () => {
    toast({
      title: 'Report downloaded',
      description: 'Your interview report has been downloaded as PDF'
    });
  };

  const handleShare = () => {
    toast({
      title: 'Share link copied',
      description: 'Interview link copied to clipboard'
    });
  };

  return (
    <div className="space-y-8">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-600/20 rounded-full blur-xl animate-pulse" />
            <CheckCircle2 className="h-20 w-20 text-green-600 relative" />
          </div>
        </div>
        <h1 className="text-4xl font-bold">Dziękujemy za rozmowę! 🚀</h1>
        <p className="text-muted-foreground text-lg">
          Twoja rozmowa rekrutacyjna została pomyślnie ukończona
        </p>
      </div>

      {/* Session Summary */}
      {sessionData && (
        <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/20">
          <CardHeader>
            <CardTitle>Podsumowanie sesji</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Dopasowanie</p>
              <p className="text-3xl font-bold text-green-600">{sessionData.matchPercentage}%</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Odpowiedzi</p>
              <p className="text-3xl font-bold text-blue-600">{sessionData.questionsAnswered}/3</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Pytania</p>
              <p className="text-3xl font-bold text-purple-600">{sessionData.questionsAsked}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Czas</p>
              <p className="text-3xl font-bold text-amber-600">{sessionData.duration}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Critical Message */}
      <Alert className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
        <AlertTitle className="text-lg font-semibold flex items-center gap-2">
          🎯 U nas nikt nie wpada do czarnej dziury
        </AlertTitle>
        <AlertDescription className="mt-4 space-y-3 text-foreground">
          <p>
            Niezależnie od wyniku, otrzymasz spersonalizowaną wiadomość e-mail z ostateczną decyzją i feedbackiem, gdy tylko zespół przejrzy raport z tej rozmowy.
          </p>
          <div className="bg-white/50 dark:bg-slate-900/50 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="font-semibold text-sm">Średni czas odpowiedzi: 3-5 dni roboczych</p>
            <p className="text-sm text-muted-foreground mt-1">
              Zawsze będziesz wiedzieć, na jakim etapie jesteś w procesie rekrutacji.
            </p>
          </div>
        </AlertDescription>
      </Alert>

      {/* Email Confirmation */}
      {sessionData && (
        <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-medium">Wysłaliśmy potwierdzenie na:</p>
                <p className="text-sm text-muted-foreground">{sessionData.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Button
          onClick={handleDownloadReport}
          variant="outline"
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Pobierz raport
        </Button>
        <Button
          onClick={handleShare}
          variant="outline"
          className="gap-2"
        >
          <Share2 className="h-4 w-4" />
          Podziel się opinią
        </Button>
        <Button
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Wróć do ofert pracy
        </Button>
      </div>

      {/* Additional Info */}
      <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/20">
        <CardHeader>
          <CardTitle className="text-base">Co dalej?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex gap-3">
            <Badge className="bg-blue-600 flex-shrink-0">1</Badge>
            <p>Zespół przejrzy Twój raport z rozmowy</p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-purple-600 flex-shrink-0">2</Badge>
            <p>Otrzymasz spersonalizowaną wiadomość e-mail z decyzją</p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-green-600 flex-shrink-0">3</Badge>
            <p>Jeśli przejdziesz dalej, skontaktujemy się z Tobą w celu omówienia następnych kroków</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}