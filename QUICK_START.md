# Rocket Virtual Recruiter - Quick Start Guide

## Installation

### 1. Install Dependencies
```bash
cd client
npm install lucide-react react-hook-form zod @hookform/resolvers
```

### 2. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## User Flow

### 1. Login/Register
- Navigate to `/login` or `/register`
- Use any credentials (authentication is pre-configured)

### 2. Browse Jobs
- Home page displays 6 sample jobs
- Search by job title or company name
- Filter by seniority level (Junior, Mid, Senior)
- Click "Apply Now" on any job

### 3. Upload CV
- Choose between file upload or text paste
- File upload: Drag-and-drop or click to select (PDF, DOC, DOCX, max 5MB)
- Text paste: Paste your CV content directly
- Enter your email address
- Click "Analizuj CV"

### 4. View Match Analysis
- See match percentage (0-100%) with color coding
- Review strengths (green checkmarks)
- Review gaps (yellow alerts)
- Read summary explanation
- Click "Przejdź do rozmowy" to start interview

### 5. Interview
- Answer 3 AI-generated questions
- Each question appears one at a time
- Type your answer (minimum 20 characters)
- Click "Wyślij odpowiedź" to submit
- System analyzes and shows next question

### 6. Reverse Recruitment
- Ask questions about the company/role
- Use suggested question templates or write custom questions
- AI provides detailed answers
- Ask multiple questions if desired
- Click "Gotowe" when finished

### 7. Interview Complete
- View session summary (match %, questions answered, etc.)
- See critical message about no ghosting
- Confirm email address
- Download report (PDF)
- Share feedback
- Return to job listings

### 8. View Applications
- Click "Moje aplikacje" in header
- See all applications with status
- View match percentage for each
- Download reports for completed interviews
- Continue in-progress interviews

## Mock Data

All data is mocked with realistic delays:
- Job listings: 500ms
- CV analysis: 2000ms
- Interview questions: 500ms
- Candidate questions: 1500ms
- Interview completion: 1000ms

## Features

### Job Listings
- 6 sample jobs with different seniority levels
- Search and filter functionality
- Job cards with skills, location, and status
- Responsive grid layout

### CV Analysis
- Automatic match percentage calculation
- Strengths and gaps extraction
- Color-coded match levels
- Summary explanation

### Interview
- 3 AI-generated questions
- Sequential question display
- Character counter and validation
- Loading states between questions

### Reverse Recruitment
- 5 suggested question templates
- Custom question input
- AI-powered answers
- Chat history display

### Completion
- Session summary with statistics
- Critical transparency message
- Email confirmation
- Report download option
- Next steps information

## Keyboard Shortcuts

- `Tab` - Navigate between form fields
- `Enter` - Submit forms (when focused on button)
- `Escape` - Close modals (if implemented)

## Responsive Design

- **Mobile** (320px+): Single column layout, full-width inputs
- **Tablet** (768px+): Two column layout for some sections
- **Desktop** (1024px+): Three column grid for jobs, full chat interface

## Dark Mode

- Toggle dark mode using the theme toggle in header
- All components support both light and dark themes
- Preference is saved in localStorage

## Troubleshooting

### CV Upload Issues
- Ensure file is PDF, DOC, or DOCX format
- Check file size is under 5MB
- Try pasting CV text instead of uploading file

### Interview Not Loading
- Check browser console for errors
- Ensure you completed CV upload first
- Try refreshing the page

### Data Not Persisting
- Check browser's sessionStorage is enabled
- Clear sessionStorage if experiencing issues: `sessionStorage.clear()`

### Styling Issues
- Clear browser cache (Ctrl+Shift+Delete)
- Rebuild Tailwind CSS: `npm run build`

## Development

### Project Structure
```
client/src/
├── api/           # API calls and mock data
├── components/    # React components
├── pages/         # Page components
├── contexts/      # React contexts
├── hooks/         # Custom hooks
├── lib/           # Utilities
└── App.tsx        # Main app component
```

### Adding New Features
1. Create API function in `client/src/api/`
2. Create page component in `client/src/pages/`
3. Add route in `client/src/App.tsx`
4. Import and use components

### Modifying Mock Data
Edit the mock data in `client/src/api/jobs.ts` and `client/src/api/applications.ts`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

- Use React DevTools to profile components
- Check Network tab for API call delays
- Use Lighthouse for performance audits
- Optimize images and assets

## Next Steps

1. **Backend Integration**: Replace mock API calls with real endpoints
2. **Authentication**: Integrate with real auth system
3. **Database**: Connect to MongoDB or other database
4. **Email Service**: Integrate SendGrid or Mailgun
5. **File Storage**: Use AWS S3 or similar for CV storage
6. **Analytics**: Add event tracking and monitoring

## Support

For issues or questions:
1. Check the API documentation in `API_DOCUMENTATION.md`
2. Review the implementation summary in `IMPLEMENTATION_SUMMARY.md`
3. Check browser console for error messages
4. Review component code for usage examples

## License

This project is built with React, TypeScript, Tailwind CSS, and shadcn-ui components.