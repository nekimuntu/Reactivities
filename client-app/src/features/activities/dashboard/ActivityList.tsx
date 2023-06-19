import React, { Fragment, SyntheticEvent, useState } from 'react';
import { Button, Header, Item, Label, Segment } from 'semantic-ui-react';

import { useStore } from '../../../app/store/store';
import { observer } from 'mobx-react-lite';

import ActivityListItem from './ActivityListItem';
import { Link } from 'react-router-dom';



export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { groupedActivities } = activityStore;

    return (
        //Source : https://react.semantic-ui.com/views/item/#types-items
        <>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}                       
                        {activities.map((activity) => (
                            <ActivityListItem key={activity.id} activity={activity} />
                        ))}
                    </Header>
                </Fragment>
            ))}
        </>

    )
})