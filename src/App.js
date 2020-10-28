import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

const App = () => {
  return (
    <div>
      <Router>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Router>
    </div>
  );
}

export default App;
