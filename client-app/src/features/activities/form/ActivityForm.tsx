import React from 'react'
import { Button, Checkbox, Form, Segment } from 'semantic-ui-react';

interface Props{
    handleCloseForm:()=>void;
    formOpened:boolean;
}
export default function ActivityForm({handleCloseForm,formOpened}:Props) {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder="Title"/>                    
                <Form.Input placeholder="Category"/> 
                <Form.TextArea placeholder="Description" /> 
                <Form.Input placeholder="Date"/> 
                <Form.Input placeholder="City"/> 
                <Form.Input placeholder="Venue"/>
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={handleCloseForm} floated='right'  type='submit' content='Cancel' />                
            </Form>
        </Segment>
    );
}