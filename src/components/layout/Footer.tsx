import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  {
    title: "Statistiques",
    links: [
      { title: "Démographie", href: "/statistiques/demographie" },
      { title: "Économie", href: "/statistiques/economie" },
      { title: "Travail", href: "/statistiques/travail" },
      { title: "Social", href: "/statistiques/social" },
    ],
  },
  {
    title: "Tableaux de bord",
    links: [
      { title: "IPC", href: "/tableaux-de-bord/ipc" },
      { title: "PIB", href: "/tableaux-de-bord/pib" },
      { title: "Démographie", href: "/tableaux-de-bord/demographie" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { title: "Données ouvertes", href: "/donnees-ouvertes" },
      { title: "Publications", href: "/publications" },
      { title: "API Docs", href: "/donnees-ouvertes/api" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <span className="font-bold text-sm">IH</span>
              </div>
              <span className="font-bold text-lg">IHSI</span>
            </div>
            <p className="text-sm text-primary-foreground/70 max-w-xs mb-6">
              Institut Haïtien de Statistique et d'Informatique — la source officielle de données statistiques d'Haïti.
            </p>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>1, Angle rues Joseph Janvier et Dr Aubry, Port-au-Prince</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+509 2941-4507</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@ihsi.ht</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold text-sm mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} IHSI. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-primary-foreground transition-colors">Mentions légales</Link>
            <Link to="#" className="hover:text-primary-foreground transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
