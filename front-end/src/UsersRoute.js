import { BrowserRouter as Router, Route, Switch, useRouteMatch  } from "react-router-dom/cjs/react-router-dom.min";
import Todo from "./Todo";

const UsersRoute = () => {
    let { path } = useRouteMatch();
    return ( 
        <Router>
            <Switch>
                <Route exact path={`${path}:user/todo`} >
                    <Todo />
                </Route>
                <Route exact path={`${path}:user/home`}>
                    <p>Hello world!</p>
                </Route>
                <Route exact path={`${path}:user/profile`}>
                    <h1>Implement Soon!</h1>
                </Route>
                <Route path="*">
                <h1>No User found!</h1>
              </Route>
            </Switch>
        </Router>
     );
}
 
export default UsersRoute;