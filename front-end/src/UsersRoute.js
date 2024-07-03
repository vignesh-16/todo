import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";
import Todo from "./Todo";

const UsersRoute = () => {
    return ( 
        <Router>
            <Switch>
                <Route exact path='/users/:user/todo' >
                    <Todo />
                </Route>
                <Route exact path='/users/:user/home'>
                    <p>Hello world!</p>
                </Route>
                <Route exact path='/users/:user/profile'>
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