import React from 'react'
import Calendar from 'react-calendar'
import { Menu, Header } from 'semantic-ui-react'

export default function ActivityFilters() {
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop:25 }} >
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item content='all activities' />
                <Menu.Item content='Im Going' />
                <Menu.Item content='Im Hosting' />

            </Menu>
            <Header />
            <Calendar/>
        </>

    )
}