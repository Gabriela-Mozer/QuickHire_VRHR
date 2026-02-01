# Rocket Virtual Recruiter - API Documentation

## Overview
All API endpoints are mocked in the `client/src/api/` folder. Each function includes mock data with realistic delays to simulate real API behavior.

## Jobs API (`client/src/api/jobs.ts`)

### getJobs()
Retrieves a list of all available job positions.

**Endpoint:** `GET /api/jobs`

**Request:** `{}`

**Response:**
```typescript
{
  jobs: Array<{
    _id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    seniority: string; // "Junior" | "Mid" | "Senior"
    skills: string[];
    status?: string; // "applied" | "not_applied"
  }>
}
```

**Mock Delay:** 500ms

**Usage:**
```typescript
const response = await getJobs();
const jobs = response.jobs;
```

---

### getJobById(jobId: string)
Retrieves detailed information about a specific job.

**Endpoint:** `GET /api/jobs/:jobId`

**Request:** `{}`

**Response:**
```typescript
{
  job: {
    _id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    seniority: string;
    skills: string[];
    fullDescription: string;
  }
}
```

**Mock Delay:** 300ms

**Usage:**
```typescript
const response = await getJobById('1');
const job = response.job;
```

---

## Applications API (`client/src/api/applications.ts`)

### analyzeCv(data: { jobId: string; cvText: string; email: string })
Analyzes a candidate's CV against job requirements.

**Endpoint:** `POST /api/applications/analyze-cv`

**Request:**
```typescript
{
  jobId: string;
  cvText: string;
  email: string;
}
```

**Response:**
```typescript
{
  applicationId: string;
  matchPercentage: number; // 0-100
  strengths: string[]; // 3-5 items
  gaps: string[]; // 3-5 items
  summary: string;
}
```

**Mock Delay:** 2000ms

**Usage:**
```typescript
const response = await analyzeCv({
  jobId: '1',
  cvText: 'CV content here...',
  email: 'candidate@example.com'
});
sessionStorage.setItem('applicationData', JSON.stringify(response));
```

---

### getInterviewQuestions(applicationId: string)
Retrieves AI-generated interview questions for a specific application.

**Endpoint:** `GET /api/applications/:applicationId/questions`

**Request:** `{}`

**Response:**
```typescript
{
  questions: Array<{
    id: string;
    question: string;
    estimatedTime: number; // in minutes
  }>
}
```

**Mock Delay:** 500ms

**Usage:**
```typescript
const response = await getInterviewQuestions('app_123');
const questions = response.questions;
```

---

### submitAnswer(applicationId: string, data: { questionId: string; answer: string })
Submits a candidate's answer to an interview question.

**Endpoint:** `POST /api/applications/:applicationId/answers`

**Request:**
```typescript
{
  questionId: string;
  answer: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
}
```

**Mock Delay:** 500ms

**Usage:**
```typescript
const response = await submitAnswer('app_123', {
  questionId: 'q1',
  answer: 'My answer to the question...'
});
```

---

### submitCandidateQuestion(applicationId: string, data: { question: string })
Submits a candidate's question about the company/role and receives an AI-generated answer.

**Endpoint:** `POST /api/applications/:applicationId/candidate-questions`

**Request:**
```typescript
{
  question: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  answer: string;
}
```

**Mock Delay:** 1500ms

**Usage:**
```typescript
const response = await submitCandidateQuestion('app_123', {
  question: 'Jak wygląda typowy dzień w zespole?'
});
const answer = response.answer;
```

---

### completeInterview(applicationId: string, data: { answers: Array<{ questionId: string; answer: string }>; candidateQuestions: Array<{ question: string; answer: string }> })
Marks an interview as complete and generates a report.

**Endpoint:** `POST /api/applications/:applicationId/complete`

**Request:**
```typescript
{
  answers: Array<{
    questionId: string;
    answer: string;
  }>;
  candidateQuestions: Array<{
    question: string;
    answer: string;
  }>;
}
```

**Response:**
```typescript
{
  success: boolean;
  reportUrl: string;
  message: string;
}
```

**Mock Delay:** 1000ms

**Usage:**
```typescript
const response = await completeInterview('app_123', {
  answers: [
    { questionId: 'q1', answer: 'Answer 1' },
    { questionId: 'q2', answer: 'Answer 2' },
    { questionId: 'q3', answer: 'Answer 3' }
  ],
  candidateQuestions: [
    { question: 'Question 1?', answer: 'Answer 1' },
    { question: 'Question 2?', answer: 'Answer 2' }
  ]
});
```

---

### getApplications()
Retrieves all applications for the current user.

**Endpoint:** `GET /api/applications`

**Request:** `{}`

**Response:**
```typescript
{
  applications: Array<{
    _id: string;
    jobId: string;
    jobTitle: string;
    company: string;
    status: string; // "completed" | "in_progress" | "pending"
    matchPercentage: number;
    appliedAt: string; // ISO date string
  }>
}
```

**Mock Delay:** 500ms

**Usage:**
```typescript
const response = await getApplications();
const applications = response.applications;
```

---

## Error Handling

All API functions should be wrapped in try-catch blocks:

```typescript
try {
  const response = await getJobs();
  // Handle success
} catch (error) {
  toast({
    title: 'Error',
    description: error instanceof Error ? error.message : 'Failed to load jobs',
    variant: 'destructive'
  });
}
```

---

## Data Flow

### Application Flow
1. User browses jobs → `getJobs()`
2. User clicks "Apply Now" → Navigate to CV upload
3. User uploads CV → `analyzeCv()`
4. System shows match analysis
5. User starts interview → `getInterviewQuestions()`
6. User answers questions → `submitAnswer()` (repeated for each question)
7. User asks questions → `submitCandidateQuestion()` (repeated for each question)
8. User completes interview → `completeInterview()`
9. System shows completion screen

### Data Persistence
- `applicationData` - Stored in sessionStorage after CV analysis
- `applicationId` - Stored in sessionStorage for interview flow
- `interviewAnswers` - Stored in sessionStorage before completion

---

## Mock Data Examples

### Sample Job
```typescript
{
  _id: '1',
  title: 'Senior React Developer',
  company: 'TechCorp',
  location: 'Warsaw, Poland',
  description: 'We are looking for an experienced React developer to join our team.',
  seniority: 'Senior',
  skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  status: 'applied'
}
```

### Sample Match Analysis
```typescript
{
  applicationId: 'app_abc123',
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
}
```

### Sample Interview Question
```typescript
{
  id: 'q1',
  question: 'Tell us about your most challenging React project and how you overcame the obstacles.',
  estimatedTime: 2
}
```

---

## Integration with Real Backend

To integrate with a real backend, replace the mock implementation with actual API calls:

```typescript
// Before (Mock)
export const getJobs = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ jobs: [...] });
    }, 500);
  });
};

// After (Real API)
export const getJobs = async () => {
  try {
    const response = await api.get('/api/jobs');
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};
```

All function signatures and response structures remain the same, making the transition seamless.