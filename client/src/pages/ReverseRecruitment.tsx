import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/useToast';
import { submitCandidateQuestion, completeInterview } from '@/api/applications';

interface Message {
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  'Jak wygląda typowy dzień w zespole?',
  'Jakie narzędzia używacie?',
  'Jak wygląda proces onboardingu?',
  'Jakie są możliwości rozwoju?',
  'Jaka jest kultura firmy?'
];

export function ReverseRecruitment() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      content: 'Teraz Twoja kolej! 🎯 O co chcesz zapytać firmę? Możesz pytać o zespół, workflow, narzędzia, kulturę lub cokolwiek innego, co Cię interesuje.',
      timestamp: new Date()
    }
  ]);
  const [userQuestion, setUserQuestion] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [candidateQuestions, setCandidateQuestions] = useState<Array<{ question: string; answer: string }>>([]);
  const [answers, setAnswers] = useState<Array<{ questionId: string; answer: string }>>([]);

  useEffect(() => {
    const appId = sessionStorage.getItem('applicationId');
    const interviewAnswers = sessionStorage.getItem('interviewAnswers');
    if (!appId) {
      navigate(`/job/${jobId}/apply`);
      return;
    }
    setApplicationId(appId);
    if (interviewAnswers) {
      setAnswers(JSON.parse(interviewAnswers));
    }
  }, [jobId, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSuggestedQuestion = (question: string) => {
    setUserQuestion(question);
  };

  const handleSubmitQuestion = async () => {
    if (!userQuestion.trim()) {
      toast({
        title: 'Question required',
        description: 'Please enter a question',
        variant: 'destructive'
      });
      return;
    }

    try {
      setSubmitting(true);

      // Add user question to messages
      setMessages(prev => [...prev, {
        type: 'user',
        content: userQuestion,
        timestamp: new Date()
      }]);

      // Add loading message
      setMessages(prev => [...prev, {
        type: 'ai',
        content: 'Przygotowuję odpowiedź...',
        timestamp: new Date()
      }]);

      // Submit question and get answer
      const response = await submitCandidateQuestion(applicationId, {
        question: userQuestion
      });

      // Replace loading message with actual answer
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          type: 'ai',
          content: response.answer,
          timestamp: new Date()
        }
      ]);

      // Store question and answer
      setCandidateQuestions(prev => [...prev, {
        question: userQuestion,
        answer: response.answer
      }]);

      setUserQuestion('');
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to submit question',
        variant: 'destructive'
      });
      // Remove the loading message on error
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setSubmitting(false);
    }
  };

  const handleFinish = async () => {
    try {
      setSubmitting(true);
      await completeInterview(applicationId, {
        answers,
        candidateQuestions
      });

      sessionStorage.removeItem('applicationData');
      sessionStorage.removeItem('applicationId');
      sessionStorage.removeItem('interviewAnswers');

      navigate(`/job/${jobId}/complete`);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to complete interview',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
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
          <h1 className="text-3xl font-bold">Pytania do firmy</h1>
          <p className="text-muted-foreground">Ask questions about the company and role</p>
        </div>
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

      {/* Suggested Questions */}
      <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/20">
        <CardHeader>
          <CardTitle className="text-base">Sugerowane pytania</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {SUGGESTED_QUESTIONS.map((question) => (
              <Button
                key={question}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestedQuestion(question)}
                disabled={submitting}
                className="justify-start text-left h-auto py-2 px-3"
              >
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Input Area */}
      <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/20">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Zadaj swoje pytanie</label>
            <Textarea
              placeholder="O co chcesz zapytać firmę?"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              disabled={submitting}
              className="min-h-20"
            />
            <div className="text-xs text-muted-foreground">
              {userQuestion.length}/300 znaków
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleSubmitQuestion}
              disabled={submitting || !userQuestion.trim()}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Wyślij pytanie
            </Button>
            <Button
              onClick={handleFinish}
              disabled={submitting}
              variant="outline"
            >
              Gotowe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}