import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import TournamentBrackets from "./pages/TournamentBrackets";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/tournamentBrackets" component={TournamentBrackets} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;