import HomeContent from './HomeContent'
import DetailContent from './DetailContent'
import PostContent from './PostContent'
import UserContent from './UserContent'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

const MainContent = function () {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={HomeContent} />
                <Route
                    path="/detail/:momentId"
                    exact
                    render={({ match }) => (
                        <DetailContent momentId={match.params.momentId} />
                    )}
                />
                <Route exact path='/post' component={PostContent} />
                <Route exact path='/mypage' component={UserContent} />
            </Switch>
        </Router>
    );
};

export default MainContent;