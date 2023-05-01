import React, { useEffect } from 'react';
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

export default observer(function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity:activity,loadActivity,loadingInitial} = activityStore;
    const {id} = useParams();

    useEffect(()=>{
        if(id) loadActivity(id);
    },[id,loadActivity])
    if ( !activity) return <LoadingComponent/>
    
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
                    <Button loading= {loadingInitial}
                        as={Link} to={`/createActivity/${activity.id}`}
                        basic color='blue' content='Edit' />
                    <Button 
                    as={Link} to='/activities'
                    basic color='grey' content='Cancel' />

                </ButtonGroup>
            </Card.Content>
        </Card>
    );
});
