import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import { useAuth0 } from "./utils/auth0Provider";
import PrivateRoute from "../src/components/PrivateRoute";
import "./App.css";

// Common
import Navbar from "./common/Navbar";

// Views
import Home from "./views/Home";
import AddTask from "./views/AddTask/AddTask";
import Profile from "../src/views/Profile/Profile";
// import ViewTasks from "../src/views/ViewTasks/ViewTasks";
// import Project from "./views/Project";


import Splash from "./views/SplashPage/index";
// import DueDate from "./common/DueDate/index";

function App() {
  const { loading, isAuthenticated } = useAuth0();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Splash />;
  }

  return (
    <Router history={history}>
      {/* <DueDate /> */}
      <Navbar />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/tasks/add" component={AddTask} />
        <PrivateRoute path="/profile" component={Profile}/>
      </Switch>
    </Router>
  );
}

export default App;
