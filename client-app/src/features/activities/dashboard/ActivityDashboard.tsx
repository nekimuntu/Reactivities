import React from 'react'
import { Grid } from 'semantic-ui-react';

import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../app/store/store';
import { observer } from 'mobx-react-lite';



 function ActivityDashboard() {
    const {activityStore} = useStore();
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                {
                    activityStore.selectedActivity && !activityStore.editMode &&
                    <ActivityDetails />
                }
                {
                    activityStore.editMode &&
                    <ActivityForm activity={activityStore.selectedActivity}/>                    
                }
                
            </Grid.Column>

        </Grid>
    );
}
export default observer(ActivityDashboard);