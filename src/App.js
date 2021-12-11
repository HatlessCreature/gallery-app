import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getActiveUser, selectIsAuthenticated, selectActiveUser} from "./store/auth";
import NavBar from "./components/NavBar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GuestRoute from "./components/shared/GuestRoute";
import PrivateRoute from './components/shared/PrivateRoute';
import GalleriesApp from './pages/GalleriesApp';
import GalleryApp from './pages/GalleryApp';

function App() {
  const activeUser = useSelector(selectActiveUser);
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
            <Redirect to="/galleries"/>
          </Route>
          <Route exact path="/galleries">
            <GalleriesApp/>
          </Route>
          <PrivateRoute exact path="/galleries/me">
            <GalleriesApp selfId={isAuthenticated ? (activeUser?.id) : null}/>
          </PrivateRoute>
          <Route exact path="/galleries/:id">
            <GalleryApp/>
          </Route>
          <Route exact path="/authors/:id">
            <GalleriesApp />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
