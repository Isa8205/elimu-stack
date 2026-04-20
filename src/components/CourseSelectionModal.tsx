"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import apiClient from "@/lib/axios";
import { Course } from "@/lib/types";

interface CourseSelectionModalProps {
  isOpen: boolean;
  onSelect: (course: string, year: number) => void;
  onClose: () => void;
}

export function CourseSelectionModal({ isOpen, onSelect, onClose }: CourseSelectionModalProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);

  const handleSubmit = () => {
    if (selectedCourse && selectedYear) {
      onSelect(selectedCourse.name, parseInt(selectedYear, 10));
    }
  };

  const isValid = selectedCourse && selectedYear;

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await apiClient.get("/get-courses");

      if (res && res.data) {
        setCourses(res.data.courses);
      }
    };

    fetchCourses();
  }, []);

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
            <Select
              value={selectedCourse?.id}
              onValueChange={(value: string) => {
                const course = courses.find((c) => c.id === value);

                if (course) {
                  setSelectedCourse(course);
                }
              }}
            >
              <SelectTrigger className="border-border bg-card">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
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
                {selectedCourse &&
                  Array.from({ length: selectedCourse.academicYears }).map((_, i) => (
                    <SelectItem key={i} value={(i + 1).toString()}>
                      Year {i + 1}
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
