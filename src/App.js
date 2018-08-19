import React, { Component } from 'react';
import Validation from './component/validation/validation';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './component/dashboard/dashboard';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
              <Route  path="/app" render={() => <Dashboard/> } />
              <Route  path="/auth" render={() => <Validation/>} />
              <Route  path="/" render={() => <Validation />}  />
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
