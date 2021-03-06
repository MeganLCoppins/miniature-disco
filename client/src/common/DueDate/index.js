import "./style.css";
import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import { useAuth0 } from "../../utils/auth0Provider";
const { v4: uuidv4 } = require("uuid");
uuidv4();

//// ajax call to retrieve data from seed (Task)
function DueDate() {
  const { getTokenSilently } = useAuth0();
  const [tasks, setTasks] = useState([]);
  const {id} = useParams();
 
  useEffect(() => {
    loadTasks();
  });

async function loadTasks() {
  const token = await getTokenSilently();
  API.getTasks(token)
    .then(res => {
      setTasks(res.data.filter((data)=> data.project === id));
  })
    .catch((err) => console.log(err));
}

  const renderInfo = () => {
    if (tasks.length !== 0) {
      return tasks.map((task) => (
        <li key={task.title}>
          <div>
            <h4>{task.title}</h4>
          </div>{" "}
          <div>Due Date: </div>
          <Moment format="MM/DD/YYYY">{task.due_date}</Moment>
        </li>
      ));
    } else {
      return <h1>No Tasks to Display...</h1>;
    }
  };
  return (
      <div id="duedate">
        <ul>

        {renderInfo()}
        </ul>
      </div>
  );
}
export default DueDate;
