const KEY = "suwstockdrill.navigation-panel";

// Why: storage can be blocked (private mode, site data off); the panel then falls back to the screen width.
export function storedCollapsed(): boolean | null {
    try {
        const stored = window.localStorage.getItem(KEY);
        return stored === null ? null : stored === "collapsed";
    } catch {
        return null;
    }
}

export function storeCollapsed(collapsed: boolean): void {
    try {
        window.localStorage.setItem(KEY, collapsed ? "collapsed" : "expanded");
    } catch {
        // Why: not remembering the choice is fine; the panel still toggles.
    }
}
