import React , {Fragment,useEffect} from 'react';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import {loadUser} from './actions/auth'
import setAuthToken from './utils/setAuthToken'

//Redux
import {Provider} from 'react-redux'
import store from './store'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  useEffect(()=>{
    store.dispatch(loadUser())
  },[])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path = '/' component = {Landing} />
          <section className="containter">
            <Switch>
              <Route exact path ='/register' component ={Register}></Route>
              <Route exact path ='/login' component = {Login}></Route>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
