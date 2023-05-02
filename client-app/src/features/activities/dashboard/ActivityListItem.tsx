import { observer } from 'mobx-react-lite'
import React, { SyntheticEvent, useState } from 'react'
import { Button, Icon, Item, ItemContent, ItemHeader, ItemImage, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';
import { Activity } from '../../../app/models/Activity';
import { Link } from 'react-router-dom';

interface Props{
    activity:Activity;
}

export default function ActivityListItem({activity}:Props) {
    const {activityStore} = useStore();
    const [target, setTarget] = useState('');

    function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>,id:string){
        setTarget(e.currentTarget.name)
        activityStore.deleteActivity(id);
    }

    return (
        <Segment.Group>
            <Segment>
                <Item>
                    <ItemImage size='tiny' circular src='/assets/user.png' />
                    <ItemContent>
                    <Item.Header as={Link} to={`/activities/${activity.id}`} >
                        {activity.title}
                    </Item.Header>
                    <Item.Description>Hosted by Bob</Item.Description>
                    </ItemContent>    
                </Item>
            </Segment>
            <Segment>
                <span>
                <Icon name='clock' />{activity.date}
                <Icon name='marker' />{activity.venue}
                </span> 
            </Segment>
            <Segment secondary>
                Attendee goes here
            </Segment>
            <Segment clearing >
                <span>{activity.description}</span>
               
                <Button 
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    );
}