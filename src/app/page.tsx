'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';
import { CourseSelectionModal } from '@/components/CourseSelectionModal';
import { useUserPreferences } from '@/hooks/useUserPreferences';

export default function LandingPage() {
  const router = useRouter();
  const { isPreferencesSet, setCourseAndYear } = useUserPreferences();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCourseSelection = (selectedCourse: string, selectedYear: number) => {
    setCourseAndYear(selectedCourse, selectedYear);
    setIsModalOpen(false);
    router.push("/papers");
  };

  const handleToPapersNavigation = () => {
    if (!isPreferencesSet()) {
      setIsModalOpen(true);
      return;
    }
    router.push("/papers");
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster/>
      <Navbar />

      <main className="flex justify-center items-center py-12 sm:py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary">
              ElimuStack
            </h1>
            <p className="text-lg sm:text-xl text-secondary">
              Find and share past exam papers easily
            </p>
          </div>

          <div className="pt-4">
            <Button
              size="lg"
              onClick={handleToPapersNavigation}
              className="text-base px-8 bg-accent hover:bg-accent text-accent-foreground border-0"
            >
              Browse Papers
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-8 border-t border-border">
            <div className="space-y-2 p-6 bg-card border border-border">
              <div className="text-3xl">📚</div>
              <h3 className="font-semibold text-primary">Large Database</h3>
              <p className="text-sm text-secondary">
                Access papers from multiple courses and years
              </p>
            </div>
            <div className="space-y-2 p-6 bg-card border border-border">
              <div className="text-3xl">🔍</div>
              <h3 className="font-semibold text-primary">Easy Search</h3>
              <p className="text-sm text-secondary">
                Quickly find papers by course, semester, and unit
              </p>
            </div>
            <div className="space-y-2 p-6 bg-card border border-border">
              <div className="text-3xl">📤</div>
              <h3 className="font-semibold text-primary">Share Papers</h3>
              <p className="text-sm text-secondary">
                Upload and contribute papers to help others
              </p>
            </div>
          </div>
        </div>
      </main>

      <CourseSelectionModal
        isOpen={isModalOpen}
        onSelect={handleCourseSelection}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
