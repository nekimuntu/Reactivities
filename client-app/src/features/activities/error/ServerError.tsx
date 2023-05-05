import { Container, Header, Message, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";


export default function ServerError() {

    const { commonStore } = useStore()
    return (
        <Container>
            <Header as={'h1'} content={commonStore.error?.statusCode} color="red" />
            <Header as={'h5'} content={commonStore.error?.message} />

            {commonStore.error?.details &&(
                <Segment >
                    <Header as={'h4'} color="teal" content='Stack trace' >
                    <code style={{marginTop:"10px"}} >{commonStore.error?.details}</code>
                    </Header>
                </Segment>)
            }

        </Container>
    )

}