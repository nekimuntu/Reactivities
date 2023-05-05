import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';


export default function NavBar() {    
    return (

        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to="/" header
                   
                //   active={activeItem === 'editorials'}
                //   onClick={this.handleItemClick}
                >
                    <img src='/assets/logo.png' alt='Logo' style={{marginRight:10}}/>
                        Reactivities
                </Menu.Item>

                <Menu.Item as={NavLink} to="/activities"
                    name='Activities'/>

                <Menu.Item >
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity'/>
                </Menu.Item>
                <Menu.Item >
                    <Button as={NavLink} to='/testError' positive content='Error tests'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}