import React, { SyntheticEvent, useState } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react';

import { useStore } from '../../../app/store/store';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';



export default observer(function ActivityList() {
    const {activityStore} = useStore();
    const [target, setTarget] = useState('');
    function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>,id:string){
        setTarget(e.currentTarget.name)
        activityStore.deleteActivity(id);
    }
    return (
        //Source : https://react.semantic-ui.com/views/item/#types-items
        
        <Segment>
            <Item.Group divided>
                {activityStore.activitiesByDate.map((activity) => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                                <div></div>
                            </Item.Description>

                            <Item.Extra>
                                <Button 
                                    name={activity.id}
                                    loading={activityStore.submitting && target===activity.id} 
                                    onClick={(e) => handleActivityDelete(e, activity.id)} 
                                    floated='right' 
                                    content='Remove' 
                                    color='red' 
                                />
                                
                                <Button  
                                        as={Link} 
                                        to={`/activities/${activity.id}`} 
                                        floated='right' content='View' 
                                        color='blue' />

                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
});