import 'semantic-ui-css/semantic.min.css';
import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import { Container } from 'semantic-ui-react'
import { Activity } from '../models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid'
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activitySelected, setActivitySelected] = useState<Activity | undefined>(undefined);
  const [editForm, setEditForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let _activities: Activity[] = []
    agent.Activities.list().then(response => {
      response.forEach(x => {
        x.date = x.date.split('T')[0];
        _activities.push(x);
      });
      setActivities(_activities);
      setLoading(false);
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
    setEditForm(true);
  }
  const funcHandleCloseForm = () => {
    setEditForm(false);
  }

  const handleCreateOrEditActivity = (activity: Activity) => {

    if (activity.id) {
      setSubmitting(true);
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setEditForm(false); //close form
        setActivitySelected(activity);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setEditForm(false); //close form
        setActivitySelected(activity);
        setSubmitting(false);
      });
    }
    // activity.id ? setActivities([...activities.filter(x => x.id !== activity.id),activity]) //If editing we return an array (filter gonna take out the activity to edit)with the edited values
    //             : setActivities([...activities,{...activity,id:uuid()}]);
  }

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })

  }

  if (loading) return <LoadingComponent content='Loading App' />
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
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default App;
