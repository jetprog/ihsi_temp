import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye, Calendar } from "lucide-react";

interface DatasetCardProps {
  title: string;
  description?: string;
  formats: string[];
  date: string;
  category?: string;
}

export function DatasetCard({ title, description, formats, date, category }: DatasetCardProps) {
  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        {category && (
          <Badge variant="outline" className="text-[10px] mb-2">{category}</Badge>
        )}
        <h3 className="font-semibold text-sm text-foreground line-clamp-2">{title}</h3>
        {description && (
          <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{description}</p>
        )}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {formats.map((f) => (
            <Badge key={f} variant="secondary" className="text-[10px] font-mono">{f}</Badge>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 pt-3 border-t">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
              <Eye className="h-3 w-3" />
              Aperçu
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
              <Download className="h-3 w-3" />
              Télécharger
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
