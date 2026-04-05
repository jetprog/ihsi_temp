import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavGroup } from "@/lib/navigation";
import { useLanguage } from "@/i18n/context";

interface MegaMenuProps {
  item: NavGroup;
  currentPath: string;
}

export function MegaMenu({ item, currentPath }: MegaMenuProps) {
  const { t } = useLanguage();
  const isActive = currentPath === item.href || currentPath.startsWith(item.href + "/");

  const title = item.titleKey ? t(item.titleKey) : item.title;

  if (!item.children) {
    return (
      <Link
        to={item.href}
        className={cn(
          "px-3 py-2 rounded-md text-sm font-medium transition-colors relative",
          isActive
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
      >
        {title}
        {isActive && (
          <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-secondary rounded-full" />
        )}
      </Link>
    );
  }

  return (
    <div className="relative group">
      <Link
        to={item.href}
        className={cn(
          "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors relative",
          isActive
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
      >
        {title}
        <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
        {isActive && (
          <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-secondary rounded-full" />
        )}
      </Link>

      <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out translate-y-1 group-hover:translate-y-0">
        <div className="bg-card rounded-xl border shadow-xl p-2 min-w-[360px]">
          <div className="px-3 py-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {title}
            </span>
          </div>

          <div className={cn(
            "grid gap-0.5",
            item.children.length > 4 ? "grid-cols-2" : "grid-cols-1"
          )}>
            {item.children.map((child) => {
              const Icon = child.icon;
              const childActive = currentPath === child.href;
              const childTitle = child.titleKey ? t(child.titleKey) : child.title;
              const childDesc = child.descKey ? t(child.descKey) : child.description;
              return (
                <Link
                  key={child.href}
                  to={child.href}
                  className={cn(
                    "flex items-start gap-3 rounded-lg p-3 transition-all duration-150",
                    childActive
                      ? "bg-secondary/10 text-secondary"
                      : "hover:bg-muted"
                  )}
                >
                  <div className={cn(
                    "mt-0.5 rounded-lg p-2 shrink-0 transition-colors",
                    childActive ? "bg-secondary/20" : "bg-muted"
                  )}>
                    <Icon className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{childTitle}</div>
                    {childDesc && (
                      <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{childDesc}</div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="border-t mt-2 pt-2 px-3 pb-1">
            <Link
              to={item.href}
              className="flex items-center gap-1.5 text-xs font-medium text-secondary hover:text-secondary/80 transition-colors py-1"
            >
              {t("common.seeAll")} {title.toLowerCase()}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
