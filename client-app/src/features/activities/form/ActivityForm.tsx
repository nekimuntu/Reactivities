import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/Activity';

import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/store/store';
import { observer } from 'mobx-react-lite';

interface Props {
    activity: Activity | undefined;
}
export default observer(function ActivityForm({  activity }: Props) {
    const {activityStore} = useStore();
    const intialState = activity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    };
    const [stateActivity, setActivity] = useState(intialState);
    const funcHandleSubmit = () => {
        // axios.post('').then(()=>{});
        activityStore.createOrEdit(stateActivity);
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
                <Button onClick={activityStore.closeForm} floated='right' type='submit' content='Cancel' />
            </Form>
        </Segment>
    );
});