import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Playlists from "./pages/Playlist";
import Navbar from "./components/Navbar";
import { useAuth } from "./hooks";
import Player from "./pages/Player";

function App() {
  const auth = useAuth();

  const PageNotFound = () => {
    return <h1>404</h1>;
  };

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          {auth.token ? <Home /> : <Login />}
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path={"/playlist/:id"}>
          <Playlists />
        </Route>
        <Route exact path={"/player/:id"}>
          <Player />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
