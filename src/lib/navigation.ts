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
}

export interface NavGroup {
  title: string;
  href: string;
  icon: any;
  children?: NavItem[];
}

export const navigationItems: NavGroup[] = [
  {
    title: "Accueil",
    href: "/",
    icon: Home,
  },
  {
    title: "Statistiques",
    href: "/statistiques",
    icon: BarChart3,
    children: [
      { title: "Démographie", href: "/statistiques/demographie", icon: Users, description: "Population, natalité, mortalité" },
      { title: "Économie", href: "/statistiques/economie", icon: TrendingUp, description: "PIB, commerce, investissements" },
      { title: "Emploi", href: "/statistiques/travail", icon: Briefcase, description: "Emploi, chômage, salaires" },
      { title: "Social", href: "/statistiques/social", icon: Heart, description: "Éducation, santé, pauvreté" },
      { title: "Géographique", href: "/statistiques/geographique", icon: MapPin, description: "Données par département" },
      { title: "Enquêtes", href: "/statistiques/enquetes", icon: ClipboardList, description: "Enquêtes et sondages" },
      { title: "Recensements", href: "/statistiques/recensements", icon: Building, description: "Recensements de population" },
    ],
  },
  {
    title: "Tableaux de bord",
    href: "/tableaux-de-bord",
    icon: LayoutDashboard,
    children: [
      { title: "Démographie", href: "/tableaux-de-bord/demographie", icon: Users, description: "Indicateurs démographiques" },
      { title: "IPC", href: "/tableaux-de-bord/ipc", icon: Activity, description: "Indice des prix à la consommation" },
      { title: "PIB", href: "/tableaux-de-bord/pib", icon: DollarSign, description: "Produit intérieur brut" },
      { title: "Travail", href: "/tableaux-de-bord/travail", icon: Briefcase, description: "Marché du travail" },
      { title: "Social", href: "/tableaux-de-bord/social", icon: PieChart, description: "Indicateurs sociaux" },
    ],
  },
  {
    title: "Données ouvertes",
    href: "/donnees-ouvertes",
    icon: Database,
    children: [
      { title: "Catalogue", href: "/donnees-ouvertes/catalogue", icon: FolderOpen, description: "Explorer les jeux de données" },
      { title: "API Docs", href: "/donnees-ouvertes/api", icon: Search, description: "Documentation de l'API" },
      { title: "Clé API", href: "/donnees-ouvertes/cle-api", icon: Key, description: "Obtenir votre clé d'accès" },
      { title: "Jeux de données", href: "/donnees-ouvertes/datasets", icon: Database, description: "Télécharger les données" },
    ],
  },
  {
    title: "Publications",
    href: "/publications",
    icon: BookOpen,
    children: [
      { title: "Bulletins", href: "/publications/bulletins", icon: FileText, description: "Bulletins statistiques" },
      { title: "Rapports", href: "/publications/rapports", icon: FileBarChart, description: "Rapports d'analyse" },
      { title: "Communiqués", href: "/publications/communiques", icon: Megaphone, description: "Communiqués de presse" },
      { title: "Méthodologies", href: "/publications/methodologies", icon: BookMarked, description: "Notes méthodologiques" },
      { title: "Recensements", href: "/publications/recensements", icon: Landmark, description: "Publications de recensements" },
    ],
  },
];
