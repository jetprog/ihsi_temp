import { Link, useLocation } from "react-router-dom";
import { Home, LayoutDashboard, Database, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/context";

export function BottomNav() {
  const location = useLocation();
  const { t } = useLanguage();

  const bottomNavItems = [
    { label: t("bottomNav.home"), href: "/", icon: Home },
    { label: t("bottomNav.dashboards"), href: "/tableaux-de-bord", icon: LayoutDashboard },
    { label: t("bottomNav.data"), href: "/donnees-ouvertes", icon: Database },
    { label: t("bottomNav.search"), href: "/donnees-ouvertes?q=", icon: Search },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t shadow-[0_-2px_10px_rgba(0,0,0,0.06)] lg:hidden">
      <div className="flex items-center justify-around h-14 px-2">
        {bottomNavItems.map((item) => {
          const isActive =
            item.href === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.href.split("?")[0]);

          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors min-w-[56px]",
                isActive
                  ? "text-secondary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
