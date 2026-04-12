'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COURSES, YEARS } from '@/lib/mock-data';

interface CourseSelectionModalProps {
  isOpen: boolean;
  onSelect: (course: string, year: number) => void;
  onClose: () => void;
}

export function CourseSelectionModal({ isOpen, onSelect, onClose }: CourseSelectionModalProps) {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

  const handleSubmit = () => {
    if (selectedCourse && selectedYear) {
      onSelect(selectedCourse, parseInt(selectedYear, 10));
    }
  };

  const isValid = selectedCourse && selectedYear;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md border-primary bg-background">
        <DialogHeader>
          <DialogTitle className="text-primary">Select Your Course</DialogTitle>
          <DialogDescription className="text-secondary">
            Choose your course and academic year to browse past papers
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block text-primary">Course</label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="border-border bg-card">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {COURSES.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block text-primary">Year</label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="border-border bg-card">
                <SelectValue placeholder="Select a year" />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    Year {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full bg-accent hover:bg-accent text-accent-foreground"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
