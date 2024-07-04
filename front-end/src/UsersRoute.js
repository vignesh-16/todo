import { Route, Switch  } from "react-router-dom";
import Todo from "./Todo";
import Home from "./Home";
import Profile from "./Profile";

const UsersRoute = () => {
    return ( 
        <Switch>
            <Route exact path='/users/:user/todo' >
                < Todo />
            </Route>
            <Route exact path='/users/:user/home'>
                < Home/>
            </Route>
            <Route exact path='/users/:user/profile'>
                < Profile />
            </Route>
            <Route path="*">
                <h1>No User found!</h1>
            </Route>
        </Switch>
     );
}
 
export default UsersRoute;