import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import UsersRoute from './UsersRoute';

function App() {
  return (
    <Router>
      <div className="App">
          < Navbar />
          <div className="page-content">
            <Switch>
              <Route exact path="/">
                < SignIn />
              </Route>
              <Route exact path="/signup">
                < SignUp />
              </Route>
              <Route path="/users/">
                <UsersRoute />
              </Route>
              <Route path="*">
                <h1>404!</h1>
              </Route>
            </Switch> 
          </div>
      </div>
    </Router>
  );
}

export default App;
