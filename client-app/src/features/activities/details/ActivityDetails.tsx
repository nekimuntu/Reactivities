import React from 'react';
import { Activity } from '../../../app/models/Activity';
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react';

interface Props {
    activity: Activity;
    handleCancel:()=>void;
    // formOpened:boolean;
    handleOpenForm:(id?:string)=>void;
}

export default function ActivityDetails({ activity,handleCancel,handleOpenForm }: Props) {
    
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
                    <Button onClick={()=>handleOpenForm(activity.id)} basic color='blue' content='Edit' />
                    <Button onClick={handleCancel} basic color='grey' content='Cancel' />

                </ButtonGroup>
            </Card.Content>
        </Card>
    );
}
