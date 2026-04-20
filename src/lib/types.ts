export interface Paper {
  id: string;
  title: string;
  category: string;
  fileUrl: string;
  examYear: number;
  unit: {
    name: string;
    semester: number;
  };
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
