import { CourseData, Paper } from './types';

export const coursesData: Record<string, CourseData> = {
  'Computer Science': {
    name: 'Computer Science',
    years: [
      {
        year: 1,
        semesters: [
          {
            id: 'cs-1-sem1',
            number: 1,
            units: [
              { id: 'cs-1-1-1', name: 'Introduction to Programming' },
              { id: 'cs-1-1-2', name: 'Discrete Mathematics' },
              { id: 'cs-1-1-3', name: 'Computer Architecture' },
            ],
          },
          {
            id: 'cs-1-sem2',
            number: 2,
            units: [
              { id: 'cs-1-2-1', name: 'Data Structures' },
              { id: 'cs-1-2-2', name: 'Web Development' },
              { id: 'cs-1-2-3', name: 'Database Systems' },
            ],
          },
        ],
      },
      {
        year: 2,
        semesters: [
          {
            id: 'cs-2-sem1',
            number: 1,
            units: [
              { id: 'cs-2-1-1', name: 'Data Structures' },
              { id: 'cs-2-1-2', name: 'Discrete Math' },
              { id: 'cs-2-1-3', name: 'Algorithms' },
            ],
          },
          {
            id: 'cs-2-sem2',
            number: 2,
            units: [
              { id: 'cs-2-2-1', name: 'Operating Systems' },
              { id: 'cs-2-2-2', name: 'Databases' },
              { id: 'cs-2-2-3', name: 'Software Engineering' },
            ],
          },
        ],
      },
      {
        year: 3,
        semesters: [
          {
            id: 'cs-3-sem1',
            number: 1,
            units: [
              { id: 'cs-3-1-1', name: 'Artificial Intelligence' },
              { id: 'cs-3-1-2', name: 'Machine Learning' },
              { id: 'cs-3-1-3', name: 'Computer Networks' },
            ],
          },
          {
            id: 'cs-3-sem2',
            number: 2,
            units: [
              { id: 'cs-3-2-1', name: 'Project Management' },
              { id: 'cs-3-2-2', name: 'Cloud Computing' },
              { id: 'cs-3-2-3', name: 'Advanced Algorithms' },
            ],
          },
        ],
      },
      {
        year: 4,
        semesters: [
          {
            id: 'cs-4-sem1',
            number: 1,
            units: [
              { id: 'cs-4-1-1', name: 'Final Year Project' },
              { id: 'cs-4-1-2', name: 'Research Methods' },
            ],
          },
          {
            id: 'cs-4-sem2',
            number: 2,
            units: [
              { id: 'cs-4-2-1', name: 'Dissertation' },
            ],
          },
        ],
      },
    ],
  },
  'Information Technology': {
    name: 'Information Technology',
    years: [
      {
        year: 1,
        semesters: [
          {
            id: 'it-1-sem1',
            number: 1,
            units: [
              { id: 'it-1-1-1', name: 'IT Fundamentals' },
              { id: 'it-1-1-2', name: 'Business Concepts' },
              { id: 'it-1-1-3', name: 'Systems Administration' },
            ],
          },
          {
            id: 'it-1-sem2',
            number: 2,
            units: [
              { id: 'it-1-2-1', name: 'Network Fundamentals' },
              { id: 'it-1-2-2', name: 'Cybersecurity Basics' },
              { id: 'it-1-2-3', name: 'IT Support' },
            ],
          },
        ],
      },
      {
        year: 2,
        semesters: [
          {
            id: 'it-2-sem1',
            number: 1,
            units: [
              { id: 'it-2-1-1', name: 'Advanced Networking' },
              { id: 'it-2-1-2', name: 'Database Management' },
              { id: 'it-2-1-3', name: 'IT Project Management' },
            ],
          },
          {
            id: 'it-2-sem2',
            number: 2,
            units: [
              { id: 'it-2-2-1', name: 'Security Management' },
              { id: 'it-2-2-2', name: 'Cloud Services' },
              { id: 'it-2-2-3', name: 'Business Analytics' },
            ],
          },
        ],
      },
    ],
  },
  'Software Engineering': {
    name: 'Software Engineering',
    years: [
      {
        year: 1,
        semesters: [
          {
            id: 'se-1-sem1',
            number: 1,
            units: [
              { id: 'se-1-1-1', name: 'Programming Basics' },
              { id: 'se-1-1-2', name: 'Software Principles' },
              { id: 'se-1-1-3', name: 'Web Technologies' },
            ],
          },
          {
            id: 'se-1-sem2',
            number: 2,
            units: [
              { id: 'se-1-2-1', name: 'Object-Oriented Programming' },
              { id: 'se-1-2-2', name: 'Design Patterns' },
              { id: 'se-1-2-3', name: 'Testing' },
            ],
          },
        ],
      },
      {
        year: 2,
        semesters: [
          {
            id: 'se-2-sem1',
            number: 1,
            units: [
              { id: 'se-2-1-1', name: 'Software Architecture' },
              { id: 'se-2-1-2', name: 'Requirements Engineering' },
              { id: 'se-2-1-3', name: 'Quality Assurance' },
            ],
          },
          {
            id: 'se-2-sem2',
            number: 2,
            units: [
              { id: 'se-2-2-1', name: 'DevOps & CI/CD' },
              { id: 'se-2-2-2', name: 'Agile Development' },
              { id: 'se-2-2-3', name: 'Enterprise Systems' },
            ],
          },
        ],
      },
    ],
  },
};

export const mockPapers: Paper[] = [
  {
    id: 'paper-1',
    title: 'Data Structures Final Exam',
    year: 2023,
    semester: 2,
    unit: 'Data Structures',
    course: 'Computer Science',
    fileName: 'data-structures-2023.pdf',
  },
  {
    id: 'paper-2',
    title: 'Data Structures Midterm',
    year: 2023,
    semester: 2,
    unit: 'Data Structures',
    course: 'Computer Science',
    fileName: 'data-structures-midterm-2023.pdf',
  },
  {
    id: 'paper-3',
    title: 'Data Structures Final Exam',
    year: 2022,
    semester: 2,
    unit: 'Data Structures',
    course: 'Computer Science',
    fileName: 'data-structures-2022.pdf',
  },
  {
    id: 'paper-4',
    title: 'Operating Systems Final',
    year: 2023,
    semester: 2,
    unit: 'Operating Systems',
    course: 'Computer Science',
    fileName: 'os-2023.pdf',
  },
  {
    id: 'paper-5',
    title: 'Discrete Mathematics Final',
    year: 2023,
    semester: 1,
    unit: 'Discrete Math',
    course: 'Computer Science',
    fileName: 'discrete-math-2023.pdf',
  },
  {
    id: 'paper-6',
    title: 'Algorithms Exam',
    year: 2023,
    semester: 1,
    unit: 'Algorithms',
    course: 'Computer Science',
    fileName: 'algorithms-2023.pdf',
  },
];

export const COURSES = ['Computer Science', 'Information Technology', 'Software Engineering'] as const;
export const YEARS = [1, 2, 3, 4] as const;
export const SEMESTERS = [1, 2] as const;
