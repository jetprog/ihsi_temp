import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { navigationItems } from "@/lib/navigation";
import { StatCard } from "@/components/shared/StatCard";
import { ChartContainer } from "@/components/shared/ChartContainer";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Briefcase, Heart, MapPin, Download, FileText } from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";

interface TopicConfig {
  title: string;
  description: string;
  icon: React.ReactNode;
  kpis: { label: string; value: string; trend: "up" | "down" | "neutral"; trendValue: string; sparklineData: number[] }[];
  chartTitle: string;
  chartType: "area" | "bar";
  chartData: Record<string, string | number>[];
  chartDataKey: string;
  chartXKey: string;
  tableHeaders: string[];
  tableRows: (string | number)[][];
  source: string;
}

const topics: Record<string, TopicConfig> = {
  demographie: {
    title: "Démographie",
    description: "Données sur la population, la natalité, la mortalité et la structure démographique d'Haïti.",
    icon: <Users className="h-5 w-5" />,
    kpis: [
      { label: "Population", value: "12.0M", trend: "up", trendValue: "+1.2%", sparklineData: [9.8, 10.1, 10.4, 10.7, 11.0, 11.4, 11.7, 12.0] },
      { label: "Taux de natalité", value: "22.4‰", trend: "down", trendValue: "-0.8‰", sparklineData: [28, 27, 26, 25, 24, 23.5, 23, 22.4] },
      { label: "Espérance de vie", value: "64.7 ans", trend: "up", trendValue: "+0.5", sparklineData: [58, 59, 60, 61, 62, 63, 64, 64.7] },
      { label: "Densité", value: "432/km²", trend: "up", trendValue: "+5", sparklineData: [380, 390, 400, 408, 415, 420, 427, 432] },
    ],
    chartTitle: "Évolution de la population (en millions)",
    chartType: "area",
    chartData: [
      { year: "2016", value: 10.4 }, { year: "2017", value: 10.6 }, { year: "2018", value: 10.8 },
      { year: "2019", value: 11.0 }, { year: "2020", value: 11.2 }, { year: "2021", value: 11.4 },
      { year: "2022", value: 11.6 }, { year: "2023", value: 11.8 }, { year: "2024", value: 12.0 },
    ],
    chartDataKey: "value",
    chartXKey: "year",
    tableHeaders: ["Indicateur", "Valeur", "Année", "Source"],
    tableRows: [
      ["Population totale", "12 000 000", "2024", "IHSI"],
      ["Taux de natalité", "22.4‰", "2023", "IHSI/MSPP"],
      ["Taux de mortalité", "8.2‰", "2023", "IHSI/MSPP"],
      ["Espérance de vie", "64.7 ans", "2023", "IHSI"],
      ["Croissance annuelle", "1.2%", "2024", "IHSI"],
      ["Ratio H/F", "0.98", "2024", "IHSI"],
    ],
    source: "IHSI — Estimations de population, Recensement Général 2024",
  },
  economie: {
    title: "Économie",
    description: "Indicateurs macroéconomiques : PIB, inflation, commerce extérieur et investissement.",
    icon: <TrendingUp className="h-5 w-5" />,
    kpis: [
      { label: "PIB", value: "$21.5B", trend: "up", trendValue: "+1.4%", sparklineData: [18, 19, 19.5, 20, 20.2, 20.5, 21, 21.5] },
      { label: "Inflation", value: "24.8%", trend: "down", trendValue: "-2.1%", sparklineData: [30, 29, 28, 27, 26.5, 26, 25, 24.8] },
      { label: "Commerce ext.", value: "$5.2B", trend: "up", trendValue: "+3.2%", sparklineData: [4.0, 4.2, 4.5, 4.6, 4.8, 5.0, 5.1, 5.2] },
      { label: "Investissement", value: "$1.8B", trend: "up", trendValue: "+5.0%", sparklineData: [1.2, 1.3, 1.4, 1.5, 1.5, 1.6, 1.7, 1.8] },
    ],
    chartTitle: "Évolution du PIB (en milliards USD)",
    chartType: "bar",
    chartData: [
      { year: "2016", value: 18.0 }, { year: "2017", value: 18.5 }, { year: "2018", value: 19.0 },
      { year: "2019", value: 19.5 }, { year: "2020", value: 19.2 }, { year: "2021", value: 20.0 },
      { year: "2022", value: 20.5 }, { year: "2023", value: 21.0 }, { year: "2024", value: 21.5 },
    ],
    chartDataKey: "value",
    chartXKey: "year",
    tableHeaders: ["Indicateur", "Valeur", "Année", "Source"],
    tableRows: [
      ["PIB nominal", "$21.5 milliards", "2024", "BRH/IHSI"],
      ["PIB par habitant", "$1,792", "2024", "IHSI"],
      ["Taux d'inflation", "24.8%", "2024", "BRH"],
      ["Balance commerciale", "-$3.4B", "2023", "BRH"],
      ["Transferts diaspora", "$4.0B", "2023", "BRH"],
      ["Taux de change", "132.5 HTG/USD", "2024", "BRH"],
    ],
    source: "BRH — Rapports économiques, IHSI — Comptes nationaux",
  },
  travail: {
    title: "Travail",
    description: "Statistiques sur l'emploi, le chômage, le marché du travail et les conditions de travail.",
    icon: <Briefcase className="h-5 w-5" />,
    kpis: [
      { label: "Taux de chômage", value: "14.5%", trend: "down", trendValue: "-0.8%", sparklineData: [17, 16.5, 16, 15.8, 15.5, 15.2, 15, 14.5] },
      { label: "Pop. active", value: "4.8M", trend: "up", trendValue: "+2.1%", sparklineData: [4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.8] },
      { label: "Salaire minimum", value: "685 HTG", trend: "up", trendValue: "+10%", sparklineData: [350, 400, 420, 500, 550, 600, 650, 685] },
      { label: "Emploi informel", value: "58%", trend: "neutral", trendValue: "stable", sparklineData: [60, 59, 59, 58, 58, 58, 58, 58] },
    ],
    chartTitle: "Évolution du taux de chômage (%)",
    chartType: "area",
    chartData: [
      { year: "2016", value: 17.0 }, { year: "2017", value: 16.5 }, { year: "2018", value: 16.2 },
      { year: "2019", value: 15.8 }, { year: "2020", value: 16.5 }, { year: "2021", value: 15.5 },
      { year: "2022", value: 15.2 }, { year: "2023", value: 15.0 }, { year: "2024", value: 14.5 },
    ],
    chartDataKey: "value",
    chartXKey: "year",
    tableHeaders: ["Indicateur", "Valeur", "Année", "Source"],
    tableRows: [
      ["Taux de chômage", "14.5%", "2024", "IHSI/ECVMAS"],
      ["Population active", "4.8 millions", "2024", "IHSI"],
      ["Emploi formel", "42%", "2023", "IHSI"],
      ["Emploi informel", "58%", "2023", "IHSI"],
      ["Salaire minimum journalier", "685 HTG", "2024", "MAST"],
      ["Sous-emploi", "22%", "2023", "IHSI"],
    ],
    source: "IHSI — ECVMAS, MAST — Conditions de travail",
  },
  social: {
    title: "Social",
    description: "Indicateurs sociaux : éducation, santé, accès aux services de base et conditions de vie.",
    icon: <Heart className="h-5 w-5" />,
    kpis: [
      { label: "Alphabétisation", value: "61.7%", trend: "up", trendValue: "+1.5%", sparklineData: [52, 54, 56, 57, 58, 59, 60, 61.7] },
      { label: "Accès eau potable", value: "52%", trend: "up", trendValue: "+2.3%", sparklineData: [40, 42, 44, 45, 47, 49, 50, 52] },
      { label: "Pauvreté", value: "58.5%", trend: "down", trendValue: "-1.2%", sparklineData: [65, 64, 63, 62, 61, 60, 59, 58.5] },
      { label: "Scolarisation", value: "78%", trend: "up", trendValue: "+2.0%", sparklineData: [65, 67, 69, 71, 73, 75, 76, 78] },
    ],
    chartTitle: "Taux de scolarisation net (%)",
    chartType: "area",
    chartData: [
      { year: "2016", value: 65 }, { year: "2017", value: 67 }, { year: "2018", value: 69 },
      { year: "2019", value: 71 }, { year: "2020", value: 70 }, { year: "2021", value: 73 },
      { year: "2022", value: 75 }, { year: "2023", value: 76 }, { year: "2024", value: 78 },
    ],
    chartDataKey: "value",
    chartXKey: "year",
    tableHeaders: ["Indicateur", "Valeur", "Année", "Source"],
    tableRows: [
      ["Taux d'alphabétisation", "61.7%", "2023", "IHSI/MENFP"],
      ["Scolarisation primaire", "78%", "2024", "MENFP"],
      ["Accès eau potable", "52%", "2023", "DINEPA"],
      ["Taux de pauvreté", "58.5%", "2023", "IHSI"],
      ["Accès électricité", "45%", "2023", "EDH"],
      ["Mortalité infantile", "49‰", "2023", "MSPP"],
    ],
    source: "IHSI — ECVMAS, MENFP, MSPP — Enquêtes sociales",
  },
  geographique: {
    title: "Géographique",
    description: "Données géographiques et territoriales : départements, densité, répartition urbaine et rurale.",
    icon: <MapPin className="h-5 w-5" />,
    kpis: [
      { label: "Départements", value: "10", trend: "neutral", trendValue: "—", sparklineData: [10, 10, 10, 10, 10, 10, 10, 10] },
      { label: "Ouest (pop.)", value: "39%", trend: "up", trendValue: "+0.5%", sparklineData: [36, 36.5, 37, 37.5, 38, 38.2, 38.5, 39] },
      { label: "Densité max", value: "1 825/km²", trend: "up", trendValue: "+15", sparklineData: [1700, 1720, 1740, 1760, 1780, 1790, 1810, 1825] },
      { label: "Pop. rurale", value: "47%", trend: "down", trendValue: "-1.0%", sparklineData: [53, 52, 51, 50, 49.5, 49, 48, 47] },
    ],
    chartTitle: "Population par département (millions)",
    chartType: "bar",
    chartData: [
      { year: "Ouest", value: 4.7 }, { year: "Artibonite", value: 1.8 }, { year: "Nord", value: 1.2 },
      { year: "Sud", value: 0.8 }, { year: "Nord-Est", value: 0.4 }, { year: "Nord-Ouest", value: 0.7 },
      { year: "Centre", value: 0.8 }, { year: "Sud-Est", value: 0.6 }, { year: "Grande-Anse", value: 0.5 },
      { year: "Nippes", value: 0.4 },
    ],
    chartDataKey: "value",
    chartXKey: "year",
    tableHeaders: ["Département", "Population", "Superficie (km²)", "Densité (/km²)"],
    tableRows: [
      ["Ouest", "4 700 000", "2,577", "1,825"],
      ["Artibonite", "1 800 000", "4,887", "368"],
      ["Nord", "1 200 000", "2,115", "567"],
      ["Sud", "800 000", "2,654", "301"],
      ["Centre", "800 000", "3,487", "229"],
      ["Nord-Ouest", "700 000", "2,103", "333"],
      ["Sud-Est", "600 000", "2,034", "295"],
      ["Grande-Anse", "500 000", "1,912", "261"],
      ["Nippes", "400 000", "1,268", "315"],
      ["Nord-Est", "400 000", "1,623", "246"],
    ],
    source: "IHSI — Recensement Général, Données géographiques",
  },
};

