import React from 'react';
import HomePage from './Components/HomePage';
import PublicPage from './Components/PublicPage';
import Navigation from './Components/Navigation';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
class App extends React.Component {
  render() {
    return (
      <React.Fragment>
       
        <Router>
          <Navigation>
          <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/public">
            <PublicPage/>
          </Route>
          
        </Switch>
          </Navigation>
     
    </Router>
          
         

  
      </React.Fragment>
    );
  }
}
export default App;