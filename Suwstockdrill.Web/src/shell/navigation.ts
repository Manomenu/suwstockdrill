import { Building2, ChartNoAxesCombined, FileText, Lightbulb, NotebookPen, Radar, StickyNote, Wallet, type LucideIcon } from "lucide-react";

export interface NavigationItem {
    label: string;
    href: string;
    icon: LucideIcon;
}

export const MAIN_ITEMS: readonly NavigationItem[] = [
    { label: "Spółki", href: "/companies", icon: Building2 },
    { label: "Teza", href: "/thesis", icon: Lightbulb },
    { label: "Monitoring", href: "/monitoring", icon: Radar },
    { label: "Briefy", href: "/briefs", icon: FileText },
    { label: "Notatnik", href: "/notebook", icon: NotebookPen },
    { label: "Portfel", href: "/portfolio", icon: Wallet },
    { label: "Backtesty", href: "/backtests", icon: ChartNoAxesCombined },
];

export const EXAMPLE_ITEM: NavigationItem = { label: "Notes (przykład)", href: "/notes", icon: StickyNote };

export const HOME_HREF = "/companies";

export function isCurrent(pathname: string, href: string): boolean {
    return pathname === href || pathname.startsWith(`${href}/`);
}
