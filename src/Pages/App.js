import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  refresh_token: null,
  access_token: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("access_token", JSON.stringify(action.payload.access_token));
      localStorage.setItem("refresh_token", JSON.stringify(action.payload.refresh_token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        access_token: null,
        refresh_token: null,
        user: null
      };
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/home/" component={Home} />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
