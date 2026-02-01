import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/useToast';
import { analyzeCv } from '@/api/applications';

export function CvUpload() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('file');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvText, setCvText] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Maximum file size is 5MB',
          variant: 'destructive'
        });
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        toast({
          title: 'Invalid file format',
          description: 'Please upload a PDF or Word document',
          variant: 'destructive'
        });
        return;
      }
      setCvFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange({ target: { files: e.dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleSubmit = async () => {
    if (!email) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address',
        variant: 'destructive'
      });
      return;
    }

    if (!email.includes('@')) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address',
        variant: 'destructive'
      });
      return;
    }

    if (activeTab === 'file' && !cvFile) {
      toast({
        title: 'File required',
        description: 'Please upload a CV file',
        variant: 'destructive'
      });
      return;
    }

    if (activeTab === 'text' && !cvText.trim()) {
      toast({
        title: 'CV text required',
        description: 'Please paste your CV content',
        variant: 'destructive'
      });
      return;
    }

    try {
      setLoading(true);
      const response = await analyzeCv({
        jobId: jobId || '',
        cvText: activeTab === 'file' ? 'CV from file: ' + cvFile?.name : cvText,
        email
      });

      toast({
        title: 'CV analyzed successfully',
        description: 'Redirecting to match analysis...'
      });

      // Store application data and CV text in session storage for next page
      sessionStorage.setItem('applicationData', JSON.stringify(response));
      sessionStorage.setItem('cvText', activeTab === 'file' ? 'CV from file: ' + cvFile?.name : cvText);
      console.log('CV text stored in session storage for recommendations');
      navigate(`/job/${jobId}/match`);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to analyze CV',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
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
          <h1 className="text-3xl font-bold">Prześlij swoje CV</h1>
          <p className="text-muted-foreground">Upload your CV for analysis</p>
        </div>
      </div>

      {/* Main Card */}
      <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/20">
        <CardHeader>
          <CardTitle>CV Upload</CardTitle>
          <CardDescription>Choose how you'd like to submit your CV</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} disabled={loading}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="file">Plik</TabsTrigger>
              <TabsTrigger value="text">Tekst</TabsTrigger>
            </TabsList>

            {/* File Tab */}
            <TabsContent value="file" className="space-y-4">
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
              >
                <input
                  type="file"
                  id="cv-file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  disabled={loading}
                />
                <label htmlFor="cv-file" className="cursor-pointer space-y-2">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="font-medium">Kliknij aby wybrać plik</p>
                  <p className="text-sm text-muted-foreground">lub przeciągnij i upuść</p>
                  <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (max 5MB)</p>
                </label>
              </div>

              {cvFile && (
                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                  <FileText className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-green-900 dark:text-green-100">
                      {cvFile.name}
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-300">
                      {(cvFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCvFile(null)}
                    disabled={loading}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Text Tab */}
            <TabsContent value="text" className="space-y-4">
              <Textarea
                placeholder="Wklej tutaj treść Twojego CV..."
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                className="min-h-64"
                disabled={loading}
              />
              <div className="text-sm text-muted-foreground">
                {cvText.length} characters
              </div>
            </TabsContent>
          </Tabs>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Anuluj
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? 'Analizujemy Twoje CV...' : 'Analizuj CV'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}