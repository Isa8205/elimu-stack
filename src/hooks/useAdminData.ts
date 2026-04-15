export interface Course {
  id: string;
  name: string;
  years: number;
}

export interface Semester {
  id: string;
  number: number;
  units: Unit[];
}

export interface Unit {
  id: string;
  name: string;
}

export interface Paper {
  id: string;
  title: string;
  unit: string;
  unitId: string;
  year: number;
  semester: number;
  course: string;
  courseId: string;
  fileName?: string;
}
