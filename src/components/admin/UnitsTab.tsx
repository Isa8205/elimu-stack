'use client';

import { useState } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import type { Unit } from '@/hooks/useAdminData';

export function UnitsTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [editingUnitId, setEditingUnitId] = useState<string | null>(null);
  const [deleteUnitId, setDeleteUnitId] = useState<string | null>(null);
  const [unitName, setUnitName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setUnitName('');
    setErrors({});
    setEditingUnitId(null);
  };

  const handleOpenDialog = (unit?: Unit) => {
    if (unit) {
      setUnitName(unit.name);
      setEditingUnitId(unit.id);
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTimeout(resetForm, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    throw Error("Not implemented");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Units</h2>
          <p className="text-sm text-secondary mt-1">Manage course units and subjects</p>
        </div>
        <Button 
          onClick={() => handleOpenDialog()} 
          disabled={!selectedCourse || !selectedYear || !selectedSemester}
          className="bg-accent hover:bg-accent text-accent-foreground border-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Unit
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-card border border-border p-4">
        <FieldGroup>
          <FieldLabel htmlFor="filter-course" className="text-primary font-medium text-sm">
            Course
          </FieldLabel>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger id="filter-course" className="bg-background border-border text-primary">
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map(course => (
                <SelectItem key={course.id} value={course.id}>
                  {course.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldGroup>

        <FieldGroup>
          <FieldLabel htmlFor="filter-year" className="text-primary font-medium text-sm">
            Year
          </FieldLabel>
          <Select value={selectedYear} onValueChange={setSelectedYear} disabled={!selectedCourse}>
            <SelectTrigger id="filter-year" className="bg-background border-border text-primary disabled:opacity-50">
              <SelectValue placeholder="Select a year" />
            </SelectTrigger>
            <SelectContent>
              {currentCourse?.years.map(year => (
                <SelectItem key={year.year} value={year.year.toString()}>
                  Year {year.year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldGroup>

        <FieldGroup>
          <FieldLabel htmlFor="filter-semester" className="text-primary font-medium text-sm">
            Semester
          </FieldLabel>
          <Select value={selectedSemester} onValueChange={setSelectedSemester} disabled={!selectedYear}>
            <SelectTrigger id="filter-semester" className="bg-background border-border text-primary disabled:opacity-50">
              <SelectValue placeholder="Select a semester" />
            </SelectTrigger>
            <SelectContent>
              {currentYear?.semesters.map(semester => (
                <SelectItem key={semester.id} value={semester.id}>
                  Semester {semester.number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldGroup>
      </div>

      {/* Units Table */}
      {!selectedCourse || !selectedYear || !selectedSemester ? (
        <div className="text-center py-12 bg-card border border-border">
          <p className="text-secondary">Select a course, year, and semester to view units.</p>
        </div>
      ) : units.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border">
          <p className="text-secondary">No units yet. Create one to get started.</p>
        </div>
      ) : (
        <div className="border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border">
                <TableHead className="text-primary font-semibold">Unit Name</TableHead>
                <TableHead className="text-primary font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {units.map((unit) => (
                <TableRow key={unit.id} className="border-b border-border hover:bg-muted">
                  <TableCell className="text-primary font-medium">{unit.name}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenDialog(unit)}
                      className="text-secondary hover:text-primary hover:bg-border"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDeleteUnitId(unit.id);
                        setIsDeleteDialogOpen(true);
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

      {/* Add/Edit Unit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md border-primary bg-background">
          <DialogHeader>
            <DialogTitle className="text-primary">
              {editingUnitId ? 'Edit Unit' : 'Add New Unit'}
            </DialogTitle>
            <DialogDescription className="text-secondary">
              {editingUnitId ? 'Update unit details' : 'Create a new unit for this semester'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FieldGroup>
              <FieldLabel htmlFor="unit-name" className="text-primary font-medium">
                Unit Name *
              </FieldLabel>
              <Input
                id="unit-name"
                placeholder="e.g., Data Structures"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                className="bg-card border-border text-primary"
              />
              {errors.unitName && <p className="text-accent text-sm">{errors.unitName}</p>}
            </FieldGroup>

            <div className="flex gap-3 pt-4 border-t border-border">
              <Button
                type="submit"
                className="flex-1 bg-accent hover:bg-accent text-accent-foreground border-0"
              >
                {editingUnitId ? 'Update Unit' : 'Add Unit'}
              </Button>
              <Button
                type="button"
                onClick={handleCloseDialog}
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
            <DialogTitle className="text-primary">Delete Unit</DialogTitle>
            <DialogDescription className="text-secondary">
              Are you sure you want to delete this unit? All associated papers will also be deleted. This action cannot be undone.
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
