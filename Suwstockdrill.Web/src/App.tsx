import { Redirect, Route, Switch } from "wouter";

import { BacktestsScreen } from "./backtests/BacktestsScreen";
import { BriefsScreen } from "./briefs/BriefsScreen";
import { CompaniesScreen } from "./companies/CompaniesScreen";
import { MonitoringScreen } from "./monitoring/MonitoringScreen";
import { NotebookScreen } from "./notebook/NotebookScreen";
import { NotesScreen } from "./notes/NotesScreen";
import { PortfolioScreen } from "./portfolio/PortfolioScreen";
import { HOME_HREF } from "./shell/navigation";
import { Shell } from "./shell/Shell";
import { ThesisScreen } from "./thesis/ThesisScreen";

export function App() {
    return (
        <Shell>
            <Switch>
                <Route path="/companies" component={CompaniesScreen} />
                <Route path="/thesis" component={ThesisScreen} />
                <Route path="/monitoring" component={MonitoringScreen} />
                <Route path="/briefs" component={BriefsScreen} />
                <Route path="/notebook" component={NotebookScreen} />
                <Route path="/portfolio" component={PortfolioScreen} />
                <Route path="/backtests" component={BacktestsScreen} />
                <Route path="/notes" component={NotesScreen} />
                <Route>
                    <Redirect to={HOME_HREF} replace />
                </Route>
            </Switch>
        </Shell>
    );
}
