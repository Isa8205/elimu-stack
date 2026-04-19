"use client";

import { useState, useEffect, SubmitEventHandler } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { notify } from "@/lib/taost";
import apiClient from "@/lib/axios";
import { Course, Semester, Unit } from "@/lib/types";

export default function UploadPage() {
  const { course, year, isLoaded } = useUserPreferences();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedSemesterId, setSelectedSemesterId] = useState("");
  const [formData, setFormData] = useState<{ unitId: string; title: string; description: string; file: File | null }>({
    unitId: "",
    title: "",
    description: "",
    file: null,
  });
  const [courses, setCourses] = useState<Course[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);

  const router = useRouter();

  // Redirect to home if not loaded
  useEffect(() => {
    if (isLoaded && (!course || !year)) {
      router.push("/");
    }
  }, [isLoaded, course, year, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Only allow PDF files
      if (file.type !== "application/pdf") {
        notify.error("Please select a PDF file");
        return;
      }

      setFormData(prev => ({ ...prev, file: file }));
    }
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.unitId || !formData.file) {
      notify.error("Missing required fileds. Check again!");
      return;
    }

    const body = new FormData();
    body.append("title", formData.title);
    body.append("unitId", formData.unitId);
    body.append("file", formData.file);

    const reqPromise = apiClient.post("/add-paper", body);

    await notify.promise(reqPromise, {
      loading: "Saving....",
      success: "Material saved successfully.",
    })
  };

  const fetchCourses = async () => {
    const res = await apiClient.get("/get-courses");

    if (res && res.data) {
      setCourses(res.data.courses);
    }
  };

  const fetchSemseters = async (courseId: string, year: number) => {
    if (!courseId) {
      console.error("courseId was not provided. Aborting.....");
      return;
    }

    const res = await apiClient.get(`/get-semesters?courseId=${courseId}&year=${year}`);

    if (res && res.data) {
      setSemesters(res.data.semesters);
    }
  };

  const fetchUnits = async (semesterId: string) => {
    if (!semesterId) {
      console.error("semesterId was not provided. Aborting.....");
      return;
    }

    const res = await apiClient.get(`/get-units?semesterId=${semesterId}`);

    if (res && res.data) {
      setUnits(res.data.units);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

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
            <p className="text-secondary">Share your past papers with the community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8" encType="multipart/form-data">
            {/* Paper Title - Full Width */}
            <FieldGroup>
              <FieldLabel htmlFor="title" className="text-primary font-medium">
                Paper Title *
              </FieldLabel>
              <Input
                id="title"
                placeholder="e.g., Data Structures Final Exam 2023"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-card border-border text-primary"
              />
            </FieldGroup>

            {/* Course Selection Section */}
            <div>
              <h3 className="text-sm font-semibold text-primary mb-4">Course Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Course */}
                <FieldGroup>
                  <FieldLabel htmlFor="course" className="text-primary font-medium">
                    Course *
                  </FieldLabel>
                  <Select
                    value={selectedCourse?.id}
                    onValueChange={(value: string) => {
                      const course = courses.find((c) => c.id === value);
                      if (course) {
                        setSelectedCourse(course);
                      }
                    }}
                  >
                    <SelectTrigger id="course" className="bg-card border-border text-primary">
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
                </FieldGroup>

                {/* Year */}
                <FieldGroup>
                  <FieldLabel htmlFor="year" className="text-primary font-medium">
                    Year *
                  </FieldLabel>
                  <Select
                    value={selectedYear ? selectedYear.toString() : ""}
                    onValueChange={(value: string) => {
                      setSelectedYear(parseInt(value));
                      if (selectedCourse) {
                        fetchSemseters(selectedCourse.id, parseInt(value));
                      }
                    }}
                  >
                    <SelectTrigger id="year" className="bg-card border-border text-primary">
                      <SelectValue placeholder="Select a year" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCourse &&
                        Array.from({ length: selectedCourse?.academicYears }).map((_, i) => (
                          <SelectItem key={i} value={(i + 1).toString()}>
                            Year {i + 1}
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
                  <FieldLabel htmlFor="semester" className="text-primary font-medium">
                    Semester *
                  </FieldLabel>
                  <Select
                    value={selectedSemesterId}
                    onValueChange={(value: string) => {
                      setSelectedSemesterId(value);
                      if (selectedSemesterId) {
                        fetchUnits(selectedSemesterId);
                      }
                    }}
                  >
                    <SelectTrigger id="semester" className="bg-card border-border text-primary">
                      <SelectValue placeholder="Select a semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters &&
                        semesters.map((sem) => (
                          <SelectItem key={sem.id} value={sem.id}>
                            {sem.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>

                {/* Unit */}
                <FieldGroup>
                  <FieldLabel htmlFor="unit" className="text-primary font-medium">
                    Unit *
                  </FieldLabel>
                  <Select
                    value={formData.unitId}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({ ...prev, unitId: value }));
                    }}
                  >
                    <SelectTrigger id="unit" className="bg-card border-border text-primary">
                      <SelectValue placeholder="Select a unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit.id} value={unit.id}>
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
              <FieldLabel htmlFor="file" className="text-primary font-medium">
                PDF File *
              </FieldLabel>
              <div className="border-2 border-dashed border-secondary p-6 text-center bg-card">
                <input id="file" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                <label htmlFor="file" className="cursor-pointer">
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 mx-auto text-secondary" />
                    {formData.file?.name ? (
                      <>
                        <p className="font-medium text-primary">{formData.file.name}</p>
                        <p className="text-sm text-secondary">Click to change file</p>
                      </>
                    ) : (
                      <>
                        <p className="font-medium text-primary">Click to upload or drag and drop</p>
                        <p className="text-sm text-secondary">PDF files only</p>
                      </>
                    )}
                  </div>
                </label>
              </div>
            </FieldGroup>

            {/* Description - Full Width */}
            <FieldGroup>
              <FieldLabel htmlFor="description" className="text-primary font-medium">
                Description (Optional)
              </FieldLabel>
              <Textarea
                id="description"
                placeholder="Add notes about this paper (e.g., difficulty level, topics covered)"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
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
                onClick={() => router.push("/papers")}
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
