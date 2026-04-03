import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface StatCardProps {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  sparklineData?: number[];
  icon?: React.ReactNode;
}

export function StatCard({ label, value, trend = "neutral", trendValue, sparklineData, icon }: StatCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground";
  const borderColor = trend === "up" ? "border-l-[hsl(142,71%,40%)]" : trend === "down" ? "border-l-destructive" : "border-l-muted-foreground/30";

  const chartData = sparklineData?.map((v, i) => ({ v, i })) || [];

  return (
    <Card className={cn(
      "overflow-hidden border-l-[3px] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
      borderColor
    )}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-2">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{label}</span>
          {icon && <div className="text-secondary">{icon}</div>}
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-2xl font-extrabold text-foreground tracking-tight">{value}</div>
            {trendValue && (
              <div className={cn("flex items-center gap-1 mt-1 text-xs font-medium", trendColor)}>
                <TrendIcon className="h-3 w-3" />
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          {chartData.length > 0 && (
            <div className="h-10 w-20">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id={`sparkGrad-${label}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="hsl(var(--secondary))"
                    fill={`url(#sparkGrad-${label})`}
                    strokeWidth={1.5}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
