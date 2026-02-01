import api from './api';

// Description: Submit a CV for analysis
// Endpoint: POST /api/applications/analyze-cv
// Request: { jobId: string, cvText: string, email: string }
// Response: { applicationId: string, matchPercentage: number, strengths: string[], gaps: string[], summary: string }
export const analyzeCv = (data: { jobId: string; cvText: string; email: string }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        applicationId: 'app_' + Math.random().toString(36).substr(2, 9),
        matchPercentage: 82,
        strengths: [
          'Strong React and TypeScript expertise with 5+ years of experience',
          'Proven track record of building scalable applications',
          'Experience with modern development tools and practices',
          'Excellent problem-solving and communication skills'
        ],
        gaps: [
          'Limited experience with PostgreSQL (mostly MongoDB)',
          'No prior experience with AWS services',
          'Limited DevOps knowledge'
        ],
        summary: 'Your profile shows a very good match for this position. You have strong React skills and relevant experience. We recommend proceeding with the interview to discuss your background further.'
      });
    }, 2000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/applications/analyze-cv', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Get interview questions for a job
// Endpoint: GET /api/applications/:applicationId/questions
// Request: {}
// Response: { questions: Array<{ id: string, question: string, estimatedTime: number }> }
export const getInterviewQuestions = (applicationId: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        questions: [
          {
            id: 'q1',
            question: 'Tell us about your most challenging React project and how you overcame the obstacles.',
            estimatedTime: 2
          },
          {
            id: 'q2',
            question: 'How do you approach performance optimization in large-scale React applications?',
            estimatedTime: 2
          },
          {
            id: 'q3',
            question: 'Describe your experience with TypeScript and why you prefer it over JavaScript.',
            estimatedTime: 2
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get(`/api/applications/${applicationId}/questions`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Submit an interview answer
// Endpoint: POST /api/applications/:applicationId/answers
// Request: { questionId: string, answer: string }
// Response: { success: boolean, message: string }
export const submitAnswer = (applicationId: string, data: { questionId: string; answer: string }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Answer submitted successfully'
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post(`/api/applications/${applicationId}/answers`, data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Submit a candidate question
// Endpoint: POST /api/applications/:applicationId/candidate-questions
// Request: { question: string }
// Response: { success: boolean, answer: string }
export const submitCandidateQuestion = (applicationId: string, data: { question: string }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      const answers: { [key: string]: string } = {
        'Jak wygląda typowy dzień w zespole?': 'Nasz typowy dzień zaczyna się o 9:00 standup\'em, gdzie omawiamy bieżące zadania. Pracujemy w sprintach 2-tygodniowych. Mamy elastyczne godziny pracy, więc możesz pracować kiedy chcesz, o ile jesteś dostępny podczas core hours (10:00-16:00). Popołudnia to zazwyczaj focused work time z okazjonalnymi code review\'ami.',
        'Jakie narzędzia używacie?': 'Używamy nowoczesnego stack\'u: React, TypeScript, Node.js, PostgreSQL, Docker, Kubernetes. Do komunikacji mamy Slack, do projektów Jira, a do version control Git. Wszystkie narzędzia są open-source lub mają dobre wsparcie.',
        'Jak wygląda proces onboardingu?': 'Onboarding trwa około 2 tygodni. Pierwszy dzień to zapoznanie się z zespołem i infrastrukturą. Drugi tydzień to małe zadania, aby poznać codebase. Masz dedykowanego mentora, który Ci pomoże. Po 2 tygodniach jesteś gotów do pełnoprawnych zadań.',
        'Jakie są możliwości rozwoju?': 'Oferujemy budżet na szkolenia i konferencje. Możesz pracować nad własnymi projektami. Mamy program mentoringu. Ścieżka kariery jest jasna - od Junior do Senior, a potem możliwość przejścia na stanowisko Tech Lead lub Architect.',
        'Jaka jest kultura firmy?': 'Nasza kultura opiera się na transparentności, współpracy i ciągłym uczeniu się. Cenimy work-life balance i elastyczność. Mamy regularne team building\'i i social events. Każdy głos jest ważny, niezależnie od stanowiska.'
      };

      const answer = Object.entries(answers).find(([key]) => 
        data.question.toLowerCase().includes(key.toLowerCase())
      )?.[1] || 'Dziękujemy za pytanie! To świetne pytanie. Chętnie omówimy to bardziej szczegółowo podczas rozmowy. Możesz również skontaktować się z naszym zespołem HR, który chętnie odpowie na wszystkie Twoje pytania.';

      resolve({
        success: true,
        answer: answer
      });
    }, 1500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post(`/api/applications/${applicationId}/candidate-questions`, data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Complete an interview
// Endpoint: POST /api/applications/:applicationId/complete
// Request: { answers: Array<{ questionId: string, answer: string }>, candidateQuestions: Array<{ question: string, answer: string }> }
// Response: { success: boolean, reportUrl: string, message: string }
export const completeInterview = (applicationId: string, data: { answers: Array<{ questionId: string; answer: string }>; candidateQuestions: Array<{ question: string; answer: string }> }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        reportUrl: '/reports/report_' + applicationId + '.pdf',
        message: 'Interview completed successfully'
      });
    }, 1000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post(`/api/applications/${applicationId}/complete`, data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Get user applications
// Endpoint: GET /api/applications
// Request: {}
// Response: { applications: Array<{ _id: string, jobId: string, jobTitle: string, company: string, status: string, matchPercentage: number, appliedAt: string }> }
export const getApplications = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        applications: [
          {
            _id: 'app_1',
            jobId: '1',
            jobTitle: 'Senior React Developer',
            company: 'TechCorp',
            status: 'completed',
            matchPercentage: 82,
            appliedAt: '2024-01-15T10:30:00Z'
          },
          {
            _id: 'app_2',
            jobId: '2',
            jobTitle: 'Full Stack Developer',
            company: 'StartupXYZ',
            status: 'in_progress',
            matchPercentage: 75,
            appliedAt: '2024-01-16T14:20:00Z'
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/applications');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};