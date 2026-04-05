import {
  Home, BarChart3, LayoutDashboard, Database, BookOpen,
  Users, TrendingUp, Briefcase, Heart, MapPin, ClipboardList, Building,
  Activity, DollarSign, PieChart,
  FileText, FileBarChart, Megaphone, BookMarked, Landmark,
  Search, Key, FolderOpen,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: any;
  description?: string;
  titleKey?: string;
  descKey?: string;
}

export interface NavGroup {
  title: string;
  href: string;
  icon: any;
  children?: NavItem[];
  titleKey?: string;
}

export const navigationItems: NavGroup[] = [
  {
    title: "Accueil",
    href: "/",
    icon: Home,
    titleKey: "nav.home",
  },
  {
    title: "Statistiques",
    href: "/statistiques",
    icon: BarChart3,
    titleKey: "nav.statistics",
    children: [
      { title: "Démographie", href: "/statistiques/demographie", icon: Users, description: "Population, natalité, mortalité", titleKey: "nav.demography", descKey: "nav.demographyDesc" },
      { title: "Économie", href: "/statistiques/economie", icon: TrendingUp, description: "PIB, commerce, investissements", titleKey: "nav.economy", descKey: "nav.economyDesc" },
      { title: "Emploi", href: "/statistiques/travail", icon: Briefcase, description: "Emploi, chômage, salaires", titleKey: "nav.employment", descKey: "nav.employmentDesc" },
      { title: "Social", href: "/statistiques/social", icon: Heart, description: "Éducation, santé, pauvreté", titleKey: "nav.social", descKey: "nav.socialDesc" },
      { title: "Géographique", href: "/statistiques/geographique", icon: MapPin, description: "Données par département", titleKey: "nav.geographic", descKey: "nav.geographicDesc" },
      { title: "Enquêtes", href: "/statistiques/enquetes", icon: ClipboardList, description: "Enquêtes et sondages", titleKey: "nav.surveys", descKey: "nav.surveysDesc" },
      { title: "Recensements", href: "/statistiques/recensements", icon: Building, description: "Recensements de population", titleKey: "nav.censuses", descKey: "nav.censusesDesc" },
    ],
  },
  {
    title: "Tableaux de bord",
    href: "/tableaux-de-bord",
    icon: LayoutDashboard,
    titleKey: "nav.dashboards",
    children: [
      { title: "Démographie", href: "/tableaux-de-bord/demographie", icon: Users, description: "Indicateurs démographiques", titleKey: "nav.demography", descKey: "nav.demographyIndicators" },
      { title: "IPC", href: "/tableaux-de-bord/ipc", icon: Activity, description: "Indice des prix à la consommation", titleKey: "nav.ipc", descKey: "nav.cpiDesc" },
      { title: "PIB", href: "/tableaux-de-bord/pib", icon: DollarSign, description: "Produit intérieur brut", titleKey: "nav.pib", descKey: "nav.gdpDesc" },
      { title: "Emploi", href: "/tableaux-de-bord/travail", icon: Briefcase, description: "Marché du travail", titleKey: "nav.employment", descKey: "nav.laborDesc" },
      { title: "Social", href: "/tableaux-de-bord/social", icon: PieChart, description: "Indicateurs sociaux", titleKey: "nav.social", descKey: "nav.socialIndicators" },
    ],
  },
  {
    title: "Données ouvertes",
    href: "/donnees-ouvertes",
    icon: Database,
    titleKey: "nav.openData",
    children: [
      { title: "Catalogue", href: "/donnees-ouvertes/catalogue", icon: FolderOpen, description: "Explorer les jeux de données", titleKey: "nav.catalog", descKey: "nav.catalogDesc" },
      { title: "API Docs", href: "/donnees-ouvertes/api", icon: Search, description: "Documentation de l'API", titleKey: "nav.apiDocs", descKey: "nav.apiDocsDesc" },
      { title: "Clé API", href: "/donnees-ouvertes/cle-api", icon: Key, description: "Obtenir votre clé d'accès", titleKey: "nav.apiKeyNav", descKey: "nav.apiKeyDesc" },
      { title: "Jeux de données", href: "/donnees-ouvertes/datasets", icon: Database, description: "Télécharger les données", titleKey: "nav.datasets", descKey: "nav.datasetsDesc" },
    ],
  },
  {
    title: "Publications",
    href: "/publications",
    icon: BookOpen,
    titleKey: "nav.publications",
    children: [
      { title: "Bulletins", href: "/publications/bulletins", icon: FileText, description: "Bulletins statistiques", titleKey: "nav.bulletins", descKey: "nav.bulletinsDesc" },
      { title: "Rapports", href: "/publications/rapports", icon: FileBarChart, description: "Rapports d'analyse", titleKey: "nav.reports", descKey: "nav.reportsDesc" },
      { title: "Communiqués", href: "/publications/communiques", icon: Megaphone, description: "Communiqués de presse", titleKey: "nav.pressReleases", descKey: "nav.pressReleasesDesc" },
      { title: "Méthodologies", href: "/publications/methodologies", icon: BookMarked, description: "Notes méthodologiques", titleKey: "nav.methodologies", descKey: "nav.methodologiesDesc" },
      { title: "Recensements", href: "/publications/recensements", icon: Landmark, description: "Publications de recensements", titleKey: "nav.censusPublications", descKey: "nav.censusPublicationsDesc" },
    ],
  },
];
