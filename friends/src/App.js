import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import LogIn from "./components/LogIn";
import FriendsList from "./components/FriendsList";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <>
      <h1>Friends</h1>
      <Router>
        <Link to='/login'>Log In</Link>
        {"  "}
        <Link to='/friendslist'>Friends List</Link>
        {"  "}
        <button onClick={logOut}>log Out</button>
        {"  "}
        <Switch>
          <Route path='/login' component={LogIn} />
          <PrivateRoute path='/friendslist' component={FriendsList} />
          <Route component={LogIn} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
