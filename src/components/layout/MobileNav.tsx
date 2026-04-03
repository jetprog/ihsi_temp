import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { navigationItems } from "@/lib/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MobileNavProps {
  currentPath: string;
}

export function MobileNav({ currentPath }: MobileNavProps) {
  return (
    <ScrollArea className="h-[calc(100vh-65px)]">
      <div className="p-4">
        <Accordion type="multiple" className="w-full">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href || currentPath.startsWith(item.href + "/");

            if (!item.children) {
              return (
                <Link
                  key={item.title}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-2 py-3 rounded-md text-sm font-medium transition-colors",
                    isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            }

            return (
              <AccordionItem key={item.title} value={item.title} className="border-none">
                <AccordionTrigger className={cn(
                  "px-2 py-3 rounded-md text-sm font-medium hover:no-underline hover:bg-muted",
                  isActive && "bg-primary/10 text-primary"
                )}>
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="ml-4 space-y-1 pt-1">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      return (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                            currentPath === child.href
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          )}
                        >
                          <ChildIcon className="h-3.5 w-3.5" />
                          {child.title}
                        </Link>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </ScrollArea>
  );
}
