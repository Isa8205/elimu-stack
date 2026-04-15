'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/Navbar';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { coursesData, SEMESTERS } from '@/lib/mock-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';

export default function UploadPage() {
  const router = useRouter();
  const { course, year, isLoaded } = useUserPreferences();
  const [title, setTitle] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(course || '');
  const [selectedYear, setSelectedYear] = useState(year?.toString() || '');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');

  // Redirect to home if not loaded
  useEffect(() => {
    if (isLoaded && (!course || !year)) {
      router.push('/');
    }
  }, [isLoaded, course, year, router]);

  // Get available units based on selected semester
  const availableUnits = (() => {
    if (!selectedCourse || !selectedYear || !selectedSemester) return [];

    const courseData = coursesData[selectedCourse];
    if (!courseData) return [];

    const yearData = courseData.years.find((y) => y.year === parseInt(selectedYear, 10));
    if (!yearData) return [];

    const semester = yearData.semesters.find(
      (s) => s.number === parseInt(selectedSemester, 10)
    );
    return semester?.units || [];
  })();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Only allow PDF files
      if (file.type !== 'application/pdf') {
        alert('Please select a PDF file');
        return;
      }
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (!fileName) {
      alert('Please select a PDF file');
      return;
    }

    if (!selectedUnit) {
      alert('Please select a unit');
      return;
    }

    // Log form data (mock behavior)
    console.table({
      title,
      course: selectedCourse,
      year: parseInt(selectedYear, 10),
      semester: parseInt(selectedSemester, 10),
      unit: selectedUnit,
      fileName,
      description,
      timestamp: new Date().toISOString(),
    });

    alert('Paper uploaded successfully!');

    // Reset form
    setTitle('');
    setFileName('');
    setDescription('');
    setSelectedSemester('');
    setSelectedUnit('');

    // Redirect to papers page
    router.push('/papers');
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar>
        <Button variant="ghost" asChild className="md:text-primary-foreground hover:bg-secondary">
          <a href="/papers">Papers</a>
        </Button>
      </Navbar>

      <main className="container py-8 md:py-12">
        <div className="max-w-2xl m-4 md:mx-auto">
          <div className="mb-8 border-b border-border">
            <h1 className="text-3xl font-bold mb-2 text-primary">Upload a Paper</h1>
            <p className="text-secondary">
              Share your past papers with the community
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Paper Title - Full Width */}
            <FieldGroup>
              <FieldLabel htmlFor="title" className="text-primary font-medium">Paper Title *</FieldLabel>
              <Input
                id="title"
                placeholder="e.g., Data Structures Final Exam 2023"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-card border-border text-primary"
              />
            </FieldGroup>

            {/* Course Selection Section */}
            <div>
              <h3 className="text-sm font-semibold text-primary mb-4">Course Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Course */}
                <FieldGroup>
                  <FieldLabel htmlFor="course" className="text-primary font-medium">Course *</FieldLabel>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger id="course" className="bg-card border-border text-primary">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(coursesData).map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>

                {/* Year */}
                <FieldGroup>
                  <FieldLabel htmlFor="year" className="text-primary font-medium">Year *</FieldLabel>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger id="year" className="bg-card border-border text-primary">
                      <SelectValue placeholder="Select a year" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCourse &&
                        coursesData[selectedCourse].years.map((y) => (
                          <SelectItem key={y.year} value={y.year.toString()}>
                            Year {y.year}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>
              </div>
            </div>

            {/* Semester and Unit Section */}
            <div>
              <h3 className="text-sm font-semibold text-primary mb-4">Curriculum Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Semester */}
                <FieldGroup>
                  <FieldLabel htmlFor="semester" className="text-primary font-medium">Semester *</FieldLabel>
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger id="semester" className="bg-card border-border text-primary">
                      <SelectValue placeholder="Select a semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {SEMESTERS.map((sem) => (
                        <SelectItem key={sem} value={sem.toString()}>
                          Semester {sem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>

                {/* Unit */}
                <FieldGroup>
                  <FieldLabel htmlFor="unit" className="text-primary font-medium">Unit *</FieldLabel>
                  <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                    <SelectTrigger id="unit" className="bg-card border-border text-primary">
                      <SelectValue placeholder="Select a unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableUnits.map((unit) => (
                        <SelectItem key={unit.id} value={unit.name}>
                          {unit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>
              </div>
            </div>

            {/* File Upload - Full Width */}
            <FieldGroup>
              <FieldLabel htmlFor="file" className="text-primary font-medium">PDF File *</FieldLabel>
              <div className="border-2 border-dashed border-secondary p-6 text-center bg-card">
                <input
                  id="file"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="file" className="cursor-pointer">
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 mx-auto text-secondary" />
                    {fileName ? (
                      <>
                        <p className="font-medium text-primary">{fileName}</p>
                        <p className="text-sm text-secondary">
                          Click to change file
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-medium text-primary">Click to upload or drag and drop</p>
                        <p className="text-sm text-secondary">
                          PDF files only
                        </p>
                      </>
                    )}
                  </div>
                </label>
              </div>
            </FieldGroup>

            {/* Description - Full Width */}
            <FieldGroup>
              <FieldLabel htmlFor="description" className="text-primary font-medium">Description (Optional)</FieldLabel>
              <Textarea
                id="description"
                placeholder="Add notes about this paper (e.g., difficulty level, topics covered)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="bg-card border-border text-primary"
              />
            </FieldGroup>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-6 border-t border-border">
              <Button type="submit" size="lg" className="bg-accent hover:bg-accent text-accent-foreground border-0">
                <Upload className="w-4 h-4 mr-2" />
                Upload Paper
              </Button>
              <Button
                type="button"
                size="lg"
                className="bg-secondary hover:bg-secondary text-secondary-foreground border-0"
                onClick={() => router.push('/papers')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
