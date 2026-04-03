import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { navigationItems } from "@/lib/navigation";

export default function TableauxDeBord() {
  const dashNav = navigationItems.find((n) => n.title === "Tableaux de bord");
  const children = dashNav?.children || [];

  return (
    <Layout>
      <section className="container py-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">Tableaux de bord</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Visualisez les indicateurs clés d'Haïti à travers des tableaux de bord interactifs.
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
