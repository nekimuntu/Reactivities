import React from 'react'
import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react'
import { Link, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/store';


function NavBar() {
    const { userStore: { user, logout } } = useStore();
    return (

        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to="/" header

                //   active={activeItem === 'editorials'}
                //   onClick={this.handleItemClick}
                >
                    <img src='/assets/logo.png' alt='Logo' style={{ marginRight: 10 }} />
                    Reactivities
                </Menu.Item>

                <Menu.Item as={NavLink} to="/activities"
                    name='Activities' />

                <Menu.Item >
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity' />
                </Menu.Item>
                <Menu.Item >
                    <Button as={NavLink} to='/testError' positive content='Error tests' />
                </Menu.Item>
                <Menu.Item position="right">
                    <Image src={user?.image || "/assets/user.png"} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName} >
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text="My Profile" icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>

                    </Dropdown>
                </Menu.Item>

            </Container>
        </Menu>
    )
}

export default observer(NavBar)