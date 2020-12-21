import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import dashboardTaks from '../src/pages/DashboardPage';

function App() {
  return (
    <>
      <Router>
        <Route component={Navbar} />
        <Switch>
          <Route path="/task" exact component={dashboardTaks} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
