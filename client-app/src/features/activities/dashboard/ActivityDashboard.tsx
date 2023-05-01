import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/store/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';


function ActivityDashboard() {
    const { activityStore } = useStore();

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);


    if (activityStore.loadingInitial) return <LoadingComponent content='Loading App' />


    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                <h1>Activity filters</h1>
            {/*     {
                    activityStore.selectedActivity && !activityStore.editMode &&
                    <ActivityDetails />
                }
                {
                    activityStore.editMode &&
                    <ActivityForm />
                }
            */}
            </Grid.Column> 

        </Grid>
    );
}
export default observer(ActivityDashboard);