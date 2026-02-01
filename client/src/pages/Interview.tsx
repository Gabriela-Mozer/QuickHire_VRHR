import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send, Loader2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/useToast';
import { getInterviewQuestions, submitAnswer } from '@/api/applications';

interface Question {
  id: string;
  question: string;
  estimatedTime: number;
}

interface Message {
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

export function Interview() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [answers, setAnswers] = useState<Array<{ questionId: string; answer: string }>>([]);

  useEffect(() => {
    const appId = sessionStorage.getItem('applicationId');
    if (!appId) {
      navigate(`/job/${jobId}/apply`);
      return;
    }
    setApplicationId(appId);

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await getInterviewQuestions(appId);
        setQuestions(response.questions);

        // Add initial AI message
        setMessages([
          {
            type: 'ai',
            content: 'Cześć! Jestem Rocket Virtual Recruiter. Przeprowadzę z Tobą rozmowę rekrutacyjną. Przygotowałem dla Ciebie kilka pytań na podstawie Twojego CV i wymagań stanowiska. Zacznijmy!',
            timestamp: new Date()
          },
          {
            type: 'ai',
            content: response.questions[0].question,
            timestamp: new Date()
          }
        ]);
      } catch (error) {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to load questions',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [jobId, navigate, toast]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim() || userAnswer.length < 20) {
      toast({
        title: 'Answer too short',
        description: 'Please provide a more detailed answer (at least 20 characters)',
        variant: 'destructive'
      });
      return;
    }

    try {
      setSubmitting(true);
      const currentQuestion = questions[currentQuestionIndex];

      // Submit answer to API
      await submitAnswer(applicationId, {
        questionId: currentQuestion.id,
        answer: userAnswer
      });

      // Add user message
      setMessages(prev => [...prev, {
        type: 'user',
        content: userAnswer,
        timestamp: new Date()
      }]);

      // Store answer
      setAnswers(prev => [...prev, {
        questionId: currentQuestion.id,
        answer: userAnswer
      }]);

      setUserAnswer('');

      // Check if there are more questions
      if (currentQuestionIndex < questions.length - 1) {
        // Add loading message
        setMessages(prev => [...prev, {
          type: 'ai',
          content: 'Analizujemy Twoją odpowiedź...',
          timestamp: new Date()
        }]);

        // Simulate processing time
        setTimeout(() => {
          const nextQuestion = questions[currentQuestionIndex + 1];
          setMessages(prev => [
            ...prev.slice(0, -1),
            {
              type: 'ai',
              content: nextQuestion.question,
              timestamp: new Date()
            }
          ]);
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }, 1500);
      } else {
        // All questions answered
        setMessages(prev => [...prev, {
          type: 'ai',
          content: 'Dziękuję za odpowiedzi! Teraz przejdziemy do sekcji, gdzie Ty możesz zadać pytania firmie.',
          timestamp: new Date()
        }]);

        // Redirect to reverse recruitment after a delay
        setTimeout(() => {
          sessionStorage.setItem('interviewAnswers', JSON.stringify(answers));
          navigate(`/job/${jobId}/reverse-recruitment`);
        }, 2000);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to submit answer',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Rozmowa rekrutacyjna</h1>
            <p className="text-muted-foreground">
              Pytanie {currentQuestionIndex + 1} z {questions.length}
            </p>
          </div>
        </div>
        <Badge variant="outline" className="gap-2">
          <Clock className="h-4 w-4" />
          ~{questions[currentQuestionIndex]?.estimatedTime || 2} min
        </Badge>
      </div>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/20 overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'ai' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                  message.type === 'ai'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-foreground'
                    : 'bg-purple-600 text-white'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString('pl-PL', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
      </Card>

      {/* Input Area */}
      {currentQuestionIndex < questions.length && (
        <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/20">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Twoja odpowiedź</label>
              <Textarea
                placeholder="Wpisz tutaj swoją odpowiedź..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={submitting}
                className="min-h-24"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{userAnswer.length}/500 znaków</span>
                {userAnswer.length < 20 && (
                  <span className="text-yellow-600">Minimum 20 znaków</span>
                )}
              </div>
            </div>

            <Button
              onClick={handleSubmitAnswer}
              disabled={submitting || userAnswer.length < 20}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? 'Wysyłanie...' : 'Wyślij odpowiedź'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}