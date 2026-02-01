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
// Response: { job: { _id: string, title: string, company: string, location: string, description: string, seniority: string, skills: string[] } }
export const getJobById = (jobId: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        job: {
          _id: jobId,
          title: 'Senior React Developer',
          company: 'TechCorp',
          location: 'Warsaw, Poland',
          description: 'We are looking for an experienced React developer to join our team and build amazing products.',
          seniority: 'Senior',
          skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
          fullDescription: 'Join our team of talented developers and work on cutting-edge projects. We offer competitive salary, flexible working hours, and great benefits.'
        }
      });
    }, 300);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get(`/api/jobs/${jobId}`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};