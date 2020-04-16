import React from "react";
import { useAuth0 } from "../../utils/auth0Provider";
import { Link } from "react-router-dom";

function Home() {
  const { isAuthenticated, user } = useAuth0();
  return (
    <div>
      <h1>Welcome Home!</h1>
      {isAuthenticated && <p>{JSON.stringify(user, null, 2)}</p>}
      <button><Link to={"/tasks/add"}>Add a Task</Link></button>
    </div>
  );
}

export default Home;
