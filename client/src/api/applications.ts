import api from './api';

// Description: Submit a CV for analysis
// Endpoint: POST /api/applications/analyze-cv
// Request: { jobId: string, cvText: string, email: string }
// Response: { applicationId: string, matchPercentage: number, strengths: string[], gaps: string[], summary: string, cvHighlights: string[] }
export const analyzeCv = (data: { jobId: string; cvText: string; email: string }) => {
  // Mocking the response - simulating CV content analysis
  const cvText = data.cvText.toLowerCase();
  const hasReact = cvText.includes('react') || cvText.includes('frontend');
  const hasTypeScript = cvText.includes('typescript') || cvText.includes('ts');
  const hasNode = cvText.includes('node') || cvText.includes('backend');
  const hasDatabase = cvText.includes('database') || cvText.includes('sql') || cvText.includes('mongo');

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        applicationId: 'app_' + Math.random().toString(36).substr(2, 9),
        matchPercentage: 82,
        strengths: [
          hasReact ? 'Widzę solidne doświadczenie z React - dokładnie tego szukamy! 💪' : 'Świetne umiejętności programistyczne',
          hasTypeScript ? 'TypeScript w CV to duży plus - pokazuje, że dbasz o jakość kodu' : 'Dobre podstawy techniczne',
          hasNode ? 'Full-stack experience z Node.js - idealnie pasuje do naszego zespołu!' : 'Wszechstronne doświadczenie techniczne',
          'Widać progresję w karierze i chęć rozwoju - to dla nas ważne',
          'Projekty w CV pokazują umiejętność pracy z nowoczesnymi narzędziami'
        ],
        gaps: [
          !hasDatabase ? 'Przydałaby się znajomość PostgreSQL, ale możemy Cię tego nauczyć' : 'Brak doświadczenia z cloud infrastructure, ale to do opanowania',
          'Widziałbym więcej projektów zespołowych, ale to wyjaśnimy na rozmowie',
          'DevOps to nice-to-have, nie must-have 😊'
        ],
        summary: 'Super! Twoje CV pokazuje, że masz solidne fundamenty i chęć rozwoju. Przeanalizowałem Twoje doświadczenie i projekty - pasują do tego, czego szukamy. Chodźmy pogadać więcej na rozmowie!',
        cvHighlights: [
          hasReact ? '✓ Doświadczenie z React zauważone' : '✓ Silne fundamenty programistyczne',
          hasTypeScript ? '✓ TypeScript na pokładzie' : '✓ Dobre praktyki kodowania',
          hasNode ? '✓ Full-stack capabilities' : '✓ Wszechstronne umiejętności',
          '✓ Projekty pokazują praktyczne zastosowanie wiedzy',
          '✓ Progresja w karierze widoczna'
        ]
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
            question: 'Opowiedz mi o projekcie, z którego jesteś najbardziej dumny/dumna. Co sprawiło, że był wyjątkowy? Jakie wyzwania pokonałeś/pokonałaś?',
            estimatedTime: 2
          },
          {
            id: 'q2',
            question: 'Wyobraź sobie, że musisz wytłumaczyć swojej babci, dlaczego Twoja aplikacja działa wolno. Jak podszedłbyś/podeszłabyś do znalezienia i rozwiązania problemu? 😊',
            estimatedTime: 2
          },
          {
            id: 'q3',
            question: 'Widzę w Twoim CV doświadczenie z różnymi technologiami. Która z nich najbardziej Cię fascynuje i dlaczego? Może masz jakiś ciekawy projekt, który z nią zrobiłeś/zrobiłaś?',
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
        'Jak wygląda typowy dzień w zespole?': 'Hej! Dzień zaczyna się luźnym standup\'em koło 9:30 (bez presji, jeśli ktoś ma spotkanie). Gadamy 15 minut o tym, co robimy i czy ktoś potrzebuje pomocy. Potem skupiamy się na pracy - mamy tzw. focus time od 10 do 14, gdzie staramy się nie przerywać sobie nawzajem. Po lunchu często łapiemy się na spontaniczne code review lub pair programming. Fajne jest to, że możesz pracować tak, jak Ci pasuje - niektórzy wolą rano, inni są bardziej produktywni po południu 😊',
        'Jakie narzędzia używacie?': 'Mamy całkiem nowoczesny setup! React + TypeScript do frontu, Node.js na backendzie, PostgreSQL do danych. Wszystko w Dockerze, deployujemy przez Kubernetes. Na codzień to Slack do gadania (dużo gifów! 😄), Jira do zadań (ale nie jesteśmy bardzo sztywni z tym), Git oczywiście, i VS Code lub co wolisz. Każdy ma swoje preferencje i to okej!',
        'Jak wygląda proces onboardingu?': 'Relax, nie rzucamy Cię na głęboką wodę! 😊 Pierwsze 2 tygodnie to spokojne zapoznanie się. Dostajesz buddy\'ego z zespołu, który pomoże Ci we wszystkim (i tak, możesz pytać o wszystko, nawet gdzie jest łazienka!). Pierwszy tydzień to głównie setup, poznawanie ludzi i czytanie dokumentacji. Drugi tydzień to pierwsze małe taski, żeby poczuć jak działa kod. Nikt nie oczekuje, że będziesz od razu wszystko wiedzieć - każdy przechodzi przez to samo!',
        'Jakie są możliwości rozwoju?': 'O, to dobre pytanie! 🚀 Mamy spory budżet na rozwój - konferencje, szkolenia, kursy online (Udemy, Pluralsight itd.). Jeśli widzisz, że coś Cię kręci - tech lead, architektura, może nawet management - gadamy i układamy plan. Co kwartał mamy 1-on-1 gdzie omawiamy Twoje cele. Fajne jest też to, że możesz robić prezentacje dla zespołu o rzeczach, których się nauczysz - dzielenie się wiedzą jest u nas ważne!',
        'Jaka jest kultura firmy?': 'Hmm, jak to opisać... Jesteśmy bardzo luźni, ale profesjonalni jednocześnie 😊 Nie ma tu korporacyjnych formalności - mówisz CTO po imieniu, możesz challenge\'ować decyzje (konstruktywnie ofc), i nikt nie patrzy na zegarek jak wychodzisz o 15 na rower. Ważne żeby robota była zrobiona i zespół mógł na Tobie polegać. Mamy piątkowe beer & learn (prezentacje + piwo, opcjonalne obie rzeczy 😄), czasem gramy w gry po pracy. Work-life balance to nie jest tu puste hasło - jak mówisz że jesteś zmęczony, to nikt nie każe Ci zostać dłużej.'
      };

      const answer = Object.entries(answers).find(([key]) =>
        data.question.toLowerCase().includes(key.toLowerCase())
      )?.[1] || 'Świetne pytanie! 🤔 Szczerze, nie mam teraz gotowej odpowiedzi na to konkretne pytanie, ale bardzo chętnie sprawdzę to dla Ciebie. Możesz też bezpośrednio zapytać o to podczas dalszej rozmowy z zespołem - oni będą mogli odpowiedzieć Ci bardziej szczegółowo. Zapisałem Twoje pytanie, żeby zespół je zobaczył!';

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