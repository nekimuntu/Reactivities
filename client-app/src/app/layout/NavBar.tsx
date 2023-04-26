import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

export default function NavBar() {
    return (

        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header
                   
                //   active={activeItem === 'editorials'}
                //   onClick={this.handleItemClick}
                >
                    <img src='/assets/logo.png' alt='Logo' style={{marginRight:10}}/>
                        Reactivities
                </Menu.Item>

                <Menu.Item
                    name='Activities'/>

                <Menu.Item
                    name='upcomingEvents'
                >
                    <Button positive content='Create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}