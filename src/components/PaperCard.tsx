import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import type { Paper } from "@/lib/types";
import apiClient from "@/lib/axios";

interface PaperCardProps {
  paper: Paper;
}

export function PaperCard({ paper }: PaperCardProps) {
  const handleDownload = async (fileUrl: string) => {
    const res = await apiClient.get(fileUrl, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(res.data);

    const safeName = paper.title.replace(/[^a-z0-9]/gi, "_");

    const a = document.createElement("a");
    a.href = url;
    a.download = `${safeName}.pdf`
    a.click();

    window.URL.revokeObjectURL(url);
  };

  const handleFileView = async (fileUrl: string) => {
    const res = await apiClient.get(fileUrl, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(res.data);

    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="border-border bg-card">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-base text-primary">{paper.title}</h3>
            <p className="text-sm text-secondary mt-1">{paper.unit.name}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-sm border-t border-border pt-3">
            <div>
              <span className="text-secondary text-xs block">Year</span>
              <p className="font-medium text-primary">{paper.examYear}</p>
            </div>
            <div>
              <span className="text-secondary text-xs block">Semester</span>
              <p className="font-medium text-primary">{paper.unit.semester}</p>
            </div>
          </div>

          <div className="flex justify-between items-center gap-2">
            <Button
              onClick={() => handleDownload(paper.fileUrl)}
              size="sm"
              className="flex-1 mt-2 bg-accent hover:bg-accent text-accent-foreground border-0"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>

            <Button
              onClick={() => handleFileView(paper.fileUrl)}
              size="sm"
              className="flex-1 mt-2 bg-primary hover:bg-accent text-accent-foreground border-0"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
