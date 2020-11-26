import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Header from './components/Header';

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
      <Header />
      <Router>
        <Route exact path="/" component={!state.isAuthenticated ? Login : Home} />
        <Route exact path="/register" component={Register} />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
