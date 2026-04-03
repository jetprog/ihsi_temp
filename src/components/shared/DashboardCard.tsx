import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  description?: string;
  href: string;
  icon: React.ReactNode;
  className?: string;
}

export function DashboardCard({ title, description, href, icon, className }: DashboardCardProps) {
  return (
    <Link to={href}>
      <Card className={cn(
        "group hover:shadow-md hover:border-secondary/30 transition-all duration-200 cursor-pointer",
        className
      )}>
        <CardContent className="p-5 flex items-start gap-4">
          <div className="rounded-lg bg-secondary/10 p-2.5 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">{title}</h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
