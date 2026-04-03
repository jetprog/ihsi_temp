import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  description?: string;
  href: string;
  icon: React.ReactNode;
  previewValue?: string;
  className?: string;
}

export function DashboardCard({ title, description, href, icon, previewValue, className }: DashboardCardProps) {
  return (
    <Link to={href}>
      <Card className={cn(
        "group border-l-[3px] border-l-secondary hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer h-full",
        className
      )}>
        <CardContent className="p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className="rounded-xl bg-secondary/10 p-3 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-200">
              {icon}
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-foreground">{title}</h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{description}</p>
            )}
            {previewValue && (
              <p className="text-xs font-semibold text-secondary mt-2">{previewValue}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
