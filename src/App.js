import React, { Component } from 'react';
import Validation from './component/validation/validation';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Dashboard from './component/dashboard/dashboard';

class App extends Component {
  render() {
    const item = localStorage.getItem('token');
    return (
        <BrowserRouter>
          <Switch>
                <Route  path="/app" render={() => item ? <Dashboard />: <Redirect to='/login'/>} />
                <Route  path={['/', '/auth']}  render={() =>( <Validation />) } /> 
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
