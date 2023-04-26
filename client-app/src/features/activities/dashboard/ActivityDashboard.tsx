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
    formOpened: boolean;
    handleOpenForm: () => void;
    handleCloseForm: () => void;
}
export default function ActivityDashboard({ activities, selectedActivity,
    handleSelect, handleCancel,
    formOpened,
    handleOpenForm,
    handleCloseForm }: Props) {

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={activities} handleSelect={handleSelect} />
            </Grid.Column>
            <Grid.Column width={6}>
                {
                    selectedActivity && !formOpened &&
                    <ActivityDetails
                        activity={selectedActivity}
                        handleCancel={handleCancel}
                        handleOpenForm={handleOpenForm}
                        formOpened={formOpened}
                    />
                }
                {
                    selectedActivity && formOpened &&
                    <ActivityForm
                        handleCloseForm={handleCloseForm}
                        formOpened={formOpened}
                    />
                }
            </Grid.Column>

        </Grid>
    );
}