import React from "react";
import {useState, useEffect} from "react";
import Navbar from "./components/Navbar";
import HomePage from "./screens/HomePage";
import GalleryPage from "./screens/GalleryPage";
import LogIn from "./screens/LogIn";
import Register from "./screens/Register";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {checkIfUserLoggedIn} from './screens/requests/userLogginStatus';
import {useHistory} from "react-router-dom";
import { createHashHistory } from 'history'
import {withRouter} from 'react-router-dom';
import MyBets from "./screens/my-bets";




function App() {
  const [userLogged, setUserLogged] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setUserLogged(checkIfUserLoggedIn)
  },[]);

  
  return (
    <div>
    <Router forceRefresh={true}>
    <Navbar userLogged={userLogged} />
      <Switch>
      <Route exact path="/" component={HomePage} history={history}/>
      <Route exact path="/gallery" component={GalleryPage} />
      <Route exact path="/log-in"><LogIn history={history} /></Route>
      <Route exact path="/register" component={Register} />
      <Route exact path="/my-bets" component={MyBets} />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
