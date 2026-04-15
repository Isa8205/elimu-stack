
'use client';

import { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/Navbar';
import { CoursesTab } from '@/components/admin/CoursesTab';
import { UnitsTab } from '@/components/admin/UnitsTab';

export default function AdminPage() {

  return (
    <div className="min-h-screen bg-background">
      <Navbar>
        <a href="/papers" className="text-primary-foreground hover:text-accent transition-colors">
          Papers Library
        </a>
      </Navbar>

      <main className="container py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-8 border-b border-border pb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
          <p className="text-secondary">Manage courses, units, and exam papers</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="courses" className="mx-10 space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger 
              value="courses"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-primary"
            >
              Courses
            </TabsTrigger>
            <TabsTrigger 
              value="units"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-primary"
            >
              Units
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <CoursesTab />
          </TabsContent>

          {/*<TabsContent value="units" className="space-y-6">
            <UnitsTab />
          </TabsContent>*/}
        </Tabs>
      </main>
    </div>
  );
}
