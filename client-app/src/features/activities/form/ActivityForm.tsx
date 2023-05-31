import React, { useEffect, useState } from 'react'
import { Button, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Activity } from '../../../app/models/Activity';
import { v4 as uuid } from 'uuid'
import { Formik, Form } from 'formik';
import MyTextInput from '../../../common/form/MyTextInput';
import * as Yup from 'yup'
import MyTextArea from '../../../common/form/MyTextArea';
import MySelectInput from '../../../common/form/MySelectInput';
import { categoryOptions } from '../../../common/form/options/categoryOptions';
import MyDateInput from '../../../common/form/MyDateInput';


export default observer(function ActivityForm() {
    const { id } = useParams();
    const { activityStore } = useStore();
    if (id) activityStore.loadActivity(id);
    const navig = useNavigate();

    const [stateActivity, setActivity] = useState<Activity>(
        {
            id: '',
            title: '',
            date: new Date() ,
            description: '',
            category: '',
            city: '',
            venue: ''
        }
    );

    useEffect(() => {
        if (id) activityStore.loadActivity(id).then(activity => setActivity(activityStore.selectedActivity!));

    }, [id, activityStore.loadActivity])

    const handleFormSubmit = (activity:Activity) => {
        // axios.post('').then(()=>{});
        if (!activity.id) {
            activity.id = uuid();
            activityStore.update(activity).then(navig(`/activities/${activity.id}`)!);
        }
        else {
            activityStore.create(activity).then(navig(`/activities/${activity.id}`)!);
        }

    }

    // function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const { value, name } = event.target;
    //     setActivity({ ...stateActivity, [name]: value })
    // }
    const validationSchema = Yup.object({
        title: Yup.string().required("Activity title is required"),
        description: Yup.string().required("description is required"),
        date: Yup.date().required(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
        category: Yup.string().required(),
    })

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}                
                initialValues={stateActivity}
                onSubmit={(values) => handleFormSubmit(values)} 
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder="title" name="title" />
                        <MySelectInput options={categoryOptions} placeholder="Category" name='category' />
                        <MyTextArea placeholder="Description" name='description' />
                        <MyDateInput
                            showTimeSelect
                             placeholderText="Date" 
                             name='date' 
                             dateFormat='MMMM d, yy h:mm aa'
                        />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput placeholder="City" name='city' />
                        <MyTextInput placeholder="Venue" name='venue' />
                        <Button 
                            disabled={isSubmitting || !isValid || !dirty}
                            loading={activityStore.submitting} 
                            floated='right' 
                            positive type='submit' content='Submit' />
                        <Button
                            as={Link} to='/activities'
                            floated='right' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    );
});