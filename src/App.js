import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {} from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import { useAuth } from "./hooks";

function App() {

  const auth = useAuth()

  const PageNotFound = () => {
    return <h1>404</h1>;
  };

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          {auth.token? <Home />: <Login/> }
          
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
