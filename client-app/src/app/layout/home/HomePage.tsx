import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../store/store";
import LoginForm from "../../../features/activities/user/LoginForm";
import RegisterForm from "../../../features/activities/user/RegisterForm";

function HomPage() {
    const { userStore, modalStore } = useStore()
    return (
        <Container className='homepage' style={{ marginTop: "7 em" }} >
            <Segment inverted textAlign='center' vertical className="masthead" >
                <Container text >
                    <Header as="h1" inverted>
                        <Image size="massive" src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                        Reactivities
                    </Header>
                    <Header as="h2" inverted content='Welcome to Reactivities' />
                    {userStore.isLogged ?
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Got To Activities !
                        </Button>
                        :
                        <>
                        <Button onClick={()=> modalStore.openModal(
                            <LoginForm />
                        )} size='huge' inverted>
                            Login!
                        </Button>
                        <Button onClick={()=> modalStore.openModal(
                            <RegisterForm />
                        )} size='huge' inverted>
                            Register
                        </Button>
                        </>
                        
                    }
                </Container>
            </Segment>
        </Container>
    );
}

export default observer(HomPage)