import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavGroup } from "@/lib/navigation";

interface MegaMenuProps {
  item: NavGroup;
  currentPath: string;
}

export function MegaMenu({ item, currentPath }: MegaMenuProps) {
  const isActive = currentPath === item.href || currentPath.startsWith(item.href + "/");

  if (!item.children) {
    return (
      <Link
        to={item.href}
        className={cn(
          "px-3 py-2 rounded-md text-sm font-medium transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
      >
        {item.title}
      </Link>
    );
  }

  return (
    <div className="relative group">
      <Link
        to={item.href}
        className={cn(
          "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
      >
        {item.title}
        <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
      </Link>

      {/* Dropdown */}
      <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="bg-card rounded-lg border shadow-lg p-4 min-w-[320px]">
          <div className={cn(
            "grid gap-1",
            item.children.length > 4 ? "grid-cols-2" : "grid-cols-1"
          )}>
            {item.children.map((child) => {
              const Icon = child.icon;
              const childActive = currentPath === child.href;
              return (
                <Link
                  key={child.href}
                  to={child.href}
                  className={cn(
                    "flex items-start gap-3 rounded-md p-2.5 transition-colors",
                    childActive
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  )}
                >
                  <div className="mt-0.5 rounded-md bg-muted p-1.5 shrink-0">
                    <Icon className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{child.title}</div>
                    {child.description && (
                      <div className="text-xs text-muted-foreground mt-0.5">{child.description}</div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
