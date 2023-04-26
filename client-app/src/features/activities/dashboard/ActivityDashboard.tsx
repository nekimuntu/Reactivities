import React from 'react'
import { Container, Grid, List } from 'semantic-ui-react';
import { Activity } from '../../../app/models/Activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    handleSelect: (id: string) => void;
    handleCancel: () => void;
    editMode: boolean;
    handleOpenForm: (id?:string) => void;
    handleCloseForm: () => void;
    creatOrEdit:(activity:Activity)=>void;
    deleteActivity:(id:string)=>void;
}

export default function ActivityDashboard({ activities, selectedActivity,
    handleSelect, handleCancel,
    editMode,
    handleOpenForm,
    handleCloseForm,
    creatOrEdit,
    deleteActivity }: Props) {

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList deleteActivity={deleteActivity} activities={activities} handleSelect={handleSelect} />
            </Grid.Column>
            <Grid.Column width={6}>
                {
                    selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        handleCancel={handleCancel}
                        handleOpenForm={handleOpenForm}
                    />
                }
                {
                    editMode &&
                    <ActivityForm
                        handleCloseForm={handleCloseForm}
                        activity={selectedActivity}
                        creatOrEdit={creatOrEdit}
                    />                    
                }
                
            </Grid.Column>

        </Grid>
    );
}