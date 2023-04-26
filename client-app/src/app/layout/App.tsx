import 'semantic-ui-css/semantic.min.css';
import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { List, Header, Container } from 'semantic-ui-react'
import { Activity } from '../models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activitySelected, setActivitySelected] = useState<Activity | undefined>(undefined);
  const [formOpened, setFormOpened] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        console.log(response);
        setActivities(response.data);
      })
  }, []);

  const funcHandleSelectActivity = (id: string) => {
    setActivitySelected(activities.find(a => a.id === id));
  }

  const funcHandleCancelActivity = () => {
    setActivitySelected(undefined);
  }

  const funHandleOpenForm = () =>{
    setFormOpened(true);
  }
  const funHandleCloseForm = () =>{
    setFormOpened(false);
  }

  return (
    //this Fraagment tag could be replaced by <> empty brackets
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>

        <ActivityDashboard
          activities={activities}
          selectedActivity={activitySelected}
          handleSelect={funcHandleSelectActivity}
          handleCancel={funcHandleCancelActivity}
          formOpened={formOpened}
          handleOpenForm={funHandleOpenForm}
          handleCloseForm={funHandleCloseForm}
        />
      </Container>
    </Fragment>
  );
}

export default App;
