import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import type { Paper } from '@/lib/types';

interface PaperCardProps {
  paper: Paper;
}

export function PaperCard({ paper }: PaperCardProps) {
  const handleDownload = () => {
    // Mock download - in a real app, this would download the file
    alert(`Downloading ${paper.fileName}`);
  };

  return (
    <Card className="border-border bg-card">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-base text-primary">{paper.title}</h3>
            <p className="text-sm text-secondary mt-1">{paper.unit}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-sm border-t border-border pt-3">
            <div>
              <span className="text-secondary text-xs block">Year</span>
              <p className="font-medium text-primary">{paper.year}</p>
            </div>
            <div>
              <span className="text-secondary text-xs block">Semester</span>
              <p className="font-medium text-primary">{paper.semester}</p>
            </div>
            <div>
              <span className="text-secondary text-xs block">Course</span>
              <p className="font-medium text-xs text-primary">{paper.course}</p>
            </div>
          </div>

          <Button
            onClick={handleDownload}
            size="sm"
            className="w-full mt-2 bg-accent hover:bg-accent text-accent-foreground border-0"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
