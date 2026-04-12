import { useState, useEffect } from 'react';

interface UserPreferences {
  course: string | null;
  year: number | null;
  selectedUnit: string | null;
}

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    course: null,
    year: null,
    selectedUnit: null,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        setPreferences(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse stored preferences:', error);
        localStorage.removeItem("userPreferences");
        return;
      }
    }
    setIsLoaded(true);
  }, []);

  const isPreferencesSet = () => {
    if (preferences && preferences.year && preferences.course) {
      return true;
    }

    return false;
  }

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('userPreferences', JSON.stringify(updated));
      return updated;
    });
  };

  const setCourseAndYear = (course: string, year: number) => {
    updatePreferences({ course, year, selectedUnit: null });
  };

  const setSelectedUnit = (unitId: string) => {
    updatePreferences({ selectedUnit: unitId });
  };

  const clearPreferences = () => {
    setPreferences({ course: null, year: null, selectedUnit: null });
    localStorage.removeItem('userPreferences');
  };

  return {
    ...preferences,
    isPreferencesSet,
    updatePreferences,
    setCourseAndYear,
    setSelectedUnit,
    clearPreferences,
    isLoaded,
  };
}
