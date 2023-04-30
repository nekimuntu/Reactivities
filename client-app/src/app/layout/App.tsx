import 'semantic-ui-css/semantic.min.css';
import React, { Fragment, useEffect } from 'react';
import './App.css';
import { Container } from 'semantic-ui-react'
import { Activity } from '../models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

import LoadingComponent from './LoadingComponent';
import {  useStore } from '../store/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore(); 

  useEffect(() => {
    activityStore.loadActivities();
    
  }, [activityStore]);
  

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading App' />
  return (
    //this Fraagment tag could be replaced by <> empty brackets
    <Fragment>
      <NavBar />      
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
}

export default observer(App);
