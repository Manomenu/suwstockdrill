import { Link } from "wouter";

import { cn } from "@/design/classNames";

import { EXAMPLE_ITEM, isCurrent, MAIN_ITEMS, type NavigationItem } from "./navigation";

const ITEM = "block rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent/50";
const ACTIVE = "bg-primary-light text-primary-light-foreground";

export function AppNavbar({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
    function item(entry: NavigationItem) {
        const current = isCurrent(pathname, entry.href);
        return (
            <Link
                href={entry.href}
                onClick={onNavigate}
                aria-current={current ? "page" : undefined}
                className={cn(ITEM, current && ACTIVE)}
            >
                {entry.label}
            </Link>
        );
    }

    return (
        <nav aria-label="Główna" className="flex min-h-0 flex-1 flex-col gap-0.5">
            <ul className="flex flex-col gap-0.5">
                {MAIN_ITEMS.map((entry) => (
                    <li key={entry.href}>{item(entry)}</li>
                ))}
            </ul>
            <div className="mt-auto border-t border-border pt-2">{item(EXAMPLE_ITEM)}</div>
        </nav>
    );
}
