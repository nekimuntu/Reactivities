import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Activity } from '../../../app/models/Activity';
import {v4 as uuid} from 'uuid'


export default observer(function ActivityForm() {
    const { id } = useParams();
    const { activityStore } = useStore();
    if (id) activityStore.loadActivity(id);
    const navig = useNavigate();

    const [stateActivity, setActivity] = useState<Activity>(
        {
            id: '',
            title: '',
            date: '',
            description: '',
            category: '',
            city: '',
            venue: ''
        }
    );
    
    useEffect(() => {        
        if (id) activityStore.loadActivity(id).then(activity=>setActivity(activityStore.selectedActivity!));
        
    }, [id, activityStore.loadActivity])

    const funcHandleSubmit = () => {
        // axios.post('').then(()=>{});
        if (!stateActivity.id){
            stateActivity.id = uuid();
            activityStore.update(stateActivity).then(navig(`/activities/${stateActivity.id}`)!);
        }
        else{
            activityStore.create(stateActivity).then(navig(`/activities/${stateActivity.id}`)!);
        }
        
    }

    function handleOnChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { value, name } = event.target;
        setActivity({ ...stateActivity, [name]: value })
    }

    return (
        <Segment clearing>
            <Form onSubmit={funcHandleSubmit} autoComplete='off'>
                <Form.Input placeholder="Title" name='title' value={stateActivity.title} onChange={handleOnChange} />
                <Form.Input placeholder="Category" name='category' value={stateActivity.category} onChange={handleOnChange} />
                <Form.TextArea placeholder="Description" name='description' value={stateActivity.description} onChange={handleOnChange} />
                <Form.Input placeholder="Date" type={'date'} name='date' value={stateActivity.date} onChange={handleOnChange} />
                <Form.Input placeholder="City" name='city' value={stateActivity.city} onChange={handleOnChange} />
                <Form.Input placeholder="Venue" name='venue' value={stateActivity.venue} onChange={handleOnChange} />
                <Button loading={activityStore.submitting} floated='right' positive type='submit' content='Submit' />
                <Button
                    as={Link} to='/activities'
                    floated='right' content='Cancel' />
            </Form>
        </Segment>
    );
});