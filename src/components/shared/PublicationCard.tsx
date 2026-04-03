import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Download, FileText } from "lucide-react";

interface PublicationCardProps {
  title: string;
  type: string;
  date: string;
  excerpt?: string;
  downloadUrl?: string;
}

export function PublicationCard({ title, type, date, excerpt, downloadUrl }: PublicationCardProps) {
  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-muted p-3 shrink-0">
            <FileText className="h-6 w-6 text-secondary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Badge variant="secondary" className="text-[10px] mb-2">{type}</Badge>
                <h3 className="font-semibold text-sm text-foreground line-clamp-2">{title}</h3>
              </div>
            </div>
            {excerpt && (
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{excerpt}</p>
            )}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{date}</span>
              </div>
              {downloadUrl && (
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                  <Download className="h-3 w-3" />
                  PDF
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
