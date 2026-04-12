'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { PaperCard } from '@/components/PaperCard';
import { PapersSidebar } from '@/components/PapersSidebar';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { mockPapers, coursesData } from '@/lib/mock-data';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, Plus } from 'lucide-react';
import { Empty } from '@/components/ui/empty';

export default function PapersPage() {
  const router = useRouter();
  const { course, year, selectedUnit, isLoaded, setSelectedUnit } = useUserPreferences();
  const [searchQuery, setSearchQuery] = useState('');

  // Redirect to home if no course/year selected
  useEffect(() => {
    if (isLoaded && (!course || !year)) {
      router.push('/');
    }
  }, [isLoaded, course, year, router]);

  // Get the current unit name
  const currentUnitName = useMemo(() => {
    if (!course || !year || !selectedUnit) return null;
    const courseData = coursesData[course];
    if (!courseData) return null;
    const yearData = courseData.years.find((y) => y.year === year);
    if (!yearData) return null;

    for (const semester of yearData.semesters) {
      const unit = semester.units.find((u) => u.id === selectedUnit);
      if (unit) return unit.name;
    }
    return null;
  }, [course, year, selectedUnit]);

  // Filter papers based on selected unit and search query
  const filteredPapers = useMemo(() => {
    let filtered = mockPapers;

    if (currentUnitName) {
      filtered = filtered.filter(
        (paper) => paper.unit === currentUnitName && paper.course === course
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((paper) =>
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.unit.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [currentUnitName, course, searchQuery]);

  if (!isLoaded || !course || !year) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar>
        <Button variant="ghost" asChild className="text-primary-foreground hover:bg-secondary">
          <a href="/">Home</a>
        </Button>
        <Button asChild className="bg-accent hover:bg-accent text-accent-foreground border-0">
          <a href="/upload">
            <Plus className="w-4 h-4 mr-2" />
            Upload Paper
          </a>
        </Button>
      </Navbar>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 border-r border-border overflow-y-auto h-[calc(100vh-64px)]">
          <PapersSidebar
            course={course}
            year={year}
            selectedUnit={selectedUnit}
            onSelectUnit={setSelectedUnit}
          />
        </aside>

        {/* Mobile Sidebar */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden fixed bottom-6 right-6">
            <Button size="icon" className="bg-accent hover:bg-accent text-accent-foreground">
              <Menu className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="mt-8">
              <PapersSidebar
                course={course}
                year={year}
                selectedUnit={selectedUnit}
                onSelectUnit={setSelectedUnit}
              />
            </div>
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 md:p-8 max-w-6xl">
            {/* Header */}
            <div className="mb-8 border-b border-border pb-6">
              <h1 className="text-3xl font-bold mb-2 text-primary">
                {currentUnitName || 'Select a Unit'}
              </h1>
              {currentUnitName && (
                <p className="text-secondary">
                  {course} • Year {year}
                </p>
              )}
            </div>

            {/* Search Bar */}
            <div className="mb-8">
              <Input
                placeholder="Search papers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md bg-card border-border text-primary"
              />
            </div>

            {/* Papers Grid */}
            {filteredPapers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPapers.map((paper) => (
                  <PaperCard key={paper.id} paper={paper} />
                ))}
              </div>
            ) : (
              <Empty
                title={currentUnitName ? 'No papers found' : 'Select a unit to view papers'}
                description={
                  currentUnitName
                    ? 'Try adjusting your search or selecting a different unit'
                    : 'Browse the sidebar to choose a unit'
                }
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
