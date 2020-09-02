import React, { Fragment, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { loadUser } from "./actions/auth";
import Profiles from "./components/profiles/Profiles";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profile from "./components/profile/Profile";
import Post from "./components/post/Post";
import Posts from "./components/posts/Posts";
import Alert from './components/layout/alert'

//Redux
import { Provider } from "react-redux";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="containter">
          {/* <Alert className="beneath"></Alert> */}
            <Switch>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/profiles" component={Profiles}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute
                exact
                path="/dashboard"
                component={Dashboard}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/posts"
                component={Posts}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/posts/:id"
                component={Post}
              ></PrivateRoute>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
