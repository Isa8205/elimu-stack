'use client';

import { useEffect, useState } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { Course } from '@/lib/types';
import apiClient from '@/lib/axios';

export function CoursesTab() {
  const [courseData, setCourseData] = useState<Course[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{ name: string, years?: number} | null>(null);

  const handleDelete = () => {
    throw Error("Not Imeplemented");
  };

  const handleDialogOpen = ({ isEditing }: { isEditing?: boolean }) => {
    if (isEditing) {
      const courseToEdit = courseData.filter((course) => course.id === editingId)[0];
      if (courseToEdit) {
        setFormData(courseToEdit);
      }
    }
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    if (editingId !== null) {
      setEditingId(null);
    }
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const res: { data: { courses: Course[] } } = await apiClient.get("/get-courses");
      if (res.data) {
        setCourseData(res.data.courses);
      }
    };

    fetchCourses();
  },[]);

  function handleSubmit(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Courses</h2>
          <p className="text-sm text-secondary mt-1">Manage educational courses and programs</p>
        </div>
        <Button 
          onClick={() => {
            handleDialogOpen({ isEditing: false });
          }} 
          className="bg-accent hover:bg-accent text-accent-foreground border-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      {/* Courses Table */}
      {courseData.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border">
          <p className="text-secondary">No courses yet. Create one to get started.</p>
        </div>
      ) : (
        <div className="border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border">
                <TableHead className="text-primary font-semibold">Course Name</TableHead>
                <TableHead className="text-primary font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courseData.map((course) => (
                <TableRow key={course.id} className="border-b border-border hover:bg-muted">
                  <TableCell className="text-primary font-medium">{course.name}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingId(course.id);
                        handleDialogOpen({ isEditing: true});
                      }}
                      className="text-secondary hover:text-primary hover:bg-border"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        throw Error("Not implemented");
                      }}
                      className="text-accent hover:text-accent hover:bg-border"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add/Edit Course Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md border-primary bg-background">
          <DialogHeader>
            <DialogTitle className="text-primary">
              Add Course
            </DialogTitle>
            <DialogDescription className="text-secondary">
              Create a new course in the system
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FieldGroup>
              <FieldLabel htmlFor="name" className="text-primary font-medium">
                Course Name *
              </FieldLabel>
              <Input
                id="name"
                placeholder="e.g., Computer Science"
                value={formData?.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-card border-border text-primary"
              />
            </FieldGroup>

            { editingId === null && (
              <FieldGroup>
                <FieldLabel htmlFor="description" className="text-primary font-medium">
                  Years *
                </FieldLabel>
                <Textarea
                  id="years"
                  placeholder="Describe this course..."
                  value={formData?.years}
                  onChange={(e) => setFormData({ ...formData, years: parseInt(e.target.value) })}
                  rows={3}
                  className="bg-card border-border text-primary"
                />
              </FieldGroup>
            )}

            <div className="flex gap-3 pt-4 border-t border-border">
              <Button
                type="submit"
                className="flex-1 bg-accent hover:bg-accent text-accent-foreground border-0"
              >
                {editingId === null ? 'Update Course' : 'Add Course'}
              </Button>
              <Button
                type="button"
                onClick={handleDialogClose}
                className="flex-1 bg-secondary hover:bg-secondary text-secondary-foreground border-0"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md border-primary bg-background">
          <DialogHeader>
            <DialogTitle className="text-primary">Delete Course</DialogTitle>
            <DialogDescription className="text-secondary">
              Are you sure you want to delete this course? This action cannot be undone and will remove all associated units and papers.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleDelete}
              className="flex-1 bg-accent hover:bg-accent text-accent-foreground border-0"
            >
              Delete
            </Button>
            <Button
              onClick={() => setIsDeleteDialogOpen(false)}
              className="flex-1 bg-secondary hover:bg-secondary text-secondary-foreground border-0"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
