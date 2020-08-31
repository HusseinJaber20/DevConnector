import React , {Fragment} from 'react';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';

function App() {
  return (
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
  );
}

export default App;
