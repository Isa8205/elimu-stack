export interface Paper {
  id: string;
  title: string;
  year: number;
  semester: number;
  unit: string;
  course: string;
  fileName: string;
}

export interface Unit {
  id: string;
  name: string;
  code: string;
}

export interface Semester {
  id: string;
  name: string;
  number: number;
  units: Unit[];
}

export interface Course {
  id: string;
  name: string;
  academicYears: number;
  semesters: { id: string; name: string; academicYear: number }[];
}
