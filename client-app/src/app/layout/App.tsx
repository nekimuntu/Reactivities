import 'semantic-ui-css/semantic.min.css';
import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { List, Header, Container } from 'semantic-ui-react'
import { Activity } from '../models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid'

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activitySelected, setActivitySelected] = useState<Activity | undefined>(undefined);
  const [editForm, setFormOpened] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data);
      })
  }, []);

  const funcHandleSelectActivity = (id: string) => {
    setActivitySelected(activities.find(a => a.id === id));
  }

  const funcHandleCancelActivity = () => {
    setActivitySelected(undefined);
  }

  const funcHandleOpenForm = (id?: string) => {
    id ? funcHandleSelectActivity(id) : funcHandleCancelActivity();
    setFormOpened(true);
  }
  const funcHandleCloseForm = () => {
    setFormOpened(false);
  }

  const handleCreateOrEditActivity = (activity:Activity) => {
    
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id),activity]) //If editing we return an array (filter gonna take out the activity to edit)with the edited values
                : setActivities([...activities,{...activity,id:uuid()}]);
    setFormOpened(false); //close form
    setActivitySelected(activity); //record in state the edited or created activity
  }
  const handleDeleteActivity=(id:string)=>{
    setActivities([...activities.filter(x=>x.id!==id)]);
  }

  return (
    //this Fraagment tag could be replaced by <> empty brackets
    <Fragment>
      <NavBar openForm={funcHandleOpenForm} />

      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={activitySelected}
          handleSelect={funcHandleSelectActivity}
          handleCancel={funcHandleCancelActivity}
          editMode={editForm}
          handleOpenForm={funcHandleOpenForm}
          handleCloseForm={funcHandleCloseForm}
          creatOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
