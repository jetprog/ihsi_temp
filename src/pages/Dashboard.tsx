import { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/shared/StatCard";
import { ChartContainer } from "@/components/shared/ChartContainer";
import { FilterBar } from "@/components/shared/FilterBar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Users, TrendingUp, Activity, DollarSign } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";

const dashboardConfig: Record<string, { title: string; kpis: any[] }> = {
  demographie: {
    title: "Tableau de bord — Démographie",
    kpis: [
      { label: "Population totale", value: "12.0M", trend: "up" as const, trendValue: "+1.4%", icon: Users },
      { label: "Taux de natalité", value: "22.4‰", trend: "down" as const, trendValue: "-0.3‰" },
      { label: "Espérance de vie", value: "64.7 ans", trend: "up" as const, trendValue: "+0.5" },
      { label: "Densité", value: "432/km²", trend: "up" as const, trendValue: "+1.2%" },
    ],
  },
  ipc: {
    title: "Tableau de bord — IPC",
    kpis: [
      { label: "IPC global", value: "324.5", trend: "up" as const, trendValue: "+1.2%" },
      { label: "Inflation annuelle", value: "24.8%", trend: "down" as const, trendValue: "-2.1 pts" },
      { label: "Alimentation", value: "+28.3%", trend: "up" as const, trendValue: "+0.5%" },
      { label: "Transport", value: "+18.7%", trend: "down" as const, trendValue: "-1.3%" },
    ],
  },
  pib: {
    title: "Tableau de bord — PIB",
    kpis: [
      { label: "PIB nominal", value: "$21.5B", trend: "up" as const, trendValue: "+3.2%", icon: DollarSign },
      { label: "PIB/habitant", value: "$1,792", trend: "up" as const, trendValue: "+1.8%" },
      { label: "Croissance réelle", value: "1.8%", trend: "up" as const, trendValue: "+0.5 pts" },
      { label: "Investissement/PIB", value: "26.4%", trend: "up" as const, trendValue: "+1.1 pts" },
    ],
  },
  travail: {
    title: "Tableau de bord — Travail",
    kpis: [
      { label: "Population active", value: "4.8M", trend: "up" as const, trendValue: "+2.1%" },
      { label: "Taux de chômage", value: "14.5%", trend: "neutral" as const, trendValue: "0.0 pts" },
      { label: "Emploi informel", value: "58.3%", trend: "down" as const, trendValue: "-0.8%" },
      { label: "Sous-emploi", value: "22.1%", trend: "down" as const, trendValue: "-1.2 pts" },
    ],
  },
  social: {
    title: "Tableau de bord — Social",
    kpis: [
      { label: "Taux de pauvreté", value: "58.5%", trend: "down" as const, trendValue: "-1.3 pts" },
      { label: "Accès eau potable", value: "62.4%", trend: "up" as const, trendValue: "+2.1%" },
      { label: "Taux alphabétisation", value: "72.3%", trend: "up" as const, trendValue: "+1.5%" },
      { label: "Scolarisation", value: "84.1%", trend: "up" as const, trendValue: "+2.8%" },
    ],
  },
};

const lineData = [
  { month: "Jan", val1: 300, val2: 280 },
  { month: "Fév", val1: 305, val2: 285 },
  { month: "Mar", val1: 310, val2: 290 },
  { month: "Avr", val1: 312, val2: 293 },
  { month: "Mai", val1: 315, val2: 298 },
  { month: "Jun", val1: 318, val2: 300 },
  { month: "Jul", val1: 320, val2: 305 },
  { month: "Aoû", val1: 322, val2: 308 },
  { month: "Sep", val1: 323, val2: 310 },
  { month: "Oct", val1: 324, val2: 312 },
  { month: "Nov", val1: 324.5, val2: 315 },
  { month: "Déc", val1: 325, val2: 318 },
];

const barData = [
  { dep: "Ouest", val: 4.2 },
  { dep: "Nord", val: 1.2 },
  { dep: "Artibonite", val: 1.8 },
  { dep: "Sud", val: 0.8 },
  { dep: "Centre", val: 0.7 },
];

const pieData = [
  { name: "Agriculture", value: 38, color: "hsl(var(--secondary))" },
  { name: "Services", value: 42, color: "hsl(var(--accent))" },
  { name: "Industrie", value: 11, color: "hsl(var(--primary))" },
  { name: "Commerce", value: 9, color: "hsl(var(--warning))" },
];

const tableData = [
  { indicator: "Population", value: "12,000,000", year: "2024", source: "IHSI" },
  { indicator: "Natalité", value: "22.4‰", year: "2024", source: "IHSI" },
  { indicator: "Mortalité", value: "7.8‰", year: "2024", source: "IHSI" },
  { indicator: "Espérance de vie", value: "64.7 ans", year: "2023", source: "IHSI" },
  { indicator: "Croissance naturelle", value: "1.46%", year: "2024", source: "IHSI" },
];

const regions = ["Tous", "Ouest", "Nord", "Artibonite", "Sud", "Centre", "Nord-Est", "Nord-Ouest", "Sud-Est", "Grand'Anse", "Nippes"];

export default function Dashboard() {
  const { slug } = useParams<{ slug: string }>();
  const config = dashboardConfig[slug || "demographie"] || dashboardConfig.demographie;
  const [region, setRegion] = useState("Tous");

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-foreground">{config.title}</h1>
          <div className="flex gap-2">
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-40 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {regions.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-1 h-9">
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {config.kpis.map((kpi: any) => (
            <StatCard
              key={kpi.label}
              label={kpi.label}
              value={kpi.value}
              trend={kpi.trend}
              trendValue={kpi.trendValue}
              icon={kpi.icon ? <kpi.icon className="h-4 w-4" /> : undefined}
            />
          ))}
        </div>

        {/* Chart grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ChartContainer title="Tendance mensuelle" subtitle="Indice, 2024" source="IHSI">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Legend />
                <Line type="monotone" dataKey="val1" name="Série 1" stroke="hsl(var(--secondary))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="val2" name="Série 2" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer title="Par département" subtitle="En millions, 2024" source="IHSI">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="dep" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="val" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} name="Population (M)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer title="Répartition sectorielle" subtitle="En pourcentage, 2024" source="IHSI">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer title="Évolution annuelle" subtitle="Tendance 2018-2024" source="IHSI">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { year: "2018", v: 100 }, { year: "2019", v: 105 }, { year: "2020", v: 98 },
                { year: "2021", v: 103 }, { year: "2022", v: 110 }, { year: "2023", v: 115 }, { year: "2024", v: 120 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="hsl(var(--accent))" fill="url(#areaGrad)" strokeWidth={2} name="Indice" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Data table */}
        <div className="rounded-lg border bg-card">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold text-sm">Données détaillées</h3>
            <Button variant="outline" size="sm" className="gap-1 h-8 text-xs">
              <Download className="h-3 w-3" /> Exporter
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Indicateur</TableHead>
                <TableHead>Valeur</TableHead>
                <TableHead>Année</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.indicator}>
                  <TableCell className="font-medium">{row.indicator}</TableCell>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>{row.year}</TableCell>
                  <TableCell className="text-muted-foreground">{row.source}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
