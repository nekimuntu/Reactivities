import React from 'react';
import { Activity } from '../../../app/models/Activity';
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';


export default function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity:activity} = activityStore;

    if (!activity) return <LoadingComponent/>
    
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'> {activity.date} </span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup>
                    <Button onClick={()=>activityStore.openForm(activity.id)} basic color='blue' content='Edit' />
                    <Button onClick={activityStore.cancelActivity} basic color='grey' content='Cancel' />

                </ButtonGroup>
            </Card.Content>
        </Card>
    );
}
