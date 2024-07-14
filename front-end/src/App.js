import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UsersRoute from './UsersRoute';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
          < Navbar />
          <div className="page-content">
            <Switch>
              <Route exact path="/">
                < Login />
              </Route>
              <Route exact path="/signup">
                {/* < SignUp /> */}
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
