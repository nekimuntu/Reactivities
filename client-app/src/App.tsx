import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Grid } from 'semantic-ui-react';

function App() {
  const [activities,setActivities] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/api/activities')
            .then(response=>{
              console.log(response);
              setActivities(response.data);
              console.log("liste des activites "+ activities);
            })
  },[]);


  return (
    <div className="App">
      <Grid>
         <Grid.Column width={10} height={6}>Col1

          </Grid.Column>
          <Grid.Column width={4} height={6}>Col2

          </Grid.Column>
      </Grid>
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {activities.map((activity:any)=>(
            <li key={activity.id}>
             {activity.title}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
