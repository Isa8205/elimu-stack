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
}

export interface Semester {
  id: string;
  number: number;
  units: Unit[];
}

export interface YearData {
  year: number;
  semesters: Semester[];
}

export interface CourseData {
  name: string;
  years: YearData[];
}

export interface Course {
  id: string;
  name: string;
}
