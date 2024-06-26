import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Todo from './Todo';
import SignUp from './SignUp';

function App() {
  return (
    <Router>
      <div className="App">
          < Navbar />
          <div className="page-content">
            <Switch>
              <Route exact path="/">
                <p>Hello World!</p>
              </Route>
              <Route exact path="/signup">
                < SignUp />
              </Route>
              <Route exact path="/todo">
                <Todo />
              </Route>
              <Route exact path="/profile">
                <h1>Implement Soon!</h1>
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
