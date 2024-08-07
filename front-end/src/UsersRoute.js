import { Route, Switch  } from "react-router-dom";
import Todo from "./components/Todo";
import Home from "./Home";
import Profile from "./components/Profile";
import CompletedTasks from "./components/CompletedTasks";

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
            <Route exact path='/users/:user/completedTasks'>
                < CompletedTasks />
            </Route>
            <Route path="*">
                <h1>No User found!</h1>
            </Route>
        </Switch>
     );
}
 
export default UsersRoute;