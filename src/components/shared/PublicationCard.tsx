import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/context";

const typeBadgeColors: Record<string, string> = {
  "Bulletin": "bg-[hsl(213,52%,23%)]/10 text-primary border-primary/20",
  "Rapport": "bg-[hsl(142,71%,40%)]/10 text-[hsl(142,71%,35%)] border-[hsl(142,71%,40%)]/20",
  "Communiqué": "bg-[hsl(38,92%,50%)]/10 text-[hsl(38,92%,40%)] border-[hsl(38,92%,50%)]/20",
  "Méthodologie": "bg-secondary/10 text-secondary border-secondary/20",
};

interface PublicationCardProps {
  title: string;
  type: string;
  date: string;
  excerpt?: string;
  downloadUrl?: string;
}

export function PublicationCard({ title, type, date, excerpt, downloadUrl }: PublicationCardProps) {
  const { t } = useLanguage();
  const badgeClass = typeBadgeColors[type] || "bg-muted text-muted-foreground";

  return (
    <Card className="group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-muted p-3 shrink-0 group-hover:bg-secondary/10 transition-colors">
            <FileText className="h-6 w-6 text-secondary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Badge variant="outline" className={cn("text-[10px] mb-2 border", badgeClass)}>
                  {type}
                </Badge>
                <h3 className="font-semibold text-sm text-foreground line-clamp-2 leading-snug">{title}</h3>
              </div>
            </div>
            {excerpt && (
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">{excerpt}</p>
            )}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{date}</span>
              </div>
              {downloadUrl && (
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-secondary hover:text-secondary hover:bg-secondary/10">
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
