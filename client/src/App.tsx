import React, {useState} from 'react';
import { Switch, Route } from "react-router-dom";
import axios from 'axios'
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import BookDetails from './pages/BookDetails';
import Home from './pages/Home';
import { User } from './types';
import AllBooks from './pages/AllBooks';

function App() {
  const [user, setUser] = useState<User>()

  const setUserData = (user:User) =>{
    setUser(user)
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/">
          <AllBooks/>
        </Route>
        <Route exact path="/login">
          <Login setUser={setUserData}/>
        </Route>
        <Route exact path="/logout">
          <Logout/>
        </Route>
        <Route exact path="/books/:bookId">
          <BookDetails/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