function exportCSV(topic: TopicConfig) {
  const headers = topic.tableHeaders.join(",");
  const rows = topic.tableRows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
  const csv = `${headers}\n${rows}\nSource: ${topic.source}`;
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${topic.title.toLowerCase()}-ihsi.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function exportPDF(topic: TopicConfig) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;
  const tableHtml = `<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:13px;">
    <thead><tr style="background:#f0f0f0;">${topic.tableHeaders.map((h) => `<th style="text-align:left;">${h}</th>`).join("")}</tr></thead>
    <tbody>${topic.tableRows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
  </table>`;
  printWindow.document.write(`<!DOCTYPE html><html><head><title>${topic.title} — IHSI</title>
    <style>body{font-family:Arial,sans-serif;padding:40px;color:#222;}h1{font-size:22px;}p{color:#666;font-size:12px;}</style></head>
    <body><h1>${topic.title}</h1><p>${topic.description}</p><br/>${tableHtml}<br/><p>Source : ${topic.source}</p></body></html>`);
  printWindow.document.close();
  printWindow.print();
}

function TopicPage({ topic }: { topic: TopicConfig }) {
  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-6">
        <div className="container">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground">Accueil</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/statistiques" className="text-primary-foreground/70 hover:text-primary-foreground">Statistiques</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary-foreground">{topic.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-3 mt-3">
            <div className="rounded-lg bg-primary-foreground/15 p-2.5">{topic.icon}</div>
            <div>
              <h1 className="text-2xl font-bold">{topic.title}</h1>
              <p className="text-sm text-primary-foreground/70 mt-0.5">{topic.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-8 space-y-8">
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topic.kpis.map((kpi) => (
            <StatCard key={kpi.label} {...kpi} />
          ))}
        </div>

        {/* Chart */}
        <ChartContainer title={topic.chartTitle} source={topic.source}>
          <ResponsiveContainer width="100%" height="100%">
            {topic.chartType === "area" ? (
              <AreaChart data={topic.chartData}>
                <defs>
                  <linearGradient id="topicGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey={topic.chartXKey} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Area type="monotone" dataKey={topic.chartDataKey} stroke="hsl(var(--secondary))" fill="url(#topicGrad)" strokeWidth={2} />
              </AreaChart>
            ) : (
              <BarChart data={topic.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey={topic.chartXKey} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey={topic.chartDataKey} fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </ChartContainer>

        {/* Data Table */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">Indicateurs détaillés</h2>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  {topic.tableHeaders.map((h) => (
                    <TableHead key={h} className="font-semibold text-xs uppercase tracking-wider">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {topic.tableRows.map((row, i) => (
                  <TableRow key={i}>
                    {row.map((cell, j) => (
                      <TableCell key={j} className={j === 0 ? "font-medium" : ""}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-[11px] text-muted-foreground mt-3">Source : {topic.source}</p>
        </div>
      </section>
    </Layout>
  );
}

export default function Statistiques() {
  const { slug } = useParams<{ slug?: string }>();

  if (slug && topics[slug]) {
    return <TopicPage topic={topics[slug]} />;
  }

  const statsNav = navigationItems.find((n) => n.title === "Statistiques");
  const children = statsNav?.children || [];

  return (
    <Layout>
      <section className="container py-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">Statistiques</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Explorez les données statistiques d'Haïti organisées par thématique.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {children.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className="group rounded-lg border bg-card p-6 hover:shadow-md hover:border-secondary/30 transition-all"
              >
                <div className="rounded-lg bg-secondary/10 p-3 w-fit mb-4 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                )}
              </Link>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
