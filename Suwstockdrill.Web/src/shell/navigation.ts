export interface NavigationItem {
    label: string;
    href: string;
}

export const MAIN_ITEMS: readonly NavigationItem[] = [
    { label: "Spółki", href: "/companies" },
    { label: "Teza", href: "/thesis" },
    { label: "Monitoring", href: "/monitoring" },
    { label: "Briefy", href: "/briefs" },
    { label: "Notatnik", href: "/notebook" },
    { label: "Portfel", href: "/portfolio" },
    { label: "Backtesty", href: "/backtests" },
];

// Why: the template's example feature stays reachable as the pattern for new features, apart from the product's own.
export const EXAMPLE_ITEM: NavigationItem = { label: "Notes (przykład)", href: "/notes" };

export const HOME_HREF = "/companies";

// Why: a screen under an item (a company's report under /companies) keeps the item marked, unlike wouter's exact-match active link.
export function isCurrent(pathname: string, href: string): boolean {
    return pathname === href || pathname.startsWith(`${href}/`);
}
