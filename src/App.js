import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getActiveUser, selectIsAuthenticated} from "./store/auth";
import NavBar from "./components/NavBar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GuestRoute from "./components/shared/GuestRoute";
import PrivateRoute from './components/shared/GuestRoute';
import GalleriesApp from './pages/GalleriesApp';

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getActiveUser());
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Switch>
          <GuestRoute exact path="/register">
            <Register/>
          </GuestRoute>
          <GuestRoute exact path="/login">
            <Login/>
          </GuestRoute>
          <Route exact path="/">
            <GalleriesApp/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
