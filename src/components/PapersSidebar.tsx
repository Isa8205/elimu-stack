"use client";

import apiClient from "@/lib/axios";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface PapersSidebarProps {
  course: string;
  year: number;
  onUnitSelected: (unitId: string) => void;
}

export function PapersSidebar({ course, year, onUnitSelected }: PapersSidebarProps) {
  const [expandedSemester, setExpandedSemester] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [semesterData, setSemesterData] = useState<
    { id: string; name: string; units: { id: string; name: string }[] }[]
  >([]);

  useEffect(() => {
    const fetchNavSemesters = async () => {
      const res = await apiClient.get(`/get-nav-sems?course=${course}&year=${year}`);

      if (res && res.data.result) {
        setSemesterData(res.data.result);
      }
    };

    fetchNavSemesters();
  }, []);

  const toggleSemester = (semesterId: string) => {
    setExpandedSemester(expandedSemester === semesterId ? null : semesterId);
  };

  return (
    <div className="space-y-2 bg-card border border-border">
      <div className="px-3 py-3 border-b border-border">
        <h3 className="font-semibold text-sm text-primary">{course}</h3>
        <p className="text-xs text-secondary">Year {year}</p>
      </div>

      <div className="space-y-0">
        {semesterData.map((semester) => (
          <div key={semester.id}>
            <button
              onClick={() => toggleSemester(semester.id)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium hover:bg-muted text-primary border-b border-border"
            >
              <span>{semester.name}</span>
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
                    onClick={() => {
                      onUnitSelected(unit.id);
                      setSelectedUnit(unit.id);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${selectedUnit === unit.id
                        ? "bg-accent text-accent-foreground font-medium"
                        : "hover:bg-border text-primary"
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
