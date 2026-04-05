import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/i18n/context";

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  source?: string;
  children: ReactNode;
  className?: string;
}

export function ChartContainer({ title, subtitle, source, children, className }: ChartContainerProps) {
  const { t } = useLanguage();

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">{children}</div>
        {source && (
          <p className="text-[10px] text-muted-foreground mt-3">{t("chart.source")} {source}</p>
        )}
      </CardContent>
    </Card>
  );
}
