import api from './api';

// Description: Get a list of available jobs
// Endpoint: GET /api/jobs
// Request: {}
// Response: { jobs: Array<{ _id: string, title: string, company: string, location: string, description: string, seniority: string, skills: string[], status?: string }> }
export const getJobs = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        jobs: [
          {
            _id: '1',
            title: 'Senior React Developer',
            company: 'TechCorp',
            location: 'Warsaw, Poland',
            description: 'We are looking for an experienced React developer to join our team.',
            seniority: 'Senior',
            skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
            status: 'applied'
          },
          {
            _id: '2',
            title: 'Full Stack Developer',
            company: 'StartupXYZ',
            location: 'Remote',
            description: 'Build scalable web applications with modern technologies.',
            seniority: 'Mid',
            skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
            status: 'not_applied'
          },
          {
            _id: '3',
            title: 'Junior Frontend Developer',
            company: 'WebStudio',
            location: 'Krakow, Poland',
            description: 'Start your career with us in a supportive environment.',
            seniority: 'Junior',
            skills: ['HTML', 'CSS', 'JavaScript', 'React'],
            status: 'not_applied'
          },
          {
            _id: '4',
            title: 'DevOps Engineer',
            company: 'CloudSystems',
            location: 'Remote',
            description: 'Manage and optimize our cloud infrastructure.',
            seniority: 'Senior',
            skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
            status: 'not_applied'
          },
          {
            _id: '5',
            title: 'Backend Developer',
            company: 'DataFlow',
            location: 'Wroclaw, Poland',
            description: 'Build robust backend systems for data processing.',
            seniority: 'Mid',
            skills: ['Python', 'PostgreSQL', 'Redis', 'Docker'],
            status: 'not_applied'
          },
          {
            _id: '6',
            title: 'UI/UX Designer',
            company: 'DesignHub',
            location: 'Remote',
            description: 'Create beautiful and intuitive user interfaces.',
            seniority: 'Mid',
            skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
            status: 'not_applied'
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/jobs');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Get a single job by ID
// Endpoint: GET /api/jobs/:jobId
// Request: {}
// Response: { job: { _id: string, title: string, company: string, location: string, description: string, seniority: string, skills: string[], fullDescription: string, employmentType: string, experienceYears: string, salary: string, teamSize: string, responsibilities: string[], requirements: string[], benefits: string[] } }
export const getJobById = (jobId: string) => {
  // Mocking the response with detailed job data
  const jobsData: Record<string, unknown> = {
    '1': {
      _id: '1',
      title: 'Senior React Developer',
      company: 'TechCorp',
      location: 'Warsaw, Poland',
      description: 'Szukamy doświadczonego React Developera do naszego dynamicznego zespołu. Będziesz odpowiedzialny za tworzenie nowoczesnych aplikacji webowych.',
      fullDescription: 'Dołącz do naszego zespołu utalentowanych programistów i pracuj nad najnowocześniejszymi projektami. Oferujemy konkurencyjne wynagrodzenie, elastyczne godziny pracy oraz świetne benefity. Będziesz częścią międzynarodowego zespołu pracującego nad innowacyjnymi rozwiązaniami dla klientów z całego świata.',
      seniority: 'Senior',
      skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redux', 'GraphQL', 'Jest'],
      employmentType: 'Full-time / Kontrakt B2B',
      experienceYears: '5+',
      salary: '15 000 - 22 000 PLN netto',
      teamSize: '8-12',
      responsibilities: [
        'Projektowanie i implementacja nowych funkcjonalności w aplikacjach React',
        'Współpraca z zespołem UX/UI w celu tworzenia intuicyjnych interfejsów użytkownika',
        'Code review i mentoring junior developerów',
        'Optymalizacja wydajności aplikacji',
        'Uczestnictwo w spotkaniach zespołu i planowaniu sprintów',
        'Tworzenie dokumentacji technicznej'
      ],
      requirements: [
        'Minimum 5 lat doświadczenia komercyjnego z React',
        'Bardzo dobra znajomość TypeScript',
        'Doświadczenie z Node.js i budową REST API',
        'Znajomość PostgreSQL lub innych relacyjnych baz danych',
        'Doświadczenie z narzędziami do zarządzania stanem (Redux, MobX, Zustand)',
        'Znajomość Git i metodologii Agile/Scrum',
        'Komunikatywna znajomość języka angielskiego'
      ],
      benefits: [
        'Elastyczne godziny pracy i możliwość pracy zdalnej',
        'Prywatna opieka medyczna dla Ciebie i rodziny',
        'Karta MultiSport',
        'Budżet szkoleniowy 5000 PLN rocznie',
        'Najnowszy sprzęt (MacBook Pro / laptop premium)',
        'Dostęp do platform edukacyjnych (Udemy, Pluralsight)',
        'Pakiet kafeteryjny',
        'Dofinansowanie do lunchu'
      ]
    },
    '2': {
      _id: '2',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      description: 'Buduj skalowalne aplikacje webowe z wykorzystaniem nowoczesnych technologii. Dołącz do dynamicznego startupu i wpływaj na rozwój produktu.',
      fullDescription: 'Jesteśmy szybko rozwijającym się startupem z branży fintech. Szukamy Full Stack Developera, który pomoże nam budować naszą platformę od podstaw. Masz szansę współtworzyć architekturę i wpływać na kluczowe decyzje technologiczne.',
      seniority: 'Mid',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'Express', 'Docker'],
      employmentType: 'Full-time',
      experienceYears: '3-5',
      salary: '12 000 - 18 000 PLN netto',
      teamSize: '5-8',
      responsibilities: [
        'Rozwój aplikacji frontend w React',
        'Tworzenie REST API w Node.js/Express',
        'Projektowanie i optymalizacja bazy danych MongoDB',
        'Wdrażanie aplikacji na AWS',
        'Współpraca z zespołem produktowym',
        'Udział w daily standupach i code review'
      ],
      requirements: [
        '3+ lat doświadczenia z JavaScript/TypeScript',
        'Dobra znajomość React i Node.js',
        'Doświadczenie z MongoDB lub innymi bazami NoSQL',
        'Znajomość AWS (EC2, S3, Lambda)',
        'Umiejętność pracy w zespole Agile',
        'Dobra komunikacja w języku angielskim'
      ],
      benefits: [
        '100% praca zdalna',
        'Elastyczne godziny pracy',
        'Udziały w startupie (stock options)',
        'Nowoczesny sprzęt do wyboru',
        'Budżet na konferencje i szkolenia',
        'Team building events co kwartał',
        'Prywatna opieka medyczna',
        'Karta MultiSport'
      ]
    },
    '3': {
      _id: '3',
      title: 'Junior Frontend Developer',
      company: 'WebStudio',
      location: 'Krakow, Poland',
      description: 'Rozpocznij swoją karierę w przyjaznym środowisku. Oferujemy mentoring i szkolenia dla początkujących developerów.',
      fullDescription: 'WebStudio to software house specjalizujący się w tworzeniu aplikacji dla klientów z całego świata. Szukamy junior developera, który chce rozwijać swoje umiejętności pod okiem doświadczonych programistów. Gwarantujemy mentoring i wsparcie w nauce.',
      seniority: 'Junior',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
      employmentType: 'Full-time',
      experienceYears: '0-2',
      salary: '6 000 - 9 000 PLN netto',
      teamSize: '15-20',
      responsibilities: [
        'Tworzenie responsywnych interfejsów użytkownika',
        'Implementacja designów według specyfikacji od UX',
        'Nauka i stosowanie najlepszych praktyk kodowania',
        'Uczestnictwo w code review',
        'Praca z systemem kontroli wersji Git',
        'Współpraca z zespołem backend'
      ],
      requirements: [
        'Znajomość HTML5, CSS3 i JavaScript',
        'Podstawowa znajomość React',
        'Umiejętność pracy z Git',
        'Chęć nauki i rozwoju',
        'Komunikatywność i umiejętność pracy w zespole',
        'Podstawowa znajomość języka angielskiego'
      ],
      benefits: [
        'Program mentoringowy',
        'Płatne szkolenia i certyfikacje',
        'Praca hybrydowa (3 dni w biurze)',
        'Przyjazna atmosfera i kultura feedbacku',
        'Nowoczesne biuro w centrum Krakowa',
        'Owoce, napoje i przekąski w biurze',
        'Lunch roulette',
        'Integracje zespołowe'
      ]
    },
    '4': {
      _id: '4',
      title: 'DevOps Engineer',
      company: 'CloudSystems',
      location: 'Remote',
      description: 'Zarządzaj i optymalizuj naszą infrastrukturę chmurową. Pracuj z najnowszymi technologiami DevOps.',
      fullDescription: 'CloudSystems dostarcza rozwiązania chmurowe dla enterprise klientów. Szukamy DevOps Engineera, który pomoże nam skalować infrastrukturę i automatyzować procesy deployment.',
      seniority: 'Senior',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Jenkins', 'Python'],
      employmentType: 'Full-time / B2B',
      experienceYears: '5+',
      salary: '16 000 - 24 000 PLN netto',
      teamSize: '6-10',
      responsibilities: [
        'Zarządzanie infrastrukturą AWS',
        'Konfiguracja i utrzymanie klastrów Kubernetes',
        'Budowa i optymalizacja CI/CD pipelines',
        'Monitoring i troubleshooting systemów produkcyjnych',
        'Automatyzacja procesów z użyciem Terraform',
        'Współpraca z zespołami deweloperskimi'
      ],
      requirements: [
        '5+ lat doświadczenia w DevOps',
        'Bardzo dobra znajomość AWS',
        'Doświadczenie z Docker i Kubernetes',
        'Znajomość narzędzi CI/CD (Jenkins, GitLab CI, GitHub Actions)',
        'Umiejętność pisania skryptów (Bash, Python)',
        'Doświadczenie z Infrastructure as Code (Terraform)',
        'Biegła znajomość języka angielskiego'
      ],
      benefits: [
        '100% praca zdalna',
        'Bardzo konkurencyjne wynagrodzenie',
        'Certyfikacje AWS na koszt firmy',
        'Najnowszy sprzęt',
        'Budżet szkoleniowy 8000 PLN',
        'Prywatna opieka medyczna premium',
        'Pakiet kafeteryjny',
        'Dodatkowe dni urlopu'
      ]
    },
    '5': {
      _id: '5',
      title: 'Backend Developer',
      company: 'DataFlow',
      location: 'Wroclaw, Poland',
      description: 'Buduj solidne systemy backendowe do przetwarzania danych. Pracuj z dużymi zbiorami danych i systemami rozproszonymi.',
      fullDescription: 'DataFlow specjalizuje się w rozwiązaniach big data dla klientów korporacyjnych. Szukamy Backend Developera z doświadczeniem w Pythonie, który pomoże nam budować skalowalne systemy przetwarzania danych.',
      seniority: 'Mid',
      skills: ['Python', 'PostgreSQL', 'Redis', 'Docker', 'FastAPI', 'RabbitMQ'],
      employmentType: 'Full-time',
      experienceYears: '3-5',
      salary: '13 000 - 19 000 PLN netto',
      teamSize: '10-15',
      responsibilities: [
        'Projektowanie i implementacja REST API w Python',
        'Optymalizacja zapytań do bazy danych',
        'Implementacja cachingu z Redis',
        'Praca z kolejkami wiadomości (RabbitMQ)',
        'Pisanie testów jednostkowych i integracyjnych',
        'Code review i dokumentacja'
      ],
      requirements: [
        '3+ lat doświadczenia z Python',
        'Dobra znajomość PostgreSQL',
        'Doświadczenie z FastAPI lub Django',
        'Znajomość Docker',
        'Umiejętność optymalizacji wydajności',
        'Doświadczenie z systemami distributed',
        'Dobra znajomość języka angielskiego'
      ],
      benefits: [
        'Praca hybrydowa (2 dni w biurze)',
        'Elastyczne godziny pracy',
        'Nowoczesne biuro we Wrocławiu',
        'Prywatna opieka medyczna',
        'Karta MultiSport',
        'Budżet szkoleniowy',
        'Dofinansowanie do nauki języków',
        'Team events'
      ]
    },
    '6': {
      _id: '6',
      title: 'UI/UX Designer',
      company: 'DesignHub',
      location: 'Remote',
      description: 'Twórz piękne i intuicyjne interfejsy użytkownika. Pracuj z międzynarodowymi klientami nad ekscytującymi projektami.',
      fullDescription: 'DesignHub to agencja projektowa specjalizująca się w UX/UI dla aplikacji mobilnych i webowych. Szukamy designera, który pomoże nam tworzyć wyjątkowe doświadczenia użytkownika dla naszych klientów.',
      seniority: 'Mid',
      skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'Adobe XD', 'Sketch'],
      employmentType: 'Full-time / B2B',
      experienceYears: '3-5',
      salary: '10 000 - 16 000 PLN netto',
      teamSize: '8-12',
      responsibilities: [
        'Projektowanie interfejsów dla aplikacji web i mobile',
        'Przeprowadzanie badań UX',
        'Tworzenie prototypów w Figma',
        'Współpraca z developerami i product managerami',
        'Tworzenie design systemów',
        'Prezentowanie rozwiązań klientom'
      ],
      requirements: [
        '3+ lat doświadczenia w UI/UX',
        'Bardzo dobra znajomość Figma',
        'Portfolio z zrealizowanymi projektami',
        'Doświadczenie w UX research',
        'Znajomość zasad accessibility',
        'Umiejętność tworzenia design systemów',
        'Komunikatywna znajomość języka angielskiego'
      ],
      benefits: [
        '100% praca zdalna',
        'Elastyczne godziny pracy',
        'Dostęp do płatnych zasobów designerskich',
        'Budżet na konferencje',
        'Subskrypcje Adobe i innych narzędzi',
        'Prywatna opieka medyczna',
        'Home office setup allowance',
        'Dodatek na internet i telefon'
      ]
    }
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      const job = jobsData[jobId] || jobsData['1'];
      resolve({ job });
    }, 300);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get(`/api/jobs/${jobId}`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Get recommended jobs based on CV and current job
// Endpoint: POST /api/jobs/recommendations
// Request: { cvText: string, currentJobId: string, matchPercentage: number }
// Response: { recommendations: Array<{ _id: string, title: string, company: string, location: string, description: string, seniority: string, skills: string[], matchPercentage: number, reason: string }> }
export const getRecommendedJobs = (data: { cvText: string; currentJobId: string; matchPercentage: number }) => {
  // Mocking the response - simulating job recommendations based on CV
  const cvText = data.cvText.toLowerCase();
  const hasReact = cvText.includes('react') || cvText.includes('frontend');
  const hasNode = cvText.includes('node') || cvText.includes('backend');
  const hasPython = cvText.includes('python');
  const hasDevOps = cvText.includes('devops') || cvText.includes('docker') || cvText.includes('kubernetes');

  return new Promise((resolve) => {
    setTimeout(() => {
      const allRecommendations = [
        {
          _id: '2',
          title: 'Full Stack Developer',
          company: 'StartupXYZ',
          location: 'Remote',
          description: 'Buduj skalowalne aplikacje webowe z wykorzystaniem nowoczesnych technologii.',
          seniority: 'Mid',
          skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
          matchPercentage: hasReact && hasNode ? 88 : 75,
          reason: hasReact && hasNode ? 'Twoje doświadczenie z React i Node.js idealnie pasuje do tego full-stack stanowiska!' : 'Dobre dopasowanie do Twoich umiejętności'
        },
        {
          _id: '3',
          title: 'Junior Frontend Developer',
          company: 'WebStudio',
          location: 'Krakow, Poland',
          description: 'Rozpocznij swoją karierę w przyjaznym środowisku z mentoringiem.',
          seniority: 'Junior',
          skills: ['HTML', 'CSS', 'JavaScript', 'React'],
          matchPercentage: hasReact ? 85 : 70,
          reason: hasReact ? 'Świetna opcja jeśli szukasz bardziej supportive środowiska z mentoringiem!' : 'Dobre miejsce na start lub zmianę ścieżki'
        },
        {
          _id: '5',
          title: 'Backend Developer',
          company: 'DataFlow',
          location: 'Wroclaw, Poland',
          description: 'Buduj solidne systemy backendowe do przetwarzania danych.',
          seniority: 'Mid',
          skills: ['Python', 'PostgreSQL', 'Redis', 'Docker'],
          matchPercentage: hasPython || hasNode ? 82 : 68,
          reason: hasPython ? 'Widzę, że Python jest w Twoim CV - to może być ciekawe!' : hasNode ? 'Twoje doświadczenie backendowe dobrze się tu sprawdzi' : 'Możliwość nauki nowych technologii backendowych'
        },
        {
          _id: '4',
          title: 'DevOps Engineer',
          company: 'CloudSystems',
          location: 'Remote',
          description: 'Zarządzaj i optymalizuj infrastrukturę chmurową.',
          seniority: 'Senior',
          skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
          matchPercentage: hasDevOps ? 80 : 65,
          reason: hasDevOps ? 'Twoje DevOps skills mogą być tutaj świetnie wykorzystane!' : 'Dobra ścieżka jeśli chcesz rozwinąć się w kierunku infrastruktury'
        },
        {
          _id: '6',
          title: 'UI/UX Designer',
          company: 'DesignHub',
          location: 'Remote',
          description: 'Twórz piękne i intuicyjne interfejsy użytkownika.',
          seniority: 'Mid',
          skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
          matchPercentage: hasReact ? 70 : 60,
          reason: hasReact ? 'Jeśli interesuje Cię bardziej strona wizualna - masz już tech background!' : 'Ciekawa ścieżka jeśli myślisz o zmianie kierunku'
        }
      ];

      // Filter out current job and sort by match percentage
      const recommendations = allRecommendations
        .filter(job => job._id !== data.currentJobId)
        .sort((a, b) => b.matchPercentage - a.matchPercentage)
        .slice(0, 4); // Return top 4 recommendations

      resolve({ recommendations });
    }, 1000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/jobs/recommendations', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};