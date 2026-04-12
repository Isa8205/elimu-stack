'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { coursesData } from '@/lib/mock-data';
import type { Unit } from '@/lib/types';

interface PapersSidebarProps {
  course: string;
  year: number;
  selectedUnit: string | null;
  onSelectUnit: (unitId: string, unitName: string) => void;
}

export function PapersSidebar({
  course,
  year,
  selectedUnit,
  onSelectUnit,
}: PapersSidebarProps) {
  const [expandedSemester, setExpandedSemester] = useState<string | null>(null);

  const courseData = coursesData[course];
  if (!courseData) return null;

  const yearData = courseData.years.find((y) => y.year === year);
  if (!yearData) return null;

  const toggleSemester = (semesterId: string) => {
    setExpandedSemester(expandedSemester === semesterId ? null : semesterId);
  };

  return (
    <div className="space-y-2 bg-card border border-border">
      <div className="px-3 py-3 border-b border-border">
        <h3 className="font-semibold text-sm text-primary">
          {course}
        </h3>
        <p className="text-xs text-secondary">Year {year}</p>
      </div>

      <div className="space-y-0">
        {yearData.semesters.map((semester) => (
          <div key={semester.id}>
            <button
              onClick={() => toggleSemester(semester.id)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium hover:bg-muted text-primary border-b border-border"
            >
              <span>Semester {semester.number}</span>
              {expandedSemester === semester.id ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {expandedSemester === semester.id && (
              <div className="space-y-0 pl-4 bg-muted border-b border-border">
                {semester.units.map((unit) => (
                  <button
                    key={unit.id}
                    onClick={() => onSelectUnit(unit.id, unit.name)}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      selectedUnit === unit.id
                        ? 'bg-accent text-accent-foreground font-medium'
                        : 'hover:bg-border text-primary'
                    }`}
                  >
                    {unit.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
